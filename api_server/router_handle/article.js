const db = require('../database/index')
const uploadPic = require('../middleWare/unploadMiddleWare')

module.exports.addArticle = (req, res) => {
    
    uploadPic(req.cover_img)

    const sqlInsertInto = 'INSERT INTO ev_article SET ?'
    db.query(sqlInsertInto, req.body, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.affectedRows !== 1) {
            return res.cc('Add failed!')
        }

        res.cc('Add successful!', 0)
    })
}

// get article info 
module.exports.getArticleInfo = (req, res) => {
    
    const sqlSelect = "SELECT id, title, pub_date, author_id, cover_img, state FROM ev_article WHERE is_delete=0 ORDER BY id ASC"
    db.query(sqlSelect, (err, results) => {
        if (err) {
            res.cc(err)
        }

        res.send({
            stats: 0,
            message: 'Get article information successful!',
            data: results,
            total: results.length,
        })
    })
}

// update article contents by id 
module.exports.updateArticleById = (req, res) => {
    // check exist 
    const sqlSelect = 'SELECT * FROM ev_article WHERE id=?'
    db.query(sqlSelect, req.body.id, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length === 0) {
            return res.cc('Article not exist!')
        } else if (results.length !== 1) {
            return res.cc('Something wrong! Please try later.')
        }
    })
    // update
    const sqlUpdate = 'UPDATE ev_article SET ? WHERE id=?'
    db.query(sqlUpdate, [req.body, req.body.id], (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.affectedRows !== 1) {
            return res.cc('Update failed!')
        }

        res.cc('Update successful!', 0)
    })
}

// delete article by id 
module.exports.deleteArticleById = (req, res) => {
    // check exist
    const sqlSelect = 'SELECT * FROM ev_article WHERE id=?'
    db.query(sqlSelect, req.params.id, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.length === 0) {
            return res.cc('Article does not exist')
        } else if (result.length !== 1) {
            return res.cc('Something wrong! Please try later.')
        }
        // check status
        if (result[0].is_delete === 1) {
            return res.cc('Already delete.')
        }
    })
    // delete
    const sqlUpdate = 'UPDATE ev_article SET is_delete=1 WHERE id=?'
    db.query(sqlUpdate, req.params.id, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.affectedRows !== 1) {
            return res.cc('Delete article failed!')
        }

        res.cc('Delete article successful!', 0)
    })
}

// resume article by id 
module.exports.resumeArticleById = (req, res) => {
    // check exist
    const sqlSelect = 'SELECT * FROM ev_article WHERE id=?'
    db.query(sqlSelect, req.params.id, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.length === 0) {
            return res.cc('Article does not exist')
        } else if (result.length !== 1) {
            return res.cc('Something wrong! Please try later.')
        }
        // check status
        if (result[0].is_delete === 0) {
            return res.cc('Already resume.')
        }
    })
    // resume
    const sqlUpdate = 'UPDATE ev_article SET is_delete=0 WHERE id=?'
    db.query(sqlUpdate, req.params.id, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.affectedRows !== 1) {
            return res.cc('Resume article failed!')
        }

        res.cc('Resume article successful!', 0)
    })
}

// get article cintent and infomation by id
module.exports.getArticleById = (req, res) => {
    const sqlSelect = "SELECT * FROM ev_article WHERE id=?"
    db.query(sqlSelect, req.params.id, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length === 0) {
            return res.cc('Article not exist!')
        } else if (results.length !== 1) {
            return res.cc('Someting Wrong! Please try later.')
        }
        // const articleInfo = {...results[0], }
        res.send({
            status: 0,
            message: 'Get article successful!',
            data: results[0]
        })
    })
}

