import { fastify, FastifyRequest } from 'fastify';

import { FastifyAuthFunction } from 'fastify-auth';

import { FastifyJWT } from 'fastify-jwt';

import { Connection } from 'typeorm';

declare module 'fastify' {
    export interface FastifyInstance {
        isAuthenticated: FastifyAuthFunction,
        jwt: FastifyJWT,
    }
}