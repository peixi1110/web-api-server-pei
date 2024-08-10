const db = require('../database/index')
const bcrypt = require('bcryptjs')

module.exports.getUserInfo = (req, res) => {
    const sqlSELECT = `SELECT id, username, nickname, email, user_pic FROM ev_users WHERE id=?`
    db.query(sqlSELECT, req.user.id, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length !== 1) {
            return res.cc('Get user infomation failed!')
        }
        res.send({
            status: 0, 
            message: 'Get user infomation successful!', 
            data: results[0]
        })
    })
}

module.exports.updateUserInfo = (req, res) =>{
    const sqlUpdate = 'UPDATE ev_users SET ? WHERE id=?'
    db.query(sqlUpdate, [req.body, req.body.id], (err, results) => {
        if (err) {
            res.cc(err)
        }
        if (results.affectedRows !== 1) {
            return res.cc('Update user information failed!')
        }
        res.cc('Update user information successful!', 0)
    })
}

module.exports.updatePwd = (req, res) => {
    const sqlSelect = 'SELECT * FROM ev_users WHERE id=?'
    db.query(sqlSelect, req.user.id, (err, results) => {
        if (err) {
            res.cc(err)
        }
        if (results.length !== 1) {
            return res.cc('Account not exists')
        }

        const compareResult =bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResult) {
            return res.cc('Wrong old password!')
        }
        const sqlUpdatePwd = 'UPDATE ev_users SET password=? WHERE id=?'
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(sqlUpdatePwd, [newPwd, req.user.id], (err, results) => {
            if (err) {
                res.cc(err)
            }
            if (results.affectedRows !== 1) {
                res.cc('Update password failed!')
            }
        })

        res.cc('Update password successful!', 0)
    }) 

}

module.exports.updateAvatar = (req, res) => {
    const sqlUpdateAvatar = 'UPDATE ev_users SET user_pic=? WHERE id=?'
    db.query(sqlUpdateAvatar, [req.body.avatar, req.user.id], (err, results) => {
        if (err) {
            res.cc(err)
        }
        if (results.affectedRows !== 1) {
            res.cc('Update avatar failed!')
        }
    })

    res.cc('Update avatar successful!', 0)
}