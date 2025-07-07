"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accounts_1 = require("../handlers/accounts");
const router = (0, express_1.Router)();
// GET /api/accounts - Get all accounts
router.get('/', accounts_1.getAccounts);
// GET /api/accounts/:id - Get account by ID
router.get('/:id', accounts_1.getAccountByID);
// POST /api/accounts - Create new account
router.post('/', accounts_1.createAccount);
// PUT /api/accounts/:id - Update account
router.put('/:id', accounts_1.updateAccount);
// DELETE /api/accounts/:id - Delete account
router.delete('/:id', accounts_1.deleteAccount);
exports.default = router;
