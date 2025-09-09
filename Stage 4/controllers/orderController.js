const orderModel = require("../schema/order");

const createUserOrder = async (req, res) => {
  try {
    if (req.user.role != "customer") {
      return res
        .status(401)
        .send({ message: "Only customers can create orders" });
    }

    const { ordersList } = req.body;

    const newOrder = await orderModel.create({
      ordersList,
      ownerId: req.user.userId,
    });

    res
      .status(200)
      .send({ message: "order created successfully", data: newOrder });
  } catch (error) {
    res.send({ message: error.message });
  }
};

const viewOrders = async (req, res) => {
  if (!["customer", "admin"].includes(req.user.role))
    return res.status(400).send({ message: "unauthorized user" });

  if (req.user.role == "customer") {
    const userOrders = await orderModel.find({ ownerId: req.user.userId });
    if (!userOrders) {
      return res.status(400).send({ message: "No orders for this user" });
    }
    res.status(200).send({ message: "success", data: userOrders });
  }

  const allOrders = await orderModel.find();
  if (allOrders.length < 1) {
    return res.status(400).send({ message: "no user orders created" });
  }
  res.status(200).send({ message: "success", data: allOrders });
};

// view one order

const viewOneOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    if (req.user.role == "customer") {
      const userOrders = await orderModel.findOne({
        _id: orderId,
        ownerId: req.user.userId,
      });
      if (!userOrders) {
        return res.status(400).send({ message: "No such order for this user" });
      }
      res.status(200).send({ message: "success", data: userOrders });
    } else if (req.user.role == "admin") {
      const selectedOrder = await orderModel.findById(orderId);
      if (!selectedOrder) {
        return res.status(400).send({ message: "Order not found" });
      }
      res.status(200).send({ message: "success", data: selectedOrder });
    }
  } catch (error) {
    res.send({ message: error.message });
  }
};

const changeOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    if (req.user.role != "admin") {
      return res.status(401).send({ message: "unauthorized user" });
    }

    let { newStatus } = req.body;

    if (
      newStatus &&
      (newStatus == "pending" ||
        newStatus == "shipped" ||
        newStatus == "delivered")
    ) {
      const updatedOrder = await orderModel.findByIdAndUpdate(
        orderId,
        {
          orderStatus: newStatus,
        },
        { returnDocument: "after" }
      );

      // emit message to user

      req.socket.to(updatedOrder.ownerId.toString()).emit("order-update", {
        title: "New shipping status",
        message: `Your last order shipping status has been updated to : ${newStatus}`,
      });

      console.log(updatedOrder.ownerId.toString());

      res
        .status(200)
        .send({ message: "update successful", data: updatedOrder });
    } else {
      res.status(400).send({ message: "incorrect order status" });
    }
  } catch (error) {
    res.send({ message: error.message });
  }
};

module.exports = {
  createUserOrder,
  viewOrders,
  viewOneOrder,
  changeOrderStatus,
};
