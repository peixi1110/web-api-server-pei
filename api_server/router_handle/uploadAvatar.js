const path = require('path')
const fs = require('fs');
const { url } = require('inspector');

module.exports.uploadAvatar = (req, res) => {
    const files = req.files;
    var url = []
    if (!files) {
        url = []
        return res.status(400).json({
            status: 'error',
            message: 'No file uploaded!'
        });
    }

    url = files.map(files => ({
        url:  `/public/avatar/${files.filename}`}
    ))

    res.json({
        status: 'success',
        message: 'Avater uploaded successfully!',
        url
    })

    return url
}

module.exports.readAvatar = (req, res) => {
     // process path received
     const url = req.body
     const keys = Object.keys(url)
     const imageUrl = keys.length > 0 ? keys[0] : null;
     // splicing path
     const imagePath = path.join(__dirname, '..', imageUrl)
     // send pic 
     fs.readFile(imagePath, 'binary', (err, data) => {
         if (err) {
             res.status(404).send('Error reading image!')
         }
 
         res.send(data)
     })
}

module.exports.deleteAvatar = (req, res) => {
    const filePath = req.body.url
    const toDelete = path.join(__dirname, '..', filePath)
    fs.unlink(toDelete, (err) => {
        if (err) {
            res.cc(err)
        } else {
            res.cc('Delete cover image seccussful!', 0)
        }
    })
}