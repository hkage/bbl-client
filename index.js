#!/usr/bin/env node

var chalk = require('chalk');
var cheerio = require('cheerio');
var co = require('co');
var program = require('commander');
var prompt = require('co-prompt');
var request = require('request');

const urlShowBoulder = 'http://climbercontest.de/bbl2017/showBoulder.php';

const mapping = {
    'orange': [1, 1],
    'gelb': [2, 1],
    'grün': [3, 2],
    'rot': [4, 3],
    'blau': [5, 4],
    'grau': [6, 5],
    'schwarz': [7, 6],
    'pink': [8, 3]
};

map = function(color, callback) {
    var entry = mapping[color];
    if (entry) {
        return callback(entry[0], entry[1]);
    }
    else {
        console.log(chalk.red('Wrong color, possible choices: ' + Object.keys(mapping).join(',')));
    }
};


program
    .version('0.0.1')
    .option('-u, --username', 'Username')
    .option('-p, --password', 'Password');

program
    .command('show <color> <boulder>')
    .description('Display all ascents of a boulder')
    .action(function (color, boulder) {
        map(color, function(color_code, points) {
            request
                .post({url: urlShowBoulder, form: {farb_key: color_code, boulder: boulder}}, 
                    function(err, httpResponse, body){
                        var $ = cheerio.load(body)
                        $('.nameBoulder').each(function(i, elem) {
                            console.log($(this).text());
                        });
                    });
        });
        
        //process.exit(0);
    });

program.parse(process.argv);