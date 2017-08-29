"use strict"

import * as Knex from 'knex';
import * as Bookshelf from 'bookshelf';

import config from './config';

const knex = Knex(config);

const psql = Bookshelf(knex);

export default psql;
