const path = require('path');
const fs = require('fs');

module.exports = {
  GET: {
    "/file_download_example": (req, res)=>{
      res.renderLayout("/file_download_example/index")
    },
    "/file_download_example/download": (req, res)=>{
      const filename = req.query.filename || `${req.query.kind}.${req.query.kind}`;
      res.setHeader('Content-disposition', `${req.query.disposition}; filename*=utf8''${encodeURIComponent(filename)}`);

      let downloadFile;
      switch(req.query.kind){
        case "pdf":
          res.setHeader('Content-type', "application/pdf");
          downloadFile = "file_download_example/download_file.pdf";
          break;
        case "jpg":
          res.setHeader('Content-type', "image/jpeg");
          downloadFile = "file_download_example/download_file.jpg";
          break;
        case "txt":
          res.setHeader('Content-type', "text/plain");
          downloadFile = "file_download_example/download_file.txt";
          break;
      }

      fs.createReadStream(path.join(req.app.get('views'), downloadFile)).pipe(res);
    },
  },
}
