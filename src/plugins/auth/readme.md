## Route Guards
This plugin provides basic authentication guard for routes.

Usage:
```
fastify.get(
    '/',
    {
        preHandler: fastify.auth([
            fastify.isAuthenticated,
            fastify.isModeratorOrMore,
        ], {
            relation: 'and',
        }),
    },
    (req, res) => {
        console.log('Passed guard.');
    }
);
```

## Available Guards
### isAuthenticated
Checks if the user has a valid JWT token, session ID and session token.

### isModeratorOrMore
Checks if user is a moderator or admin. isAuthenticated has to be run first.

### isAdmin
Checks if user is an admin. isAuthenticated has to be run first.