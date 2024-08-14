const db = require('../database/index')


// get list
module.exports.getArticleCates = (req, res) => {
    const sqlSelect = 'SELECT * FROM article_cates WHERE is_delete=0 ORDER BY id ASC'
    db.query(sqlSelect, (err, results) => {
        if (err) {
            res.cc(err)
        }
        res.send({
            stats: 0, 
            message: 'Get article categoreys successful!',
            data: results,
        })
    })
}

// add cate
module.exports.addAriticleCates = (req, res) => {
    
    // check exists
    const sqlSelect = 'SELECT * FROM article_cates WHERE name=? OR alias=?'
    db.query(sqlSelect, [req.body.name, req.body.alias], (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length === 2) {
            return res.cc('Name and alias are both occupied.')
        } else if (results.length === 1) {
            if (results[0].name === req.body.name && results[0].alias === req.body.alias) {
                return res.cc('Category already exists.')
            } else if (results[0].name === req.body.name && results[0].alias !== req.body.alias) {
                return res.cc('Name is already exists.')
            } else if (results[0].name !== req.body.name && results[0].alias === req.body.alias) {
                return res.cc('Alias is already exists.')
            }
        }
    })

    // add 
    const sqlInsertInto = 'INSERT INTO article_cates SET ?'
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

// delete cate by id
module.exports.deleteCateById = (req, res) => {
    // check exist
    const sqlSelect = 'SELECT * FROM article_cates WHERE id=?'
    db.query(sqlSelect, req.params.id, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.length === 0) {
            return res.cc('Category does not exist')
        } else if (result.length !== 1) {
            return res.cc('Something wrong! Please try later.')
        }
        // check status
        if (result[0].is_delete === 1) {
            return res.cc('Already delete.')
        }
    })
    // delete
    const sqlUpdate = 'UPDATE article_cates SET is_delete=1 WHERE id=?'
    db.query(sqlUpdate, req.params.id, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.affectedRows !== 1) {
            return res.cc('Delete categroy failed!')
        }

        res.cc('Delete categroy successful!', 0)
    })
}

// resume cate by id
module.exports.resumeCateById = (req, res) => {
    // check exist
    const sqlSelect = 'SELECT * FROM article_cates WHERE id=?'
    db.query(sqlSelect, req.params.id, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.length === 0) {
            return res.cc('Category does not exist')
        } else if (result.length !== 1) {
            return res.cc('Something wrong! Please try later.')
        }
        // check status
        if (result[0].is_delete=== 0) {
            return res.cc('Already resume.')
        }
    })
    // resume
    const sqlUpdate = 'UPDATE article_cates SET is_delete=0 WHERE id=?'
    db.query(sqlUpdate, req.params.id, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.affectedRows !== 1) {
            return res.cc('Resume categroy failed!')
        }

        res.cc('Resume categroy successful!', 0)
    })
}

// get cate by id
module.exports.getArtCateById = (req, res) => {
    const sqlSelect = "SELECT * FROM article_cates WHERE id=?"
    db.query(sqlSelect, req.params.id, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length !== 1) {
            return res.cc('Someting Wrong! Please try later.')
        }
        res.send({
            status: 0, 
            message: 'Get gatetoy successful!', 
            data: results[0]
        })
    })
}

// update
module.exports.updateCate = (req, res) => {
    // check exists
    const sqlSelect = 'SELECT * FROM article_cates WHERE id<>? AND (name=? OR alias=?)'
    db.query(sqlSelect, [req.body.id, req.body.name, req.body.alias], (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length === 2) {
            return res.cc('Name and alias are both occupied.')
        } else if (results.length === 1) {
            if (results[0].name === req.body.name && results[0].alias === req.body.alias) {
                return res.cc('Category already exists.')
            } else if (results[0].name === req.body.name && results[0].alias !== req.body.alias) {
                return res.cc('Name is already exists.')
            } else if (results[0].name !== req.body.name && results[0].alias === req.body.alias) {
                return res.cc('Alias is already exists.')
            }
        }
    })
    // update
    const sqlUpdate = 'UPDATE article_cates SET ? WHERE id=?'
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