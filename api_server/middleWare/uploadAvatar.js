const multer = require('multer');
const path = require('path');

// store 
const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // path
    cb(null, path.resolve(__dirname, '../public/avatar'));
  },
  filename: function (req, file, cb) {
    // file name
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// fliter
const fileFilter = (req, file, cb) => {
  // only image 
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload an image file.'), false);
  }
};

// init
const uploadAvatar = multer({
  storage: avatarStorage,
  limits: {
    fileSize: 1024 * 1024 * 10  // file must under 10MB
  },
  fileFilter: fileFilter
});

module.exports = uploadAvatar
