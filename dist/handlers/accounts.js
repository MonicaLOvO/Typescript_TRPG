"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccounts = getAccounts;
exports.getAccountByID = getAccountByID;
exports.createAccount = createAccount;
exports.updateAccount = updateAccount;
exports.deleteAccount = deleteAccount;
const prisma_1 = require("../lib/prisma");
// GET /api/accounts - Get all accounts
function getAccounts(req, res) {
    prisma_1.prisma.account.findMany({
        select: {
            id: true,
            username: true,
            email: true
        }
    })
        .then((accounts) => {
        res.json(accounts);
    })
        .catch((error) => {
        console.error('Error fetching accounts:', error);
        res.status(500).json([]);
    });
}
// GET /api/accounts/:id - Get account by ID
function getAccountByID(req, res) {
    const { id } = req.params;
    prisma_1.prisma.account.findUnique({
        where: { id },
        select: {
            id: true,
            username: true,
            email: true
        }
    })
        .then((account) => {
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        res.json(account);
    })
        .catch((error) => {
        console.error('Error fetching account:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}
// POST /api/accounts - Create new account
function createAccount(req, res) {
    const accountDto = req.body;
    // Check if account with same username or email already exists
    prisma_1.prisma.account.findFirst({
        where: {
            OR: [
                { username: accountDto.username },
                { email: accountDto.email }
            ]
        }
    })
        .then((existingAccount) => {
        if (existingAccount) {
            res.status(400).json({ error: 'Username or email already exists' });
            return null;
        }
        return prisma_1.prisma.account.create({
            data: {
                username: accountDto.username,
                email: accountDto.email,
                password: accountDto.password // Note: In production, hash the password before storing
            },
            select: {
                id: true,
                username: true,
                email: true
            }
        });
    })
        .then((account) => {
        if (account) {
            res.status(201).json(account);
        }
    })
        .catch((error) => {
        console.error('Error creating account:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}
// PUT /api/accounts/:id - Update account
function updateAccount(req, res) {
    const { id } = req.params;
    const accountDto = req.body;
    prisma_1.prisma.account.findUnique({
        where: { id }
    })
        .then((existingAccount) => {
        if (!existingAccount) {
            res.status(404).json({ error: 'Account not found' });
            return null;
        }
        // If updating username or email, check for conflicts
        if (accountDto.username || accountDto.email) {
            return prisma_1.prisma.account.findFirst({
                where: {
                    OR: [
                        ...(accountDto.username ? [{ username: accountDto.username }] : []),
                        ...(accountDto.email ? [{ email: accountDto.email }] : [])
                    ],
                    NOT: { id }
                }
            })
                .then((conflictAccount) => {
                if (conflictAccount) {
                    res.status(400).json({ error: 'Username or email already exists' });
                    return null;
                }
                return prisma_1.prisma.account.update({
                    where: { id },
                    data: Object.assign(Object.assign(Object.assign({}, (accountDto.username && { username: accountDto.username })), (accountDto.email && { email: accountDto.email })), (accountDto.password && { password: accountDto.password })),
                    select: {
                        id: true,
                        username: true,
                        email: true
                    }
                });
            });
        }
        return prisma_1.prisma.account.update({
            where: { id },
            data: Object.assign(Object.assign(Object.assign({}, (accountDto.username && { username: accountDto.username })), (accountDto.email && { email: accountDto.email })), (accountDto.password && { password: accountDto.password })),
            select: {
                id: true,
                username: true,
                email: true
            }
        });
    })
        .then((account) => {
        if (account)
            res.json(account);
    })
        .catch((error) => {
        console.error('Error updating account:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}
// DELETE /api/accounts/:id - Delete account
function deleteAccount(req, res) {
    const { id } = req.params;
    prisma_1.prisma.account.findUnique({
        where: { id }
    })
        .then((existingAccount) => {
        if (!existingAccount) {
            res.status(404).json({ error: 'Account not found' });
            return null;
        }
        return prisma_1.prisma.account.delete({
            where: { id }
        });
    })
        .then((result) => {
        if (result) {
            res.json({ message: 'Account deleted successfully' });
        }
    })
        .catch((error) => {
        console.error('Error deleting account:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}
