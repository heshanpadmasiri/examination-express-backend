# Register to a module

Use to register to an existing module

**URL** : `/modules/registerToModule`

**Method** : `POST`

**Auth required** : Yes

**Permissions required** : None

**Parameters** : moduleId,userId

## Success Response

**Code** : `200 OK`

**Content examples**

Input: 
```json
{
	"userId":"160452X",
	"moduleId":"cs2003"
}
```
Output:
```json
{
    "success": true,
    "msg": "Successfully registered"
}
```
