const Delivery = require("../schema/Delivery");

const createNewReq = async (req, res) => {
  if (req.user.role.toLocaleLowerCase() !== "customer") {
    return res.status(401).send({ message: "unauthorized user" });
  }

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

// *************** View Req  **************

const viewReq = async (req, res) => {
  if (!req.user) {
    return res.status(400).send({ message: "unauthorised" });
  }
  const { requestId } = req.params;

  const selectedRequest = await Delivery.findOneById(requestId);

  if (!selectedRequest) {
    return res.status(400).send({ message: "Delivery Request not found" });
  }

  if (req.user.role.toLocaleLowerCase() == "customer") {
    if (req.user.id == selectedRequest.ownerId) {
      return res
        .status(200)
        .send({ message: "successful", data: selectedRequest });
    }
    res.status(400).send({ message: "this is not your order" });
  }

  return res.status(200).send({ data: selectedRequest, message: "success" });
};

// *********** Rider Accept Req Controller ************

const acceptReq = async (req, res) => {
  const { requestId } = req.params;
  const { role, id } = req.user;
  const { status } = req.body;

  if (role.toLocaleLowerCase() !== "rider") {
    return res.status(400).send({ message: "unauthorized" });
  }

  const acceptedReq = await Delivery.findByIdAndUpdate(
    requestId,
    { status, riderId: id },
    {
      returnDocument: "after",
    }
  );

  if (acceptedReq) {
    return res
      .status(200)
      .send({ data: acceptedReq, message: "successfully updated" });
  }

  // email client
};

module.exports = { createNewReq, viewReq, acceptReq };
