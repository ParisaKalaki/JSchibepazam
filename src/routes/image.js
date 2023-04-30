const router = require('express').Router();
const S3Controller = require('../controllers/s3');

router.route('/image')
    .get(S3Controller.getTheImage) // t

module.exports = router;

