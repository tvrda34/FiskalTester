FROM python:3.9-slim-buster
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
EXPOSE 8888
COPY . .
CMD [ "python", "server.py"]