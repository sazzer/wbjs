var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('worlds', {
    id: { type: 'int', primaryKey: true},
    version: { type: 'string', length: 36, notNull: true },
    created: { type: 'timestamp with time zone', notNull: true },
    updated: { type: 'timestamp with time zone', notNull: true },
    name: { type: 'string', length: 100, notNull: true}
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('worlds', callback);
};
