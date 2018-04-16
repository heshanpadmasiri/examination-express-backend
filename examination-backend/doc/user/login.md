# Login

Use to get the auth token of a registered user

**URL** : `/users/register`

**Method** : `POST`

**Auth required** : No

**Permissions required** : None

**Parameters** : username,password

## Success Response

**Code** : `200 OK`

**Content examples**

Input: 
```json
{
	"username":"user1",
	"password":"password"
}
```
Output:
```json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6IiQyYSQxMCRaL1NBMjhRT2JlWENZWVQvcjZ2d0x1M1R0SnplcDBMMHA5eTJpY0xRN1p3WTNPQVRIUDZsRyIsIm5hbWUiOiJ0ZXN0VXNlciIsImVtYWlsIjoidXNlcjFAdGVzdC5jb20iLCJ0eXBlIjoic3R1ZGVudCIsInVzZXJuYW1lIjoidXNlcjEiLCJpZCI6IjE2MDQ1MFgiLCJpYXQiOjE1MjM5MTY0MDEsImV4cCI6MTUyNDUyMTIwMX0.lAEcTh8NrxsjSeNiCuTynK7tW5yNVZ2al7Li9SM8gnY",
    "user": {
        "id": "160450X",
        "name": "testUser",
        "username": "user1",
        "email": "user1@test.com",
        "type": "student"
    },
    "msg": "User authenticated successfully"
}
```
