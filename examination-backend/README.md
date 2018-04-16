# Examination system backend
This version of the backend is made from scratch using express js framework.
It uses Bearer token scheme for authentication

## Open endpoints
Open endpoints require no authentication

### Module
These endpoints are related to manipulation of module data

* [registered Module](doc/module/registeredModules.md) : `GET /modules/registeredModule`
* [admin Module](doc/module/adminModules.md) : `GET /modules/adminModules`
* [module Data](doc/module/moduleData.md) : `GET /modules/moduleData`

### User
These endpoints are related to manipulation of user data

* [register](doc/user/register.md) : `POST /users/register`
* [login](doc/user/login.md) : `POST /users/login`
* [results](doc/user/results.md) : `GET /users/results`
* [messages](doc/user/messages.md) : `GET /users/messages`

## Endpoints that require authentication
These endpoints require passing of authentication token. 

### Module
These endpoints are related to manipulation of module data

* [create Module](doc/module/createModule.md) : `POST /modules/createModule`
* [update Results](doc/module/updateResults.md) : `POST /modules/updateResults`
* [register To Module](doc/module/registerToModule.md) : `POST /modules/registerToModule`
* [re-correction](doc/module/re-correction.md) : `POST /modules/re-correction`
* [module-notification](doc/module/module-notification.md) : `POST /modules/module-notification`

