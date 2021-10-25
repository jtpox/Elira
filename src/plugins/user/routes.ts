import { FastifyInstance, RouteShorthandOptions, FastifyRequest, FastifyReply, RequestGenericInterface } from 'fastify';

import User from './db/entity';

interface UserBody extends RequestGenericInterface {
    Body: {
        username: string,
        password: string,
        email: string,
    }
}

export default function(fastify: FastifyInstance, opts: RouteShorthandOptions, done: any) {
    fastify.get('/', async (req: FastifyRequest, res: FastifyReply) => {
        return 'pong';
    });

    fastify.post<UserBody>(
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