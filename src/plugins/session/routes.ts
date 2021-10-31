import { FastifyInstance, RouteShorthandOptions, FastifyRequest, FastifyReply, RequestGenericInterface } from 'fastify';

import crypto from 'crypto';

import userRepository from '../user/db/repository';

import sessionRepository from './db/repository';

interface PostContentBody extends RequestGenericInterface {
    Body: {
        email: string,
        password: string,
    }
}

export default function(fastify: FastifyInstance, opts: RouteShorthandOptions, done: any) {
    fastify.get(
        '/',
        {
            preHandler: fastify.auth([
                fastify.isAuthenticated,
            ]),
        },
        async (req: FastifyRequest, res: FastifyReply) => {
            return {
                authenticated: true,
            }
        }
    );

    fastify.post<PostContentBody>(
        '/',
        {
            schema: {
                body: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: { type: 'string', format: 'email' },
                        password: { type: 'string' },
                    },
                }
            }
        },
        async (req, res) => {
            try {
                const repository = fastify.orm.getCustomRepository(userRepository);
                const user = await repository.findByEmail(req.body.email, true);
                if (!user) {
                    throw new Error('Invalid Details');
                }

                if(!repository.verifyPassword(user, req.body.password)) {
                    throw new Error('Invalid Details');
                }

                const token = crypto.randomBytes(20).toString('hex');
                const session = await fastify.orm
                    .getCustomRepository(sessionRepository)
                    .createSession(user, token);

                const jwt = fastify.jwt.sign({
                    session_id: session.session_id,
                    token,
                    user: {
                        id: user.id,
                        email: user.email,
                        username: user.username,
                    }
                });

                return {
                    token: jwt,
                }
            } catch (err) {
                res.code(404);
                return {
                    statusCode: 404,
                    error: 'Not Found',
                    message: `${err}`,
                };
            }
        }
    );

    done();
}