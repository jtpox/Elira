import { FastifyInstance, RequestGenericInterface, RouteShorthandOptions } from 'fastify';

import Post from './db/entity';

import User from '../user/db/entity';

interface PostContentBody extends RequestGenericInterface {
    Body: {
        title: string,
        content: string,
        parent?: number,
        type: string,
    }
}

interface GetPostParams extends RequestGenericInterface {
    Params: {
        id: number,
    }
}

export default function(fastify: FastifyInstance, opts: RouteShorthandOptions, done: any) {
    fastify.get<GetPostParams>(
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

                const post = await fastify.orm
                    .getRepository(Post)
                    .find({
                        where: { id },
                        relations: ['author'],
                    });
                
                if (!post) {
                    throw new Error('Post not found.');
                }

                res.code(200);
                return post;
            } catch (err) {
                res.code(404);
                return {
                    statusCode: 404,
                    error: 'Not Found',
                    message: `${err}`,
                };
            }
        },
    );

    fastify.post<PostContentBody>(
        '/',
        {
            schema: {
                body: {
                    type: 'object',
                    required: ['title', 'content', 'type'],
                    properties: {
                        title: { type: 'string' },
                        content: { type: 'string' },
                        parent: { type: 'integer' },
                        type: { type: 'string' },
                    },
                }
            },
            preHandler: fastify.auth([
                fastify.isAuthenticated
            ]),
        },
        async (req, res) => {
            try {
                const { title, content, type } = req.body;
                const parent = (req.body.parent)? req.body.parent : 0;

                // const user = await fastify.orm.getRepository(User).findOne({ id: author });

                let post = new Post();
                post.title = title;
                post.content = content;
                post.type = type;
                post.author = req.user.details.id;
                post.parent = parent;

                const postRepository = fastify.orm.getRepository(Post);
                const savedPost = await postRepository.save(post);
                return {
                    id: savedPost.id,
                    title: savedPost.title,
                    content: JSON.parse(savedPost.content),
                    type: savedPost.type,
                    created_at: savedPost.created_at,
                    updated_at: savedPost.updated_at,
                };
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