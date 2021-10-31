import { FastifyInstance } from 'fastify';

import pluginType from '../types/plugin';

import registerType from '../types/register';

import plugins from '../../plugins.json';


export default (fastify: FastifyInstance) => {
    const enabledPlugins = plugins.filter((plugin: pluginType) => plugin.hasOwnProperty('register') && plugin.enabled);
    enabledPlugins.forEach((plugin: pluginType) => {
        fastify.log.info(`Plugin ${plugin.name}: Loaded registers.`);
        const registers = require(`../plugins/${plugin.name}/${plugin.register}`).default(fastify);
        registers.forEach((register: registerType) => {
            if (register.options) {
                fastify.register(register.module, register.options);
            } else {
                fastify.register(register.module);
            }
        });
    });
};