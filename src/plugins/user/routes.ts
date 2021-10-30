import { FastifyInstance, RouteShorthandOptions, FastifyRequest, FastifyReply, RequestGenericInterface } from 'fastify';

import User from './db/entity';

interface PostUserBody extends RequestGenericInterface {
    Body: {
        username: string,
        password: string,
        email: string,
    }
}

interface GetUserParams extends RequestGenericInterface {
    Params: {
        id: number,
    }
}

export default function(fastify: FastifyInstance, opts: RouteShorthandOptions, done: any) {
    fastify.get<GetUserParams>(
        '/:id',
        {
            schema: {
                params: {
                    id: { type: 'integer' }
                }
            }
        },
        async (req, res) => {
            try {
                const { id } = req.params;
                const user = await fastify.orm
                    .getRepository(User)
                    .findOne({ where: { id } });

                if (!user) {
                    throw new Error('User does not exist.');
                }

                res.code(200)
                return user;
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

    fastify.post<PostUserBody>(
        '/',
        {
            schema: {
                body: {
                    type: 'object',
                    required: ['username', 'password', 'email'],
                    properties: {
                        username: { type: 'string' },
                        password: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                    },
                },
            },
        },
        async (req, res) => {
            try {
                const { username, password, email } = req.body;

                let user = new User();
                user.username = req.body.username;
                user.password = req.body.password;
                user.email = req.body.email;

                let userRepository = fastify.orm.getRepository(User);
                await userRepository.save(user);

                res.code(201);
                return {
                    created: true,
                };
                // console.log(req);
                // console.log(fastify);
            } catch (err) {
                res.code(409);
                return {
                    statusCode: 409,
                    error: 'Conflict',
                    message: `${err}`,
                };
            }
        }
    );

    done();
}