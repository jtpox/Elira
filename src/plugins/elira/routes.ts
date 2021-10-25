import { FastifyInstance, RouteShorthandOptions } from 'fastify';

import { version, dependencies } from '../../../package.json';

export default function(fastify: FastifyInstance, opts: RouteShorthandOptions, done: any) {
    fastify.get('/', async (req, res) => {
        const { fastify, typeorm } = dependencies;
        return { 
            elira: version,
            fastify,
            typeorm,
         };
    });

    done();
}