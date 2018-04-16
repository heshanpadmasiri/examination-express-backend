# Get the Messages addressed to user

Get all the messages addressed to the user. In the future this may require authentication.

**URL** : `/users/messages`

**Method** : `GET`

**Auth required** : No

**Permissions required** : None

**Parameters** : userId

## Success Response

**Code** : `200 OK`

**Content examples**

Output:
```json
{
    "success": true,
    "msg": [
        {
            "author": "1776",
            "content": "testMessage1",
            "type": "module message"
        },
        {
            "author": "1776",
            "content": "testMessage",
            "type": "module message"
        }
    ]
}
```
