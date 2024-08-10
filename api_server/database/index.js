const mysql = require('mysql')

const db = mysql.createPool({
    host: '127.0.0.1',    // ip address
    user: 'root',     // account 
    password: 'Zpx,19931110',     // password 
    database: 'schema_1'    // name of database
})


module.exports = db