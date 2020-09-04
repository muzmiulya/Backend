const bcrypt = require("bcrypt");
const helper = require("../helper/index");
const jwt = require("jsonwebtoken");
const { isUserExist, postUser, checkUser } = require("../model/users");

module.exports = {
  registerUser: async (request, response) => {
    console.log(request.body);
    const { user_email, user_password, user_name } = request.body;
    console.log(user_password);
    if (user_password.length < 8) {
      return helper.response(response, 400, "Minimum 8 Characters");
    }
    const salt = bcrypt.genSaltSync(10);
    const encryptPassword = bcrypt.hashSync(user_password, salt);
    const userInDatabase = await isUserExist(user_email);
    if (userInDatabase.length > 0) {
      return helper.response(response, 400, "Email Has Already Been Taken");
    } else if (userInDatabase.length <= 0) {
      const setData = {
        user_email: user_email,
        user_password: encryptPassword,
        user_name: user_name,
        user_role: 2,
        user_status: 0,
        user_created_at: new Date(),
      };
      try {
        const result = await postUser(setData);
        return helper.response(response, 200, "Success Register User", result);
      } catch (error) {
        console.log(error);
        return helper.response(response, 400, "Bad Request");
      }
    }
  },
  loginUser: async (request, response) => {
    try {
      const { user_email, user_password } = request.body;
      // console.log(user_email);
      const checkDataUser = await checkUser(user_email);
      if (checkDataUser.length >= 1) {
        //proses 2 = cek Password
        const checkPassword = bcrypt.compareSync(
          user_password,
          checkDataUser[0].user_password
        );
        console.log(checkPassword);
        if (checkPassword) {
          //   proses 3 = set JWT
          const {
            user_id,
            user_email,
            user_name,
            user_role,
            user_status,
          } = checkDataUser[0];
          let payload = {
            user_id,
            user_email,
            user_name,
            user_role,
            user_status,
          };
          if (user_status == 0) {
            return helper.response(
              response,
              400,
              "Your Account is not Active",
              payload
            );
          } else {
            const token = jwt.sign(payload, "RAHASIA", { expiresIn: "24h" });
            payload = { ...payload, token };
            return helper.response(response, 200, "Success Login", payload);
          }
          // console.log(user_status);
        } else {
          return helper.response(response, 400, "Wrong Password !");
        }
      } else {
        return helper.response(
          response,
          400,
          "Email / Account is not Registered !"
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request");
    }
  },
};
