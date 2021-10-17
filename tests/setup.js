const { AzurAPIInstance } = require('../build/index.js');
const { events } = AzurAPIInstance;
events.on('ready', () => console.log(''));
