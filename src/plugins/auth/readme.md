## Route Guards
This plugin provides basic authentication guard for routes.

Usage:
```
fastify.get(
    '/',
    {
        preHandler: fastify.auth([
            fastify.{guard_name},
        ]),
    },
    (req, res) => {
        console.log('Passed guard.');
    }
);
```

## Available Guards
### isAuthenticated
Checks if the user has a valid JWT token, session ID and session token.