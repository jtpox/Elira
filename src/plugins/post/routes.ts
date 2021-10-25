import { FastifyInstance, RouteShorthandOptions } from 'fastify';

export default function(fastify: FastifyInstance, opts: RouteShorthandOptions, done: any) {
    /* fastify.get('/', async (req, res) => {
        return 'pong';
    }); */

    done();
}