# API

## Ride With GPS

Requests to the Ride With GPS API are proxied via the Next.js server.

- [Get User](#getUser)

### <a href="getUser">Get User</a>

Fetch a given user from their username and password. This will return a user's profile including their auth token for API requests.

#### Method

`GET`

#### Path

`/api/rwgps/user`

#### Body

- `username` - Users email address
- `password` - Users password

#### Returns

##### Success

- Ride With GPS Object

##### Error

- Ride with GPS incorrect logins, or
- JS runtime error
