import { FastifyPluginCallback } from 'fastify';

import { Server } from 'http';

export default interface Register {
    name: string,
    module: FastifyPluginCallback
}