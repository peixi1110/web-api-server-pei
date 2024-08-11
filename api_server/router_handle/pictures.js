
module.exports.uploadPic = (req, res) => {
    const file = req.file;
    console.log(file)
    if (!file) {
        return res.status(400).json({
            status: 'error',
            message: 'No file uploaded!'
          });
    }

    res.json({
        status: 'success',
        message: 'Cover uploaded successfully!',
        url: `http://localhost:5173/public/cover/${file.filename}`
    })
}

module.exports.uploadAvatar = (req, res) => {
    const file = req.file;
    // console.log(file)
    if (!file) {
        return res.cc('No file uploaded!');
    }

    res.json({
        url: `http://localhost:5173/public/avatar/${file.filename}`
    })
}
