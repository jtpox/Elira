import { FastifyInstance } from 'fastify';

import pluginType from '../types/plugin';

import plugins from '../../plugins.json';

export default (fastify: FastifyInstance) => {
    const enabledPlugins = plugins.filter((plugin: pluginType) => plugin.hasOwnProperty('middleware') && plugin.enabled);
    enabledPlugins.forEach((plugin: pluginType) => {
        fastify.log.info(`Plugin ${plugin.name}: Loaded middleware.`);
        const middlewares = require(`../plugins/${plugin.name}/${plugin.middleware}`).default(fastify);
        middlewares.forEach((middleware: any) => fastify.addHook('onRequest', middleware));
    });
};