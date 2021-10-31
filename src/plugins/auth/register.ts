import { FastifyInstance } from 'fastify';

export default (fastify: FastifyInstance) => [
    {
        module: require('fastify-jwt'),
        options: {
            secret: process.env.JWT_SECRET,
        }
    },
    {
        module: require('fastify-auth'),
    }
];