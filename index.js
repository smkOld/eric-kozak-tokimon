const express = require('express');
const path = require('path');
const ejs = require('ejs');
const PORT = process.env.PORT || 5000;

const {Pool} = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false
});

console.log(process.env.DATABASE_URL);

const VIEWS = path.join(__dirname, 'views');

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', VIEWS)
    .set('view engine', 'ejs')
    .use(express.static('public'))
    .use(express.static(path.join(__dirname, 'public')))
    .get('/', (req, res) => {
        let tokiQuery = `SELECT * FROM tokimon`;

        pool.query(tokiQuery, (error, result) => {
            if (error) {
                res.end(error.toString());
            }
            let results = {'tokimon': result.rows};
            res.render('calculator', results)
        })
    })
    .listen(PORT, () => console.log(`Listening on ${PORT}`));
