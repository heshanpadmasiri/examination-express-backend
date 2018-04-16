# Update/Add results of a module

Use to update or add results of module

**URL** : `/modules/updateResults`

**Method** : `POST`

**Auth required** : Yes

**Permissions required** : must be an admin of the module

**Parameters** : moduleCode,userId,results[]

## Success Response

**Code** : `200 OK`

**Content examples**

Input: 
```json
{
	"moduleCode":"cs2000",
	"userId": "1776",
	"results": [{"160451M":"B"}]
}
```
Output:
```json
{
    "success": true,
    "msg": "Successfully updated"
}
```
