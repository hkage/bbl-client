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
        scorecard <userid> <color>         Display the scorecard a climber

The `<color>` parameter is used for the boulder's color and is defined as a German string. The following colors are supported:

`orange, gelb, grün, rot, blau, grau, schwarz, pink`

The `<boulder>` parameter represents the boulder's number used in the climbing gym. This can be a numerical value from `1` to `n`.

## Examples

### Displaying all ascents of a boulder

    $ ./index.js show schwarz 99

    John Doe
    Jane Doe

### Add an ascent to a boulder

    $ ./index.js set -u <userid> -p <password> rot 240

### Remove an ascent from a boulder

    $ ./index.js unset -u <userid> -p <password> rot 240

### Show the current ranking

    $ ./index.js ranking

    | ------ |-------------| ------- |
    | Pos.   | Name        | Points  |
    | ------ |-------------| ------- |
    | 1.     | Jane Doe    | 200     |   
    | ------ |-------------| ------- |
    | 2.     | John Doe    | 198     |
    | ------ |-------------| ------- |