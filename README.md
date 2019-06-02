# Inlämningsuppgift 1
## Teoretisk del

#### Hur används HTTP-protokollet när du surfar in på en webbsida? Beskriv vilken metod, path, URI, response code och body som skickas in och svarar.

```
Request:
method: 'GET'
path: '/kultur-noje'
URI: http://www.smp.se/kultur-noje/

Response:
code: 200 OK
body: HTML
```

#### Beskriv HTTP-protokollets vanligaste metoder och vad de gör.

```
GET: Skickar tillbaka resursen från URI:n requesten skickas till.

POST: Skapar en ny resurs på URI:n.

PUT: Ändrar alla värden i resursen på URI:n till det som skickas med i requesten. De värden som inte skickas med blir null. Kan även skapa en helt ny resurs om inget finns på URI:n.

PATCH: Ändrar endast de värden i resursen som skickas med i requesten.

DELETE: Tar bort resursen på den specificerade URI:n.
```

#### 'localhost:3000/users?username=something' är en URI. Beskriv vilka delar den består av och vad de kallas.

```
'localhost:3000': authority
'/users': path
'?username=something': query
```

#### På vilka tre sätt kan man skicka in parametrar i en HTTP-request?

```
Route parameter (req.params.id)
curl localhost:3000/1

Query parameter (req.query.id)
curl localhost:3000/?id=1

Custom header (req.headers.id)
curl localhost:3000 -H "id: 1"
```

## Praktisk del

### Installation
```
1. git clone git@github.com:simontollstern/API_U1.git
2. cd .../API_U1
   npm install
3. cd .../API_U1/backend
   npm start
4. cd .../API_U1/frontend
   npm start

Backenden körs nu på localhost:3001 och frontenden på localhost:3000

OBS: Applikationen kräver även att MongoDB finns installerat på datorn!
```

### Methods

#### GET `/students`
```
Request:
curl localhost:3001/students/

Response:
200 OK
[
    {
        "address": {
            "street": "street",
            "zipCode": "zipCode",
            "city": "city"
        },
        "_id": "5ced1f7d7c0c41586c49d2a6",
        "name": "Simon Tollstern",
        "email": "simontollstern@gmail.com",
        "__v": 0
    },
    ...
]
```
#### GET `/students/?name={name}`
```
Request:
curl localhost:3001/students/?name=Simon%20Tollstern

Response:
200 OK
{
    "address": {
        "street": "street",
        "zipCode": "zipCode",
        "city": "city"
    },
    "_id": "5ced1f7d7c0c41586c49d2a6",
    "name": "Simon Tollstern",
    "email": "simontollstern@gmail.com",
    "__v": 0
}
```
#### GET `/students/{id}`
```
Request:
curl localhost:3001/students/5ced1f7d7c0c41586c49d2a6

Response:
200 OK
{
    "address": {
        "street": "street",
        "zipCode": "zipCode",
        "city": "city"
    },
    "_id": "5ced1f7d7c0c41586c49d2a6",
    "name": "Simon Tollstern",
    "email": "simontollstern@gmail.com",
    "__v": 0
}
```
#### POST `/students`
```
Request:
curl localhost:3001/students/
-H "Content-Type: application/json"
-d {
  "name": "example"
  "email": "example"
  "address": {
    "street": "example"
    "zipCode": "example"
    "city": "example"
  }
}

Response:
201 Created
{
  "_id": "someNewId"
  "name": "example"
  "email": "example"
  "address": {
    "street": "example"
    "zipCode": "example"
    "city": "example"
  }
  "__v": 0
}
```
#### PUT `/students/{id}`
```
Request:
curl localhost:3001/students/5ced1f7d7c0c41586c49d2a6
-H "Content-Type: application/json"
-d {
  "name": "example"
  "email": "example"
  "address": {
    "street": "example"
    "zipCode": "example"
    "city": "example"
  }
}

Response:
200 OK (If updated)
201 Created (If created)
204 No change (If no change)
{
  "_id": "someNewId"
  "name": "example"
  "email": "example"
  "address": {
    "street": "example"
    "zipCode": "example"
    "city": "example"
  }
  "__v": 0
}
```
#### DELETE `/students/{id}`
```
Request:
curl localhost:3001/students/5ced1f7d7c0c41586c49d2a6

Response:
200 OK (If deleted)
204 No Change (If no change)
```
---
#### Feedback på kursen
```
Är det här verkligen obligatoriskt?
Har du inte fått några klagomål så kör på som innan.
```
