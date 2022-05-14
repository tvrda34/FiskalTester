from lxml import etree
import psycopg2
from configparser import ConfigParser
import uuid
from datetime import datetime
from request import testHandler

# main part por plugins

def test_request(test_id, xml):
    jir = ""
    # looking for zki and jir
    for elem in xml.iter():
        if elem.tag == '{http://www.apis-it.hr/fin/2012/types/f73}IdPoruke':
            zki = elem.text
        if elem.tag == '{http://www.apis-it.hr/fin/2012/types/f73}Jir':
            jir = elem.text
    if len(jir) == 0:
        jir = str(uuid.uuid4())

    response, testUtil = testHandler.runTestCase(xml, jir, zki)

    # connecting and adding to database
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    # if updatedb(zki, jir, testUtil, test_id, now) == 1:
    #      return etree.tostring(response, pretty_print="true").decode(encoding="utf-8")
    # else:
    #     return 'Failed to append to database. Please try again.'
    return etree.tostring(response, pretty_print="true").decode(encoding="utf-8")


def updatedb(zki, jir, errors, test_id, dt):
    configur = ConfigParser()
    configur.read('config.ini')
    try:
        con = psycopg2.connect(database=configur.get('database', 'database_name'),
                               user=configur.get('database', 'user'),
                               password=configur.get('database', 'password'),
                               host=configur.get('database', 'host'),
                               port=configur.get('database', 'port'))
    except Exception as e:
        print(e)
        print("Database error")
        return -1
    cur = con.cursor()

    # add to db
    cur.execute("INSERT INTO {} (zki, jir, plugin_used, conclusion, datetime) VALUES (%s, %s, %s, %s, %s, %s)"
                .format(0), (zki, jir, 0, 0 , dt))

    con.commit()
    cur.close()
    con.close()
    return 1