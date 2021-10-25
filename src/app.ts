import dotenv from 'dotenv';

import 'reflect-metadata';

import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';

import { Server, IncomingMessage, ServerResponse } from 'http';

import getEntities from './env/database';

import hooks from './env/hooks';

import routes from './env/routes';

dotenv.config();

const server: FastifyInstance = Fastify({
    logger: {
        level: 'info',
        file: process.env.LOG_FILE,
    },
});

server.register(import('fastify-formbody'));
server.register(import('fastify-multipart'));
server.register(require('fastify-typeorm-plugin'), {
    type: process.env.TYPEORM_CONNECTION,
    database: process.env.TYPEORM_DATABASE,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    synchronize: process.env.TYPEORM_SYNCHRONIZE,
    logging: process.env.TYPEORM_LOGGING,
    entities: getEntities(),
});

hooks(server);
routes(server);

const app = async () => {
    try {
        await server.listen(process.env.APP_PORT || 8080);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

if (process.argv.includes('mode:dev') || process.argv.includes('mode:prod')) {
 app();
}

export default server;