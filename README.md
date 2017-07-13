### Quantified Self

### Team Members: Brett Schwartz and Seth Moser

*  A single-page application that accepts food items, which can be stored in meal tables.

Backend available at:

- Github repo: https://github.com/seth-at-at/quantified-self

## To install/run locally:

Clone front-end AND back-end down:

```shell
# clone front end
$ git clone git@github.com:bschwartz10/fe-quantified-self.git

# clone back-end
$ git clone git@github.com:seth-at-at/quantified-self.git
```

Set up the repo, start `localhost`:

```shell
# set up backend app
$ cd quantified-self
$ npm install
$ knex migrate:latest
$ knex seed:run
$ npm start

# cd into front-end, install modules, start server
$ cd fe-quantified-self
$ npm install
$ npm start
```

Open up on `localhost`:

```
http://localhost:8080/webpack-dev-server/
