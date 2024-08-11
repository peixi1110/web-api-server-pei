const multer = require('multer');
const path = require('path');


// store 
const pictureStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // path
    cb(null, path.resolve(__dirname, '../public/cover'));
  },
  filename: function (req, file, cb) {
    // file name
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

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
const uploadPic = multer({ 
  storage: pictureStorage,
  limits: {
    fileSize: 1024 * 1024 * 30  // file must under 30MB
  },
  fileFilter: fileFilter 
});

const uploadAvatar = multer({ 
    storage: avatarStorage,
    limits: {
      fileSize: 1024 * 1024 * 5  // file must under 5MB
    },
    fileFilter: fileFilter 
  });


module.exports = {
    uploadPic, 
    uploadAvatar
}
