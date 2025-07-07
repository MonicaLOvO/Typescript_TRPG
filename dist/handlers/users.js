"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
exports.getUserByID = getUserByID;
exports.createUser = createUser;
function getUsers(req, res) {
    res.send([]);
}
function getUserByID(req, res) {
    res.send({});
}
function createUser(req, res) {
    // req.query.loginAfterCreate;
    res.status(201).send({ id: "1", username: "anson", email: "anson@gmail.com" });
}
