const mongoose = require("mongoose");

// Queries out all the documents with matching schema otherwise gives error or empty result. ?It can be removed so that not matched queries can also be put in result.
mongoose.set("strictQuery", true);
async function connectToMongoDB(url) {
  return mongoose.connect(url);
}

module.exports = {
  connectToMongoDB,
};
