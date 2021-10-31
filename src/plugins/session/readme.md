## Requests

### POST /session
Creates a new session. Returns a JWT token.

Body:
```
{
    email: string,
    password: string
}
```