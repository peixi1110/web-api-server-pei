const db = require('../database/index')

module.exports.addArticle = (req, res) => {
    req.body.cover_img = JSON.stringify(req.body.cover_img)

    const sqlInsertInto = `INSERT INTO articles SET ?`
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
    
    const sqlSelect = "SELECT id, title, pub_date, author_id, cover_img, state FROM articles WHERE is_delete=0 ORDER BY id ASC"
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
    const sqlSelect = 'SELECT * FROM articles WHERE id=?'
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
    const sqlUpdate = 'UPDATE articles SET ? WHERE id=?'
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
    const sqlSelect = 'SELECT * FROM articles WHERE id=?'
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
    const sqlUpdate = 'UPDATE articles SET is_delete=1 WHERE id=?'
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
    const sqlSelect = 'SELECT * FROM articles WHERE id=?'
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
    const sqlUpdate = 'UPDATE articles SET is_delete=0 WHERE id=?'
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
    const sqlSelect = "SELECT * FROM articles WHERE id=?"
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

// get articles by time period 
module.exports.getArticlesBySelect = (req, res) => {
    console.log(req.body)
    const sqlSelect = "SELECT * FROM articles WHERE is_delete=0 ORDER BY id ASC"
    db.query(sqlSelect, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        
        const state = req.body.state
        const cate_id = req.body.cate_id
        const start_date = req.body.start_date
        const end_date = req.body.end_date

        const selectedResult = results.filter(articles => 
            (state === 0 || articles.state === state) && 
            (cate_id === 0 || articles.cate_id === cate_id) && 
            (start_date === '1900-01-01' || articles.pub_date >= start_date) && 
            (start_date === '1900-01-01' || articles.pub_date < end_date)
        )

        res.send({
            status: 0,
            message: 'Get articles successful!',
            data: selectedResult, 
            total: selectedResult.length
        })
    })
}
