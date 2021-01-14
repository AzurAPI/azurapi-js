#!/usr/bin/env node

const yargs = require('yargs');
const chalk = require('chalk');
const pkg = require('./package.json');
const highlight = require('cli-highlight').highlight;
const AzurAPI = require('../../build/Client');
const client = new AzurAPI();

const argv = yargs
  .command('ship', 'Get ship info in database', {
    query: {
      description: 'Ship id or name to check for',
      alias: 'q',
      type: 'string',
    }
  })
  .command('equipment', 'Get ship info in database', {
    query: {
      description: 'Equipment id or name to check for',
      alias: 'q',
      type: 'string',
    }
  })
  .command('chapter', 'Get chapter info in database', {
    query: {
      description: 'Chapter id or name to check for',
      alias: 'q',
      type: 'string',
    }
  })
  .command('voiceline', 'Get voiceline info in database', {
    query: {
      description: 'Voice line id or name to check for',
      alias: 'q',
      type: 'string',
    }
  })
  .command('barrage', 'Get barrage info in database', {
    query: {
      description: 'Barrage id to check for',
      alias: 'q',
      type: 'string',
    }
  })
  .command('fulshCache', 'Flush the cache in CacheService')
  .option('version', {
    alias: 'v',
    description: 'Check version',
  })
  .option('update', {
    alias: 'u',
    description: 'Update local Api Data',
  })
  .help()
  .alias('help', 'h')
  .argv;

if (argv.version) {
  console.log(chalk`$ {yellow AzurApi-JS v2 CLI}
Version: {green ${pkg.version}}
Using: {cyan AzurApi-JS v2}
`);
}

if (!argv._.length && !argv.update && !argv.version) {
  console.log(chalk`$ {yellow AzurApi-JS v2 CLI}
{cyan Run command with flags -h, --help for more information}`);
}

if (argv.update) {
  console.log(chalk.cyan('Coming Soon™️'));
}

if (argv._.includes('ship')) {
  if (!argv.query) console.log(chalk.red('No query provided. Please add a query following the -q option.'));
  client.on('ready', () => {
    const fetch = client.cache.ship.get(argv.query);
    fetch.then(get => {
      console.log(chalk.green(`Data returned for query ${argv.query}`));
      console.log(highlight(JSON.stringify(get, null, 2), { language: 'json', theme: { string: chalk.green, number: chalk.yellow }}));
      //console.log(get);
    }).catch(ex => {
      console.log(chalk.red(ex));
    });
  });
}

if (argv._.includes('equipment')) {
  if (!argv.query) console.log(chalk.red('No query provided. Please add a query following the -q option.'));
  client.on('ready', () => {
    const fetch = client.cache.equipments.get(argv.query);
    fetch.then(get => {
      console.log(chalk.green(`Data returned for query ${argv.query}`));
      console.log(highlight(JSON.stringify(get, null, 2), { language: 'json', theme: { string: chalk.green, number: chalk.yellow }}));
      //console.log(get);
    }).catch(ex => {
      console.log(chalk.red(ex));
    });
  });
}

if (argv._.includes('chapter')) {
  if (!argv.query) console.log(chalk.red('No query provided. Please add a query following the -q option.'));
  client.on('ready', () => {
    const fetch = client.cache.chapters.get(argv.query);
    fetch.then(get => {
      console.log(chalk.green(`Data returned for query ${argv.query}`));
      console.log(highlight(JSON.stringify(get, null, 2), { language: 'json', theme: { string: chalk.green, number: chalk.yellow }}));
      //console.log(get);
    }).catch(ex => {
      console.log(chalk.red(ex));
    });
  });
}

if (argv._.includes('voiceline')) {
  if (!argv.query) console.log(chalk.red('No query provided. Please add a query following the -q option.'));
  client.on('ready', () => {
    const fetch = client.cache.voicelines.get(argv.query);
    fetch.then(get => {
      console.log(chalk.green(`Data returned for query ${argv.query}`));
      console.log(highlight(JSON.stringify(get, null, 2), { language: 'json', theme: { string: chalk.green, number: chalk.yellow }}));
      //console.log(get);
    }).catch(ex => {
      console.log(chalk.red(ex));
    });
  });
}

if (argv._.includes('barrage')) {
  if (!argv.query) console.log(chalk.red('No query provided. Please add a query following the -q option.'));
  client.on('ready', () => {
    const fetch = client.barrages.get(argv.query);
    fetch.then(get => {
      console.log(chalk.green(`Data returned for query ${argv.query}`));
      console.log(highlight(JSON.stringify(get, null, 2), { language: 'json', theme: { string: chalk.green, number: chalk.yellow }}));
      //console.log(get);
    }).catch(ex => {
      console.log(chalk.red(ex));
    });
  });
}
