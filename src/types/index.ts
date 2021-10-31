import { fastify, FastifyRequest } from 'fastify';

import { FastifyAuthFunction } from 'fastify-auth';

import { Connection } from 'typeorm';

declare module 'fastify' {
    export interface FastifyInstance {
        orm: Connection,
    }
}