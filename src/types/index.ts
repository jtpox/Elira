import { fastify, FastifyRequest } from 'fastify';

import { Connection } from 'typeorm';

declare module 'fastify' {
    export interface FastifyInstance {
        orm: Connection,
    }
}