import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import User from '../user/db/entity';

import sessionRepository from '../session/db/repository';

import tokenType from './types/token';

import { UserRole } from '../user/enums';

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
    {
        /*
         * isAuthenticated has to be called before this.
         */
        name: 'isModeratorOrMore',
        module: async (request: FastifyRequest, reply: FastifyReply, done: any) => {
            const user = await fastify.orm.getRepository(User).findOne({ id: request.user.details.id });
            if(
                user?.privilege === UserRole.MODERATOR
                || user?.privilege === UserRole.ADMIN
            ) {
                done();
            } else {
                return Promise.reject(new Error('Unauthorized'));
            }
        },
    },
    {
        /*
         * isAuthenticated has to be called before this.
         */
        name: 'isAdmin',
        module: async (request: FastifyRequest, reply: FastifyReply, done: any) => {
            const user = await fastify.orm.getRepository(User).findOne({ id: request.user.details.id });
            if (user?.privilege !== UserRole.ADMIN) {
                return Promise.reject(new Error('Unauthorized'));
            }
        },
    },
];