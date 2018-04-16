# Create a module notification

Use to place a notification to all registered students of a module.

**URL** : `/modules/module-notification`

**Method** : `POST`

**Auth required** : Yes

**Permissions required** : User must be an admin of the module

**Parameters** : message,moduleId,userId

## Success Response

**Code** : `200 OK`

**Content examples**

Input: 
```json
{
	"message":"testMessage",
	"moduleId":"cs2002",
	"userId":"1776"
}
```
Output:
```json
{
    "success": true,
    "msg": "successfully placed messages to all registered students"
}
```
