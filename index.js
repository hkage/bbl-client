#!/usr/bin/env node

var chalk = require('chalk');
var co = require('co');
var program = require('commander');
var prompt = require('co-prompt');
var request = require('superagent');

const urlShowBoulder = 'http://climbercontest.de/bbl2017/showBoulder.php';

program
    .version('0.0.1')
    .option('-u, --username', 'Username')
    .option('-p, --password', 'Password');

program
    .command('show [color] [boulder]', 'Display')
    .action(function(color, boulder) {
        console.log('Displaying perpetration for boulder', boulder);
        request
            .post(urlShowBoulder)
            .send({farb_key: color, boulder: boulder})
            .set('Content-Type', 'text/html');
        process.exit(0);
    });

program.parse(process.argv);