const bcrypt = require("bcrypt");
const helper = require("../helper/index");
const jwt = require("jsonwebtoken");
const {
  isUserExist,
  getUserById,
  patchUser,
  postUser,
  checkUser,
} = require("../model/users");

module.exports = {
  registerUser: async (request, response) => {
    console.log(request.body);
    const { user_email, user_password, user_name } = request.body;
    // console.log(user_password);
    const atps = user_email.indexOf("@");
    const dots = user_email.lastIndexOf(".");
    if (atps < 1 || dots < atps + 2 || dots + 2 > user_email.length) {
      return helper.response(response, 400, "Email is not Valid");
    }
    if (
      user_password.match(/[A-Z]/g) &&
      user_password.match(/[0-9]/g) &&
      user_password.length >= 8
    ) {
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
          return helper.response(
            response,
            200,
            "Success Register User",
            result
          );
          // console.log(setData);
        } catch (error) {
          return helper.response(response, 400, "Bad Request");
          // console.log(error);
        }
      }
    } else {
      return helper.response(
        response,
        400,
        "Password Must include at least 8 characters, 1 digit number and 1 Uppercase Characters"
      );
    }
  },
  patchUser: async (request, response) => {
    if (
      request.body.user_password === undefined ||
      request.body.user_password === null ||
      request.body.user_password === ""
    ) {
      return helper.response(response, 404, "user_password must be filled");
    } else if (
      request.body.user_role === undefined ||
      request.body.user_role === null ||
      request.body.user_role === ""
    ) {
      return helper.response(response, 404, "user_role must be filled");
    } else if (
      request.body.user_status === undefined ||
      request.body.user_status === null ||
      request.body.user_status === ""
    ) {
      return helper.response(response, 404, "user_status must be filled");
    }
    try {
      const { id } = request.params;
      const { user_password, user_role, user_status } = request.body;
      const salt = bcrypt.genSaltSync(10);
      const encryptPassword = bcrypt.hashSync(user_password, salt);
      const setData = {
        user_password: encryptPassword,
        user_role,
        user_status,
        user_updated_at: new Date(),
      };
      const checkId = await getUserById(id);
      console.log(setData);
      if (checkId.length > 0) {
        const result = await patchUser(setData, id);
        return helper.response(response, 200, "Success User Updated", result);
        // console.log(result);
      } else {
        return helper.response(response, 404, `User By Id: ${id} Not Found`);
      }
    } catch (error) {
      return helper.response(response, 404, "Bad Request", error);
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
            return helper.response(response, 400, "Your Account is not Active");
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
