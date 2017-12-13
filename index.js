#!/usr/bin/env node

var chalk = require('chalk');
var co = require('co');
var prompt = require('co-prompt');
var program = require('commander');
var fs = require('fs');
//var request = require('superagent');
var request = require('request');

program
    .version('0.0.1')
    .option('-u, --username', 'Username')
    .option('-p, --password', 'Password');

program
    .command('show [color] [boulder]', 'Display')
    .action(function(color, boulder) {
        console.log(chalk.green('Displaying perpetration for ' + boulder));
        console.log(chalk.bold.green('Foo'));

        request('http://www.google.com/asdad', function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
          });

        //request
            //.get('http://climbercontest.de/bbl2017/showBoulder.php')
            //.send({farb_key: color, boulder: boulder})
            //.set('Accept', 'text/html')
            //.end((err, res) => {
            //    console.log(chalk.green(res));
            //});
        
        process.exit(0);
    });

program.parse(process.argv);