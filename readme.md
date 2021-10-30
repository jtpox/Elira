# Elira
Elira is a basic backend template for projects. It uses Fastify and TypeORM.  

## Getting Started
1. Clone the repository `git clone https://github.com/jtpox/Elira.git`.
2. Create a `.env` file and copy the contents from `.env.sample` into it.
3. Create a new plugin by reading the `Plugin System` section.
4. Run development mode `npm run serve`.
5. Compile to Javascript by running `tsc`.

The compiled files will be in the `build` folder. Run `app.js` with the `mode:prod` argument like so: `node build/src/app.js mode:prod`.

## Plugin System
Every component is separated into different plugins (users, posts, etc).

Plugins sources can be located in `src/plugins`.

### plugin.json
Details for the plugin has to be put into the `plugins.json` file.

```

{

    "name": "<REQUIRED> Name of your plugin, all in small letters corresponding to the folder name",

    "enabled" true/false, <REQUIRED>

    "database": {
        "entity": "<OPTIONAL> Name of database model file (without the .ts extension)"
    },

    "middleware": "<OPTIONAL> Name of middleware file (without the .ts extension)",

    "routes": "<OPTIONAL> Name of the route file (without the .ts extension)",

    "tests": "<OPTIONAL> Name of the test file (without the .ts extension)",

}

```
  

## Database / Models
Read the TypeORM [documentation](https://typeorm.io/).

## Middlewares
Middlewares have to be in an array, even if there is just one.
```
export default (fastify: FastifyInstance) => [
    async (request: FastifyRequest, reply: FastifyReply) => {
        // Placeholder here.
        // done(); only on non-async functions
    },
];
```

## To-do
- ~~Global plugin middlewares.~~
- Proper routes for post and user plugins.
- ~~Add entity [listeners and subscribers](https://typeorm.io/#/listeners-and-subscribers) to plugin models.~~