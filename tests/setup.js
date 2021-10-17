const { AzurAPIClient } = require('../build/node.js');
const { events } = AzurAPIClient;
events.on('ready', () => console.log(''));
