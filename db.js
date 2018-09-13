const   DBIP = '127.0.0.1',  
        mysql = require('mysql'),
        pool = mysql.createPool({
            connectionLimit: 50,
            poolLimit: 50,
            QueueLimit: 500,
            multipleStatements: true,
            connectTimeout: 60 * 60 * 1000,
            aquireTimeout: 60 * 60 * 1000,
            timeout: 60 * 60 * 1000,
            waitForConnections: true,
            host: DBIP,
            user: 'root',
            password: '0000',
            database: 'dev'
        });

let state = {
    db: null
};

exports.getConnection = function (sql, done) {
    if (state.db) {
        return done();
    }
    pool.getConnection(sql, function (err, db) {
        if (err) {
            return done(err);
        }
        state.db = db;
        done();
    });
};

exports.escape = function (object) {
    return pool.escape(object);
}

exports.get = function () {
    return state.db;
};