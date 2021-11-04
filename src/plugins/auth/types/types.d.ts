import { fastify, FastifyRequest } from 'fastify';

import { FastifyAuthFunction } from 'fastify-auth';

import { FastifyJWT } from 'fastify-jwt';

import { Connection } from 'typeorm';

import { UserRole } from '../../user/enums';

declare module 'fastify' {
    export interface FastifyInstance {
        isAuthenticated: FastifyAuthFunction,
        isModeratorOrMore: FastifyAuthFunction,
        isAdmin: FastifyAuthFunction,
        jwt: FastifyJWT,
    }
}

declare module 'fastify-jwt' {
    interface FastifyJWT {
        payload: {
            session_id: string,
            token: string,
            details: {
                id: number;
                username: string;
                email: string;
                privilege: UserRole,
            },
        },
    }
}