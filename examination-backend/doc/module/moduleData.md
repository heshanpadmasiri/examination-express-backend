# Show information about a particular module

Get information about particular module

**URL** : `/modules/moduleData`

**Method** : `GET`

**Auth required** : No

**Permissions required** : None

**Parameters** :moduleId

## Success Response

**Code** : `200 OK`

**Content examples**

Shows data for module cs2000

```json
{
    "success": true,
    "msg": {
        "lastEditedBy": "1776",
        "resultAvailable": true,
        "results": [
            {
                "160451M": "B"
            }
        ],
        "admins": [
            "1776"
        ],
        "moduleCode": "cs2000",
        "registeredStudents": [
            "160451M"
        ]
    }
}
```
