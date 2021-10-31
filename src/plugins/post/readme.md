## Requests
### GET /post/:id
Retrieves post.

Returns:
```
{
    id: number,
    title: string,
    content: object,
    parent: number,
    type: string,
    created_at: timestamp,
    updated_at: timestamp,
    author: {
        id: number,
        username: string,
        email: string,
        type: string,
        privilege: string,
        created_at: timestamp,
        updated_at: timestamp
    }
}
```

### POST /post
Creates a new post.

Body:
```
{
    title: string,
    content: string,
    parent: number,
    type: string,
    author: number,
}
```