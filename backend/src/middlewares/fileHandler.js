const multer = require('multer');
const uuidv4 = require('uuid/v4');

const MaxFileSize = 5;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/files');
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname
      .toLowerCase()
      .split(' ')
      .join('-');
    cb(null, uuidv4() + '-' + fileName);
  }
});

const fileHandler = multer({
  storage,
  limits: { fileSize: MaxFileSize * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    switch (file.mimetype) {
      case 'application/pdf':
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        cb(null, true);
        break;
      default:
        cb(new Error('El archivo debe ser PDF o Word.'), false);
        break;
    }
  }
});

module.exports = fileHandler;
