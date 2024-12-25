const multer = require('multer');
const upload = multer({ dest: __dirname + '/public/uploads/' })

module.exports = {
  GET: {
    "/file_upload_example": (req, res)=>{
      res.renderLayout("/file_upload_example/index");
    },
    "/file_upload_example/done": (req, res)=>{
      res.renderLayout("/file_upload_example/done", { filename: req.query.filename });
    },
  },
  POST: {
    "/file_upload_example/upload": [
      upload.single('file'), (req, res)=>{
        res.redirect(`/file_upload_example/done?filename=${req.file.originalname}`);
      }
    ]
  }
}
