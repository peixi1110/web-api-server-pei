const db = require('../database/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

// function -- register
module.exports.regUser = (req, res) => {
    // get user info
    const userinfo = req.body
    
    // same username or not
    const sqlSELECT = 'SELECT * FROM user_info WHERE username=?'
    db.query(sqlSELECT, userinfo.username, (err, results) => {
        // whether sql works 
        if (err) {
            return res.cc(err)
            // return res.send({status: 1, message: err.message})
        }

        // whether username already exists 
        if (results.length > 0) {
            return res.cc('Username already exists.')
            // return res.cc({statue: 1, message: 'Username already exists.'})
        } 

        // username can be used
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)

        const sqlInsert = 'INSERT INTO user_info SET ?'
        db.query(sqlInsert, {username: userinfo.username, password: userinfo.password}, 
            (err, results) => {
                if (err) {
                    return res.cc(err)
                    // return res.send({status: 1, message: err.message})
                }

                if (results.affectedRows !== 1) {
                    return res.cc('Register failed! Please try later.')
                    // return res.send({status: 1, message: 'Register failed! Please try later. '})
                }

                res.cc('Register OK!', 0)
                // res.send('Register OK!')
            })

    })

}

// function -- login 
module.exports.login = (req, res) => {
    const userinfo = req.body
    const sqlSELECT = 'SELECT * FROM user_info WHERE username=?'
    db.query(sqlSELECT, userinfo.username, (err, results) => {
        // whether sql works 
        if (err) {
            return res.cc(err)
        }
        // whether username already exists 
        if (results.length === 0) {
            return res.cc('Account not exists.')
        } else if (results.length !== 1 && results.length !== 0) {
            return res.cc('Login failed!')
        }

        // whether right password
        const compareResult =bcrypt.compareSync(userinfo.password, results[0].password)
        if (!compareResult) {
            return res.cc('Wrong username or password!')
        }

        // user = results[] - password - user_pic
        const user = {...results[0], password: '', avatar: ''}
        // encode 
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: config.expiresIn
        })
        res.send({
            status: 0, 
            message: 'Login OK!', 
            token: 'bearer ' + tokenStr
        })
    })
}