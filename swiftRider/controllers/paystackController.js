const axios = require("axios");

const initializePayment = async (req, res) => {
  try {
    if (req.user.role.toLocaleLowerCase() !== "customer") {
      res.status(401).send({ message: "unauthorized user" });
    }

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize ",
      { email: req.user.email, amount: req.body.amount * 100 },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    res.status(response.status).send({ result: response.data });
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = { initializePayment };
