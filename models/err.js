const pool = require('../db');

module.exports = {
    errSQLTest
}

function errSQLTest(cb) {
    let sql = "SELECT * from tableName";
    pool.getConnection(function (err, pool) {
        pool.query(sql, function (error, results) {
            pool.release();
            cb(error, results);
        });
    });
};