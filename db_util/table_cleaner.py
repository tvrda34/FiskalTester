from configparser import ConfigParser
import psycopg2
from tornado.ioloop import IOLoop
from apscheduler.schedulers.tornado import TornadoScheduler

# script that removes uuids older then 1 hour
def clean_old_uuids():
    print("old uuid cleaner started...")
    configur = ConfigParser()
    configur.read('config.ini')
    conn = psycopg2.connect(database=configur.get('database', 'database_name'),
                            user=configur.get('database', 'user'),
                            password=configur.get('database', 'password'),
                            host=configur.get('database', 'host'),
                            port=configur.get('database', 'port'))
    cur = conn.cursor()
    cur.execute('DELETE FROM public.base_teststarted WHERE timestamp < now()-\'1 hour\'::interval')
    conn.commit()
    cur.close()
    conn.close()

if __name__ == '__main__':
    scheduler = TornadoScheduler()
    scheduler.add_job(clean_old_uuids, 'interval', hour=1)
    scheduler.start()

    try:
        IOLoop.instance().start()
    except (KeyboardInterrupt, SystemExit):
        pass