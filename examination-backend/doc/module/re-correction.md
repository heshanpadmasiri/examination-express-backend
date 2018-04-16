# Request re-correction

Use to place an re-correction request for a module.
This will place the re-correction request for all admins of the module

**URL** : `/modules/re-correction`

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
	"userId":"16051M",
	"moduleId":"cs2002"
}
```
Output:
```json
{
    "success": true,
    "msg": "successfully placed re-correction request for all the admins"
}
```
