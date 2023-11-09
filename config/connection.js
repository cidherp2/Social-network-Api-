const { connect, connection } = require("mongoose");

const uri =  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/SN-Api-Db"

connect(uri);

module.exports = connection;