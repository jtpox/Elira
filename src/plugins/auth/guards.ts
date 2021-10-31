import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { resolve } from 'path/posix';

import sessionRepository from '../session/db/repository';

import tokenType from './types/token';

export default (fastify: FastifyInstance) => [
    {
        name: 'isAuthenticated',
        module: async (request: FastifyRequest, reply: FastifyReply) => {
            if (!request.headers.authorization) {
                return Promise.reject(new Error('Unauthorized'));
            }

            const verifiedToken: tokenType = await request.jwtVerify();
            const { session_id, token } = verifiedToken;
            if (!await fastify.orm.getCustomRepository(sessionRepository).verifySession(session_id, token)) {
                return Promise.reject(new Error('Unauthorized'));
            }
        },
    },
];