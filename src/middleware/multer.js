const multer = require("multer");
const helper = require("../helper/index");

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "./uploads/");
  },
  filename: (request, file, callback) => {
    callback(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});
const fileFilter = (request, file, callback) => {
  console.log(file);
  if (
    file.mimetype == "image/png" &&
    file.mimetype == "image/jpg" &&
    file.mimetype == "image/jpeg"
  ) {
    callback(null, true);
  } else {
    return callback(new Error("Only images files are allowed"), false);
  }
};
const limits = { fileSize: 10485760 };
let upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
  //   function (req, file, callback) {
  //     if (
  //       file.mimetype !== "image/png" &&
  //       file.mimetype !== "image/jpg" &&
  //       file.mimetype !== "image/jpeg" &&
  //       file.mimetype !== "image/gif"
  //     ) {
  //       return callback(new Error("Only images files are allowed"));
  //     } else {
  //       callback(null, true);
  //     }
  //   },
}).single("product_picture");

const uploadFilter = (request, response, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return helper.response(response, 400, err.message);
    } else if (err) {
      return helper.response(response, 400, err.message);
    }
    next();
  });
};

module.exports = uploadFilter;
