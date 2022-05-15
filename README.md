# System for automated testing of fiscal cash registers

## Installation


- Clone the repository


- Run the dockerized server:
    - Position yourself in the project directory
```bash
docker-compose up -d
```
- Stop container
```bash
docker-compose down
```


## Usage

Web application [http://localhost:3000](http://localhost:3000)

Test user:
```
Email: tester@tester.com
Password: sifra123
```

Admin user:
```
Email: admin
Password: admin123
```
## Testing

```
(Server is on port 8888)
To communicate with the server send the cash register id and the XML fiscal request via POST request to the server.
```

### client.py & client_sign.py
This scripts simulate fiscal cash register request to the server.

Change the variable [file] in config.ini file to the path of the XML.

Run the python client.py for each cash register you want to run, by changing the uuid value stored in the client.py variable uuid.

```
client_sign.py signs the message with certifacte avaliable in tornado/data directory.
client.py just posts the request xml file
```
```
pip install tornado
python client.py
python client_sign.py
```