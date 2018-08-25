# devnull
[![CodeFactor](https://www.codefactor.io/repository/github/pixiys/devnull/badge/master)](https://www.codefactor.io/repository/github/pixiys/devnull/overview/master)

a discord bot using <a href="https://github.com/hydrabolt/discord.js/">discord.js</a>.

## Commands

- `!help [command]` Responds with the usage and description for a command.
- `!ping` Responds with the time, and latency between the server and Discord. 
- `!github` Responds with the Github link for this bot.
- `!alias [reset]|<name> <command>` Creates an alias for another command.
- `!books <regexr> [page]` Responds with all matching books in https://please.dont-hack.me/hacking/books/
- `!color <color>` Gives you the role of a given color.
- `!flip` Flips a coin.
- `!quote [regex]` Quote of the day.
- `!ask` Responds to the question you ask it.
- `!timestamp` Responds with the current Js timestamp.
- `!exec <code>` Executes Javascript code and responds with the result.

## Requirements
devnull requires [Docker Compose](https://docs.docker.com/compose/) and npm.

## Config
devnull requires three config files, `config.json`, `permissions.json`, and `alias.json`. you can copy the example files and rename them.
`permissions.json` works by having the command name as the key, and either a string or an array of strings as a value. `+above+` allows any role higher than the previous in the array.

## Running
To start the bot run `sh up.sh`
To stop the bot run `sh down.sh`

## Contributing
All contributions are more than welcome!
This bot *should* get updates from the community.
