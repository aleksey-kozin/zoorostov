const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Admin:Beavers228@zoo.0mnlx.mongodb.net/Zoo", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

module.exports = mongoose.connection


