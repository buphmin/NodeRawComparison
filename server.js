let mysql = require('mysql');
let http = require('http');

let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'framework',
    password: 'abc123'
});

connection.connect(function (err) {

    http.createServer(async function (req, res) {
        try {
            let sql = `
              select *
              from league_player lp
                     join league l on lp.league_id = l.id
                     join player p on lp.player_id = p.id
              where lp.id = 1

            `;

            connection.query(sql, null, function (err, records) {
                res.write(JSON.stringify(records[0]));
                res.end();
            });

        } catch (e) {
            console.error(e);
        }
    }).listen(8080);
});
