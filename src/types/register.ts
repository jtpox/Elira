import { FastifyPluginCallback } from 'fastify';

import { Server } from 'http';

export default interface Register {
    module: FastifyPluginCallback<any, Server>,
    options?: any,
}