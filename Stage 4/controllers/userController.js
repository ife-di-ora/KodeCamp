const joi = require("joi");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const userModel = require("../schema/user");

const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    // validate role
    const schema = joi.string().valid("admin", "customer");
    const { error } = schema.validate(role);
    if (error) {
      res.status(422).send({ message: error.message });
      return;
    }

    // check if email already exists
    const emailExists = await userModel.findOne({ email });
    if (emailExists) {
      res.status(400).send({ message: "email already exists" });
      return;
    }

    const hashedPwd = bcrypt.hashSync(password, 10);

    const newUser = await userModel.create({
      fullName,
      email,
      password: hashedPwd,
      role,
    });

    res
      .status(200)
      .send({ message: `New ${role} added successfully`, newUser });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const userDetail = await userModel.findOne({ email });

  if (!userDetail) {
    res
      .status(404)
      .send({ message: `No registered user with email: ${email}` });
    return;
  }

  const passwordCheck = bcrypt.compareSync(password, userDetail.password);

  if (!passwordCheck) {
    return res.status(401).send({ message: "invalid credentials" });
  }

  const token = jsonwebtoken.sign(
    {
      userId: userDetail.id,
      email: userDetail.email,
      role: userDetail.role,
    },
    process.env.JWT_KEY,
    { expiresIn: "1d" }
  );

  res.status(200).send({
    message: "Login successful",
    token,
    userDetail: {
      fullName: userDetail.fullName,
      role: userDetail.role,
    },
  });
};

const getAllUsers = async (req, res) => {
  const allUsers = await userModel.find();
  res.send({ data: allUsers });
};

const viewProfile = async (req, res) => {
  try {
    console.log(req.user);
    const { userId } = req.user;
    if (!userId) {
      return res.status(400).send({ message: "user not authenticated" });
    }
    const profile = await userModel.findById(userId).select("-password");
    return res.status(200).send({ data: profile, message: "success" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { registerUser, userLogin, getAllUsers, viewProfile };
