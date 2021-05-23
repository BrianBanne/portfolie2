const connectToDB = require("./database");
const expressLoader = require("./express");

module.exports = async ({ express }) => {
  await connectToDB();
  await expressLoader(express);
};
