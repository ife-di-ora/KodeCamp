const nodemailer = require("nodemailer");
const Delivery = require("../schema/Delivery");
const User = require("../schema/User");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const createNewReq = async (req, res) => {
  if (req.user.role.toLocaleLowerCase() !== "customer") {
    return res.status(401).send({ message: "unauthorized user" });
  }

  console.log(req.user.id);

  const deliveryRequest = await Delivery.create({
    ...req.body,
    ownerId: req.user.id,
  });

  if (!deliveryRequest) {
    return res.status(500).send({ message: "failed to create request" });
  }
  return res
    .status(200)
    .send({ message: "successfully created request", data: deliveryRequest });
};

// *************** View All Req  **************
const viewAllReq = async (req, res) => {
  if (req.user.role.toLocaleLowerCase() === "admin") {
    const allReq = await Delivery.find();
    res.status(200).send({ data: allReq, message: "success" });
    return;
  }

  if (req.user.role.toLocaleLowerCase() === "rider") {
    const allPendingReq = await Delivery.find({ status: "pending" });
    res.status(200).send({ data: allPendingReq, message: "success" });
    return;
  }

  if (req.user.role.toLocaleLowerCase() === "customer") {
    const allMyReq = await Delivery.find({ ownerId: req.user.id });
    res.status(200).send({ data: allMyReq, message: "success" });
    return;
  }
};

// *************** View One Req  **************

const viewReq = async (req, res) => {
  if (!req.user) {
    return res.status(400).send({ message: "unauthorised" });
  }
  const { requestId } = req.params;

  const selectedRequest = await Delivery.findById(requestId);

  if (!selectedRequest) {
    return res.status(400).send({ message: "Delivery Request not found" });
  }

  if (req.user.role.toLocaleLowerCase() == "customer") {
    console.log(req.user.id, "-", selectedRequest.ownerId.toString());
    if (req.user.id === selectedRequest.ownerId.toString()) {
      return res
        .status(200)
        .send({ message: "successful", data: selectedRequest });
    }
    res.status(401).send({ message: "this is not your order" });
  }

  return res.status(200).send({ data: selectedRequest, message: "success" });
};

// *********** Rider Accept Req Controller ************

const acceptReq = async (req, res) => {
  const { requestId } = req.params;
  const { role, id, email } = req.user;
  const { status } = req.body;

  if (role.toLocaleLowerCase() !== "rider") {
    return res.status(401).send({ message: "unauthorized" });
  }

  const acceptedReq = await Delivery.findByIdAndUpdate(
    requestId,
    { status, riderId: id },
    {
      returnDocument: "after",
      runValidators: true,
    }
  );

  if (acceptedReq) {
    return res
      .status(200)
      .send({ data: acceptedReq, message: "successfully updated" });
  }

  // email client

  (async () => {
    const reqOwner = await User.findById(acceptedReq.ownerId);

    await transporter.sendMail({
      from: "Swift Rider",
      to: reqOwner.email,
      subject: "Update on your package",
      text: `your order is ${acceptedReq.status}`,
    });
  })();
};

module.exports = { createNewReq, viewReq, acceptReq, viewAllReq };
