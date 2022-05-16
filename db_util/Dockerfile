FROM python:3.9

RUN pip3 install apscheduler
RUN pip3 install tornado

COPY . .
CMD [ "python", "table_cleaner.py"]