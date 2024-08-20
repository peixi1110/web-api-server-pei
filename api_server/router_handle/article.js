const { query } = require('express')
const db = require('../database/index')

module.exports.addArticle = (req, res) => {
    const state = req.body.state
    req.body.cover_img = JSON.stringify(req.body.cover_img)
    // add article - viewing (state = 1)
    const sqlInsertInto = 'INSERT INTO articles SET ?'
    db.query(sqlInsertInto, req.body, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.affectedRows !== 1) {
            return res.cc('Add failed!')
        }

        const thisId = results.insertId

        // turn to published (state = 2)
        if (state === 1) {
            setTimeout(() => {
                const sqlUpdateInfo = 'UPDATE articles SET state=2 WHERE id=?'
                db.query(sqlUpdateInfo, thisId, (err, results) => {
                    if (err) {
                        return res.cc(err)
                    }
                    if (results.affectedRows !== 1) {
                        return res.cc('Something went wrong!')
                    }
                })
            }, 30 * 60 * 1000)  // 30mins
        }

        res.cc('Add successful!', 0)
    })


}

// get article info 
module.exports.getArticleInfo = (req, res) => {

    const sqlSelect = 'SELECT id, title, pub_date, author_id, cover_img, cover_img_type, state FROM articles WHERE is_delete=0 ORDER BY id ASC'
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
    const articleInfo = req.body
    // check exist 
    const sqlSelect = 'SELECT * FROM articles WHERE id=?'
    db.query(sqlSelect, articleInfo.id, (err, results) => {
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
    articleInfo.cover_img = JSON.stringify(articleInfo.cover_img)
    db.query(sqlUpdate, [articleInfo, articleInfo.id], (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.affectedRows !== 1) {
            return res.cc('Update failed!')
        }

        const state = req.body.state
        // turn to published (state = 2)
        if (state === 1) {
            setTimeout(() => {
                const sqlUpdateInfo = 'UPDATE articles SET state=2 WHERE id=?'
                db.query(sqlUpdateInfo, articleInfo.id, (err, results) => {
                    if (err) {
                        return res.cc(err)
                    }
                    if (results.affectedRows !== 1) {
                        return res.cc('Something went wrong on saving!')
                    }
                })
            }, 30 * 60 * 1000)  // 30mins
        }

        res.cc('Saved!', 0)
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
    const parseDateTime = (str) => {
        const [date, time] = str.split(' ');
        const [year, month, day] = date.split('-').map(Number);
        const [hour, minute] = time.split(':').map(Number);
        return new Date(year, month - 1, day, hour, minute);
    };
    const sqlSelect = "SELECT * FROM articles WHERE is_delete=0 ORDER BY id ASC"
    db.query(sqlSelect, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        
        const state = req.body.state
        const cate_id = req.body.cate_id
        const start_date = req.body.start_date ? parseDateTime(req.body.start_date) : ''
        const end_date = req.body.end_date ? parseDateTime(req.body.end_date) : ''

        const selectedResult = results.filter(RowDataPacket => {
            if (((state === 0) || (RowDataPacket.state === state))
                && ((cate_id === undefined) || (RowDataPacket.cate_id === cate_id))
                && ((start_date === '') || (parseDateTime(RowDataPacket.pub_date) >= start_date))
                && ((start_date === '') || (parseDateTime(RowDataPacket.pub_date) < end_date))) {
                return RowDataPacket
            }
        })

        res.send({
            status: 0,
            message: 'Get articles successful!',
            data: selectedResult,
            total: selectedResult.length
        })
    })
}
