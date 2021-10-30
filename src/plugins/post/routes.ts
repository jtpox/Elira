import { FastifyInstance, RequestGenericInterface, RouteShorthandOptions } from 'fastify';

import Post from './db/entity';

import User from '../user/db/entity';

interface PostContentBody extends RequestGenericInterface {
    Body: {
        title: string,
        content: string,
        parent?: number,
        type: string,
        author: number,
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
                    required: ['title', 'content', 'type', 'author'],
                    properties: {
                        title: { type: 'string' },
                        content: { type: 'string' },
                        parent: { type: 'integer' },
                        type: { type: 'string' },
                        author: { type: 'integer' },
                    },
                }
            }
        },
        async (req, res) => {
            console.log(req.body.parent);
            try {
                const { title, content, type, author } = req.body;
                const parent = (req.body.parent)? req.body.parent : 0;

                // const user = await fastify.orm.getRepository(User).findOne({ id: author });

                let post = new Post();
                post.title = title;
                post.content = content;
                post.type = type;
                post.author = author;
                post.parent = parent;

                const postRepository = fastify.orm.getRepository(Post);
                const savedPost = await postRepository.save(post);
                console.log(savedPost);
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