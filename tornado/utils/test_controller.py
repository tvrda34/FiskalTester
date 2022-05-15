from lxml import etree
import psycopg2
from configparser import ConfigParser
import uuid
from datetime import datetime
from request import testHandler

# main part por plugins


def test_request(xml, register_id, user_id):
    jir = ""
    # looking for zki and jir
    for elem in xml.iter():
        if elem.tag == '{http://www.apis-it.hr/fin/2012/types/f73}IdPoruke':
            zki = elem.text
        if elem.tag == '{http://www.apis-it.hr/fin/2012/types/f73}BrOznRac':
            r_num = elem.text
        if elem.tag == '{http://www.apis-it.hr/fin/2012/types/f73}OznPosPr':
            r_bs = elem.text
        if elem.tag == '{http://www.apis-it.hr/fin/2012/types/f73}OznNapUr':
            r_pos = elem.text

    reciept_num = '{0}/{1}/{2}'.format(r_num, r_bs, r_pos)

    # generate random jir for response
    jir = str(uuid.uuid4())

    response, testUtil = testHandler.runTestCase(xml, jir, zki)

    response = etree.tostring(response, pretty_print="true").decode(encoding="utf-8")
    request = etree.tostring(xml, pretty_print="true").decode(encoding="utf-8")
    # db updates
    if update_db(testUtil, register_id, user_id, reciept_num, response, request) == 1:
          return response
    else:
        return 'Error: HTTP 500: Internal Server Error'


def update_db(testUtil, user_id, register_id, reciept, response, request):
    try:
        con = get_db_conn()
    except Exception as e:
        print(e)
        return -1
    cur = con.cursor()

    test_id = test_result_resolve(user_id, register_id, reciept)
   
    if test_id == None:
        return -1   

    # add method to db
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    cur.execute('INSERT INTO public.base_testmethod (request, response, "timestamp", description, "testResult_id", "testRun_id", "validationResult") VALUES(%s, %s, %s, %s, %s, %s, %s)'
                , (request, response, now, testUtil.testNote, test_id, testUtil.type, testUtil.validationMsg));
    
    #TODO check test_result_correction
    if update_test_result(test_id, testUtil) == -1:
        return -1

    con.commit()
    cur.close()
    con.close()
    return 1

def update_test_result(test_id, testUtil):
    if testUtil.type == 1 and len(testUtil.errors) == 0:
        try:
            con = get_db_conn()
        except Exception as e:
            print(e)
            return -1
        cur = con.cursor()
        cur.execute('UPDATE public.base_testresult SET "result"=%s, result_description=%s WHERE id=%s'
                , (True, 'Cash register has passed the test', test_id ))
        con.commit()
        cur.close()
        con.close()

def test_result_resolve(register_id, user_id, reciept):
    try:
        con = get_db_conn()
    except Exception as e:
        print(e)
        return -1

    cur = con.cursor()
    cur.execute(
        'SELECT id, result FROM public.base_testresult WHERE register_id = {} AND user_id = {} AND reciept = \'{}\' '
        .format(register_id, user_id, reciept))
    test_result = cur.fetchone()
    (id, result) = test_result
    if id == None:
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        cur.execute('INSERT INTO public.base_testresult (reciept, created, "result", result_description, register_id, user_id) VALUES (%s, %s, %s, %s, %s, %s)'
                , (reciept, now, 'False', 'Cash register failed on test', register_id, user_id));
        con.commit()
        cur.execute(
        'SELECT id FROM public.base_testresult WHERE register_id = {} AND user_id = {} AND reciept = \'{}\' '
        .format(register_id, user_id, reciept))
        id = cur.fetchone()[0]

    if result == True:
        cur.execute('UPDATE public.base_testresult SET "result"=%s, result_description=%s WHERE id=%s'
                , (False, 'Failed. Fiscalization request for the processed reciept', id))
        con.commit()

    cur.close()
    con.close()
    return id   

def check_access(uuid):
    try:
        con = get_db_conn()
    except Exception as e:
        print(e)
        return None
    cur = con.cursor()
    cur.execute(
        'SELECT register_id, user_id FROM public.base_teststarted WHERE uuid = \'{}\''.format(uuid))
    data = cur.fetchone()
    cur.close()
    con.close()
    return data


def get_db_conn():
    configur = ConfigParser()
    configur.read('config.ini')
    return psycopg2.connect(database=configur.get('database', 'database_name'),
                            user=configur.get('database', 'user'),
                            password=configur.get('database', 'password'),
                            host=configur.get('database', 'host'),
                            port=configur.get('database', 'port'))
