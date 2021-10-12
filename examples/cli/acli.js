#!/usr/bin/env node

const yargs = require('yargs');
const chalk = require('chalk');
const pkg = require('./package.json');
const highlight = require('cli-highlight').highlight;
const { AzurAPI } = require('../../build/Client');
const client = new AzurAPI();

const argv = yargs
  .command('ships', 'Get ship info in database', {
    query: {
      description: 'Ship id or name to check for',
      alias: 'q',
      type: 'string',
    },
  })
  .command('equipments', 'Get ship info in database', {
    query: {
      description: 'Equipment id or name to check for',
      alias: 'q',
      type: 'string',
    },
  })
  .command('chapters', 'Get chapter info in database', {
    query: {
      description: 'Chapter id or name to check for',
      alias: 'q',
      type: 'string',
    },
  })
  .command('voicelines', 'Get voiceline info in database', {
    query: {
      description: 'Voice line id or name to check for',
      alias: 'q',
      type: 'string',
    },
  })
  .command('barrages', 'Get barrage info in database', {
    query: {
      description: 'Barrage id to check for',
      alias: 'q',
      type: 'string',
    },
  })
  .option('version', {
    alias: 'v',
    description: 'Check version',
  })
  .option('update', {
    alias: 'u',
    description: 'Update local API Data',
  })
  .help()
  .alias('help', 'h').argv;

if (argv.version) {
  console.log(chalk`$ {yellow AzurApi-JS v2 CLI}
Version: {green ${pkg.version}}
Using: {cyan AzurApi-JS v2}
`);
  process.exit(0);
}

if (!argv._.length && !argv.update && !argv.version) {
  console.log(chalk`{yellow AzurApi-JS v2 CLI}
{cyan Run command with flags -h, --help for more information}`);
  process.exit(0);
}

if (argv.update) {
  client.updater.update();
  console.log(chalk.cyan('Local data updated'));
  process.exit(0);
}

function promise(func) {
  return new Promise(async (resolve, reject) => {
    resolve(await func);
  });
}

if (
  argv._.includes('ships') ||
  argv._.includes('equipments') ||
  argv._.includes('chapters') ||
  argv._.includes('voicelines') ||
  argv._.includes('barrages')
) {
  if (!argv.query || argv.query === '') {
    console.log(chalk.red('No query provided. Please add a query following the -q option.'));
    process.exit(0);
  }
  let fetch;
  if (argv._.includes('ships')) {
    fetch = promise(client.ships.get(argv.query));
  } else if (argv._.includes('equipments')) {
    fetch = promise(client.equipments.get(argv.query));
  } else if (argv._.includes('chapters')) {
    fetch = promise(client.chapters.get(argv.query));
  } else if (argv._.includes('voicelines')) {
    fetch = promise(client.voicelines.get(argv.query));
  } else if (argv._.includes('barrages')) {
    fetch = promise(client.barrages.get(argv.query));
  }
  client.on('ready', async () => {
    fetch
      .then(get => {
        console.log(chalk.green(`Data returned for query ${argv.query}`));
        console.log(
          highlight(JSON.stringify(get, null, 2), {
            language: 'json',
            theme: { string: chalk.green, number: chalk.yellow },
          })
        );
        process.exit(0);
      })
      .catch(ex => {
        console.log(chalk.red(ex));
        process.exit(0);
      });
  });
} else {
  console.log(chalk.red('Command not recognised, use flag -h, --help for more information'));
  process.exit(0);
}

/* OLD
if (argv._.includes('ships')) {
  if (!argv.query) console.log(chalk.red('No query provided. Please add a query following the -q option.'));
  client.on('ready', async () => {
    const fetch = promise(client.ships.get(argv.query));
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
    const fetch = promise(client.equipments.get(argv.query));
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
    const fetch = promise(client.chapters.get(argv.query));
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
    const fetch = promise(client.voicelines.get(argv.query));
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
    const fetch = promise(client.barrages.get(argv.query));
    fetch.then(get => {
      console.log(chalk.green(`Data returned for query ${argv.query}`));
      console.log(highlight(JSON.stringify(get, null, 2), { language: 'json', theme: { string: chalk.green, number: chalk.yellow }}));
      //console.log(get);
    }).catch(ex => {
      console.log(chalk.red(ex));
    });
  });
}
*/
