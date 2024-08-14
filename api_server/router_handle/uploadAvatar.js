
module.exports.uploadAvatar = (req, res) => {
    const file = req.file;
    if (!file) {
        return res.cc('No file uploaded!');
    }

    res.json({
        url: `http://localhost:5173/public/avatar/${file.filename}`
    })
}
