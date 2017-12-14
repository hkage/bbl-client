# bbl-client

A simple, NodeJS based, commandline client to access the data for the Bonner Boulder Liga (http://bonnerboulderliga.de).

## Installation

    $ npm install

## Usage

    Usage: index [options] [command]


    Options:

        -V, --version  output the version number
        -h, --help     output usage information


    Commands:

        show <color> <boulder>             Display all ascents of a boulder
        set [options] <color> <boulder>    Add ascent for a boulder
        unset [options] <color> <boulder>  Remove ascent for a boulder
        ranking                            Display the ranking of the current league
        scorecard                          Display the scorecard a climber

## Example

### Displaying all ascents of a boulder

    $ ./index.js show schwarz 99

    John Doe
    Jane Doe