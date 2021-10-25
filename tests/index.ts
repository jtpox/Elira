import dotenv from 'dotenv';

import { expect } from 'chai';

import pluginType from '../src/types/plugin';

import plugins from '../plugins.json';

dotenv.config();

const enabledPlugins = plugins.filter((plugin: pluginType) => plugin.hasOwnProperty('tests') && plugin.enabled)

/*
 * Adding app.close() into teardown gives all requests 503 error.
 */
enabledPlugins.forEach(plugin => {
    console.log(`../src/plugins/${plugin.name}/${plugin.tests}`);
    require(`../src/plugins/${plugin.name}/${plugin.tests}`);
});