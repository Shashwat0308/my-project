const jwt = require("jsonwebtoken");
const SECRET_KEY = "secretkey";

const auth = async (req, res, next) => {
