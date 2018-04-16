# Create new Module

Use to create new module in the database

**URL** : `/modules/createModule`

**Method** : `POST`

**Auth required** : Yes

**Permissions required** : None

**Parameters** : moduleCode,[admins[],registeredStudents[]]

## Success Response

**Code** : `200 OK`

**Content examples**

For a module with moduleCode: cs2003 without admin or registeredStudents parameters provided

```json
{
    "success": true,
    "module": {
        "moduleCode": "cs2003",
        "admins": [],
        "registeredStudents": [],
        "resultAvailable": false,
        "results": []
    }
} 
```

For a module with moduleCode: cs2003 with admin = [1776] and no registered students provided

```json
{
    "success": true,
    "module": {
        "moduleCode": "cs2003",
        "admins": [
            "1776"
        ],
        "registeredStudents": [],
        "resultAvailable": false,
        "results": []
    }
}
```