const mysql = require('mysql')

const db = mysql.createPool({
    host: '127.0.0.1',    // ip address
    user: 'root',     // account 
    password: 'Zpx,19931110',     // password 
    database: 'web_article_server'    // name of database
})


module.exports = db