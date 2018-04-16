# Show list of Modules registered by the user

Get list of all the modules registered by the user

**URL** : `/modules/registeredModule`

**Method** : `GET`

**Auth required** : No

**Permissions required** : None

**Parameters** : moduleCode,[admins[],registeredStudents[]]

## Success Response

**Code** : `200 OK`

**Content examples**

User who has registered to modules cs2000, cs2001 and cs2002

```json
{
    "success": true,
    "msg": [
        "cs2000",
        "cs2001",
        "cs2002"
    ]
}
```
