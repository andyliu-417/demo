var mongoose = require("mongoose");
var config = require("../configs/config.json");

mongoose.connect(config.mongoDbUri, { useNewUrlParser: true });

require("./user");
require("./event");
