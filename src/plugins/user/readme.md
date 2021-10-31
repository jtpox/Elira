## Requests
### GET /user/:id
Retrieves user info.

Returns:
```
{
    id: number,
    username: string,
    email: string,
    type: string,
    privilege: string,
    created_at: timestamp,
    updated_at: timestamp
}
```

### POST /user
Creates a new user.

Body:
```
{
    username: string,
    email: string,
    password: string
}
```