#!/usr/bin/env node

var chalk = require('chalk');
var cheerio = require('cheerio');
var fs = require('fs');
var program = require('commander');
var nconf = require('nconf');
var request = require('request');
var Table = require('cli-table');

const urlShowBoulder = 'https://climbercontest.de/bbl2017/showBoulder.php';
const urlUpdateBoulder = 'https://climbercontest.de/bbl2017/scoreNeu.php';
const urlScorecard = 'https://climbercontest.de/bbl2017/getScorecardShow.php';
const urlContest = 'https://climbercontest.de/bbl2017/contest.php';

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

saveCredentials = function(userid, password) {
    /**
     * Method to store the credentials locally.
     */
    nconf.use('file', { file: './config.json' });
    nconf.load();
    nconf.set('userid', userid);
    nconf.set('password', password);
    nconf.save();
}

getCredentials = function(callback) {
    /**
     * Return the credentials from the local config file.
     */
    nconf.use('file', { file: './config.json' });
    nconf.load();
    fs.readFile('./config.json', function(err, data) {
        if (err) {
            console.log(chalk.red('No credentials found. Please login.'));
        } else {
            var data = JSON.parse(data.toString());
            callback(data['userid'], data['password']);
        }
    });
}

program
    .version('0.1');


program
    .command('login <userid> <password>')
    .description('Login with a username and password')
    .action(function(userid, password) {
        saveCredentials(userid, password);
        console.log(chalk.green('Saved credentials'));
    });

program
    .command('show <color> <boulder>')
    .description('Display all ascents of a boulder')
    .action(function(color, boulder) {
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
    });

program
    .command('set <color> <boulder>')
    .description('Add ascent for a boulder')
    .action(function(color, boulder, command) {
        map(color, function(color_code, points) {
            getCredentials(function(userid, password) {
                data = {
                    farb_key: color_code, 
                    b: boulder, 
                    wert: points, 
                    user_id: userid,
                    pwd: password
                }
                request
                    .post({url: urlUpdateBoulder, form: data})
                    .on('error', function(err) {
                        console.log(chalk.red(err));
                        })
                    .on('response', function(response) {
                        console.log(chalk.green('OK'));
                        })
                    ;
            });
        });
    });

program
    .command('unset <color> <boulder>')
    .description('Remove ascent for a boulder')
    .action(function(color, boulder, command) {
        map(color, function(color_code, points) {
            getCredentials(function(userid, password) {
                data = {
                    farb_key: color_code, 
                    b: boulder, 
                    wert: 0, 
                    user_id: userid,
                    pwd: password
                }
                request
                    .post({url: urlUpdateBoulder, form: data})
                    .on('error', function(err) {
                        console.log(chalk.red(err));
                        })
                    .on('response', function(response) {
                        console.log(chalk.green('OK'));
                        })
                    ;
            });
        });
    });

program
    .command('ranking')
    .description('Display the ranking of the current league')
    .action(function() {
        request
            .get({url: urlContest},
                function(err, httpResponse, body){
                    var $ = cheerio.load(body)
                    $('table').each(function(i, elem) {
                        var table = new Table({
                            head: ['Pos.', 'Name', 'Points']
                          , colWidths: [7, 70, 15]
                        });
                        $('tr', $(this)).each(function(i, elem) {
                            var columns = [];
                            $('td', elem).each(function(i, elem) {
                              columns[i] = $(this).text();
                            });
                            table.push([columns[0], columns[1], columns[2]]);
                        });
                        console.log(table.toString());
                    });
                });
    });

program
    .command('scorecard <userid> <color>')
    .description('Display the scorecard a climber')
    .action(function(userid, color) {
    });

program.parse(process.argv);