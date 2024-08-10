const db = require('../database/index')
const path = require('path')
const { v4: uuidv4 } = require('uuid');


module.exports.uploadPic = (req, res) => {
    const { file } = req.body
    const sql = 'INSERT INTO ev_pic (id, file) VALUES (?, ?)';
    file.map(i => {
        const { binary, fileExt } = i
        const values = [`${uuidv4()}.${fileExt}`, binary];
        db.query(sql, values, (error, results) => {
            if(error){
                res.cc(error)
            }
            res.send({
                stats: 0, 
                message: 'Upload successful!',
                data: results,
                total: results.length
            })
        });
    })
}

// module.exports.uploadAvatar = (req, res) => {
//     const form = new formidable.IncomingForm()
//     form.keepExtensions = true
//     form.uplodaDir = '../public/avatar'
// }

// module.exports.uploadCover = (req, res) => {
//     console.log('okok')
// }



// module.exports.getPics = (req, res) => {
//     console.log('okokok');
// }