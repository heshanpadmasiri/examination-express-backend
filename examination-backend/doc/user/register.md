# Register new user

Use create a new user in the database
UserId will be used to determine the type of user

**URL** : `/users/register`

**Method** : `POST`

**Auth required** : No

**Permissions required** : None

**Parameters** : name,email,username,password,id

## Success Response

**Code** : `200 OK`

**Content examples**

Input: 
```json
{
	"name":"testUser",
	"email":"user1@test.com",
	"username":"user1",
	"password":"password",
	"id":"160450X"
}
```
Output:
```json
{
    "success": true,
    "msg": "successfully created new user"
}
```
