const Delivery = require("../schema/Delivery");

const addLocation = async (req, res) => {
  const { deliveryId } = req.params;

  const delivery = await Delivery.findById(deliveryId);
  if (delivery.status !== "inprogress") {
    res.send({
      message: "cannot update delivery location as delivery is not in progress",
    });
  }

  const { coordinates } = req.body;

  const currentLocation = await Delivery.findByIdAndUpdate(
    deliveryId,
    {
      location: {
        coordinates,
        updatedAt: new Date(),
      },
    },
    { new: true }
  );

  res.status(200).send({ message: "success", data: currentLocation.location });
};

const getLocation = async (req, res) => {
  const { deliveryId } = req.params;
  const itemToTrack = await Delivery.findById(deliveryId);

  if (!itemToTrack.location) {
    return res.send({ message: "location not found" });
  }

  res.send({ data: itemToTrack.location, message: "tracking" });
};

module.exports = { addLocation, getLocation };
