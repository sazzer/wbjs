import pg from 'pg';
import pgp from 'pg-promise';
import { startServer, stopServer } from './request';

before(function() {
  return startServer();
});

after(function() {
  return stopServer();
});

after(function() {
  pg.end();
  pgp().end();
})
