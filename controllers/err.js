var errTable = require('../models/err');

module.exports = {
    err,
    testRoute
}

function err(req, res) {
    res.status(404);
    res.send('Page not found!');
};
function testRoute(req, res) {
    errTable.errSQLTest(function (err, results) {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        res.status(200);
        res.render('test', {title : 'Test page', data : results});
        //res.send(results);    
    });
    
};