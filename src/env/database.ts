import { createConnection, Connection, EntitySchema, ConnectionOptions, DatabaseType, getConnectionOptions } from 'typeorm';

import pluginType from '../types/plugin';

import plugins from '../../plugins.json';

const enabledPlugins = plugins.filter((plugin: pluginType) => plugin.hasOwnProperty('database') && plugin.enabled);

export default (): Array<EntitySchema> => {
    const entities: Array<EntitySchema> = [];

    enabledPlugins.forEach((plugin: pluginType) => {
        if (plugin.database?.hasOwnProperty('entity')) {
            entities.push(require(`../plugins/${plugin.name}/${plugin.database.entity}`).default);
        }
    });
    return entities;
}