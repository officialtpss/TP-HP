const multer = require('multer');
const mkdirP = require('mkdirp');
const fs = require('fs');
const HelperService = require('./helper.service');

const callBackHandler = (req, res, err, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).send({ status: false, message: err.message });
  }
  if (err) {
    return res.status(422).send({ status: false, message: err.message });
  }
  return next();
};

const getMulter = () => {
  const storage = multer.diskStorage({
    async destination(req, file, cb) {
      const dir = HelperService.getBaseDirectory();
      if (!fs.existsSync(dir)) {
        try {
          await mkdirP(dir);
          cb(null, dir);
        } catch (err) {
          // eslint-disable-next-line no-console
          cb(err, null);
        }
      } else {
        cb(null, dir);
      }
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname.replace(/\s/g, '')}`);
    }
  });
  const obj = { storage };
  return multer(obj);
};

const getMulterProfile = () => {
  const storage = multer.diskStorage({
    async destination(req, file, cb) {
      const dir = HelperService.getBaseDirectoryProfile();
      if (!fs.existsSync(dir)) {
        try {
          await mkdirP(dir);
          
          cb(null, dir);
        } catch (err) {
          // eslint-disable-next-line no-console
          cb(err, null);
        }
      } else {
        cb(null, dir);
      }
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname.replace(/\s/g, '')}`);
    }
  });
  const obj = { storage };
  return multer(obj);
};

// eslint-disable-next-line func-names
const multipleUpload = (fieldName) => function (req, res, next) {
  return getMulter().array(fieldName, 10)(req, res, (err) => {
    callBackHandler(req, res, err, next);
  });
};

// eslint-disable-next-line func-names
const signleUpload = (fieldName) => function (req, res, next) {
  return getMulter().single(fieldName)(req, res, (err) => {
    callBackHandler(req, res, err, next);
  });
};

// eslint-disable-next-line func-names
const signleUploadProfile = (fieldName) => function (req, res, next) {
  return getMulterProfile().single(fieldName)(req, res, (err) => {
    callBackHandler(req, res, err, next);
  });
};

const fileUpload = { multipleUpload, signleUpload, signleUploadProfile };
module.exports = fileUpload;
