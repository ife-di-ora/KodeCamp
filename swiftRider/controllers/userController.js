const jwt = require("jsonwebtoken");
const User = require("../schema/User");
const Joi = require("joi");
const bcrypt = require("bcrypt");

//********************** User SignUp Controller ********************//
const userSignUp = async (req, res) => {
  const { email } = req.body;

  const emailExists = await User.findOne({ email });

  if (emailExists) {
    return res
      .status(400)
      .send({ message: "user already exists. please log in" });
  }

  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "ng"] },
      })
      .required(),
    password: Joi.string().required(),
    role: Joi.string().allow("rider", "customer", "admin"),
  });

  const { error, value } = schema.validate(req.body);

  const hashedPassword = bcrypt.hashSync(value.password, 10);

  if (error) {
    return res.status(422).send({ message: error.message });
  }

  const userDetail = await User.create({ ...value, password: hashedPassword });
  res.status(200).send({
    message: `user ${userDetail.email} created successfully`,
  });
};

//********************** User Login Controller ********************//
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const userDetail = await User.findOne({ email });

  if (!userDetail) {
    console.log("user not found");
  }

  if (!bcrypt.compare(password, userDetail.password)) {
    return res.status(401).send({ message: "invalid password" });
  }

  const token = jwt.sign(
    {
      userId: userDetail.id,
      email: userDetail.email,
      role: userDetail.role,
    },
    process.env.JWT_KEY,
    { expiresIn: "1d" }
  );

  res.send({ data: token, message: "successs" });
};

//********************** Get All Users Controller ********************//
const getAllUsers = async (req, res) => {
  const { role } = req.user;

  if (role !== "admin") {
    return res.status(401).send({ message: "unauthorized" });
  }

  const allUsers = await User.find();

  return res.status(200).send({ data: allUsers });
};

module.exports = { userSignUp, userLogin, getAllUsers };
