import { Router } from "express";
import { createAccount, deleteAccount, getAccountByID, getAccounts, updateAccount } from "../handlers/accounts";

const router = Router();

// GET /api/accounts - Get all accounts
router.get('/', getAccounts);

// GET /api/accounts/:id - Get account by ID
router.get('/:id', getAccountByID);

// POST /api/accounts - Create new account
router.post('/', createAccount);

// PUT /api/accounts/:id - Update account
router.put('/:id', updateAccount);

// DELETE /api/accounts/:id - Delete account
router.delete('/:id', deleteAccount);

export default router; 