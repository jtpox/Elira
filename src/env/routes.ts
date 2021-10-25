import { FastifyInstance } from 'fastify';

import pluginType from '../types/plugin';

import plugins from '../../plugins.json';

export default (fastify: FastifyInstance) => {
    const enabledPlugins = plugins.filter((plugin: pluginType) => plugin.hasOwnProperty('routes') && plugin.enabled);

    enabledPlugins.forEach((plugin: pluginType) => {
        fastify.log.info(`Plugin ${plugin.name}: Loaded routes.`);
        fastify.register(
            require(`../plugins/${plugin.name}/${plugin.routes}`),
            (plugin.name === 'elira') ? {} : { prefix: `/${plugin.name}` }
        );
    });
};