const s3Controller ={};
const AWS = require("aws-sdk");

AWS.config.update({
    accessKeyId: "root",
    secretAccessKey: "root12345678",
    endpoint: 'http://127.0.0.1:9000' ,
    s3ForcePathStyle: 'true', 
    signatureVersion: 'v4',
  });
  
  let s3 = new AWS.S3();

  async function getImage() {
    const data = s3
      .getObject({
        Bucket: "chibepazam",
        Key: "ax2.jfif",
      })
      .promise();
    return data;
  }

  function encode(data) {
    let buf = Buffer.from(data);
    let base64 = buf.toString("base64");
    return base64;
  }

  s3Controller.getTheImage = (req, res, next) =>{
    getImage().then((img) => {
    let image =
      "<img src='data:image/jpeg;base64," + encode(img.Body) + "'" + "/>";
    let startHTML = "<html><body></body>";
    let endHTML = "</body></html>";
    let html = startHTML + image + endHTML;
    res.send(html);
  })
  .catch((e) => {
    res.send(e);
  });
  }
  module.exports = s3Controller;
