# Express Local Library app

Project inspired by this article: [Express web framework](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/)

## How to run the app

1. Type in these commands in the terminal to set the things up:

```bash
  docker-compose build
  docker-compose run --rm app yarn run populatedb
```

2. Type this command to run the application:

```bash
  docker-compose up -d
```

3. Go to <http://localhost:3000/>
4. Type in `indiana` as a username and `johnes` as a password and log in.

## How to stop the app

To stop the application, simply type this command in your terminal:

```bash
  docker-compose down
```
