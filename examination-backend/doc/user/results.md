# Get the Results

Get overall results of a given user

**URL** : `/users/results`

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
            "module": "cs2000",
            "result": "B"
        },
        {
            "module": "cs2002",
            "result": "A"
        }
    ]
}
```
