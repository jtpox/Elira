import { FastifyInstance } from 'fastify';

import pluginType from '../types/plugin';

import decorateType from '../types/decorate';

import plugins from '../../plugins.json';


export default (fastify: FastifyInstance) => {
    const enabledPlugins = plugins.filter((plugin: pluginType) => plugin.hasOwnProperty('decorate') && plugin.enabled);
    enabledPlugins.forEach((plugin: pluginType) => {
        fastify.log.info(`Plugin ${plugin.name}: Loaded decorates.`);
        const decorates = require(`../plugins/${plugin.name}/${plugin.decorate}`).default(fastify);
        decorates.forEach((decorate: decorateType) => {
            fastify.decorate(decorate.name, decorate.module);
        });
    });
};