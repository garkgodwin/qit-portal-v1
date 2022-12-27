const multer = require("multer");
const path = require("path");

const { dirname } = require("path");
const appDir = dirname(require.main.filename);
const DIR = appDir + "\\images";
const storage = multer.diskStorage({
  destination: DIR,
  filename: (req, file, cb) => {
    cb(
      null,
      req.params.personId + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

let upload = multer({
  storage: storage,
});

module.exports = upload;
