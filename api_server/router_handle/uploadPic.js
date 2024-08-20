const path = require('path')
const fs = require('fs')

module.exports.uploadPic = (req, res) => {
    const files = req.files
    if (!files) {
        url = []
        return res.status(400).json({
            status: 'error',
            message: 'No file uploaded!'
        });
    }

    const url = files.map(file => ({
        url:  `/public/cover/${file.filename}`}
    ))

    res.json({
        status: 'success',
        message: 'Cover uploaded successfully!',
        url
    })

    return url
}

module.exports.readPic = (req, res) => {
    // process path received
    const url = req.body
    const keys = Object.keys(url)
    const imageUrl = keys.length > 0 ? keys[0] : null;
    // // splicing path
    const imagePath = path.join(__dirname, '..', imageUrl)
    // // send pic 
    fs.readFile(imagePath, 'binary', (err, data) => {
        if (err) {
            res.status(404).send('Error reading image!')
        }

        res.send(data)
    })
}


module.exports.deletePic = (req, res) => {
    // const filePath = req.body.url
    // fs.unlink(filePath, (err) => {
    //     if (err) {
    //         res.cc(err)
    //     } else {
    //         res.cc('Delete cover image seccussful!', 0)
    //     }
    // })
}