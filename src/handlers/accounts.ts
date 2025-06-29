import { Request, Response } from "express";
import { AccountDto } from "../dtos/Account.dto";
import { Account } from "../types/response";
import { prisma } from "../lib/prisma";
import { MapToEntity, MapToDto } from "../Mapper/AccountMapper";

// GET /api/accounts - Get all accounts
export function getAccounts(req: Request, res: Response) {
    prisma.account.findMany({
        select: {
            id: true,
            username: true,
            email: true
        }
    })
    .then((accounts: any) => {
        res.json(accounts);
    })
    .catch((error: any) => {
        console.error('Error fetching accounts:', error);
        res.status(500).json([]);
    });
}

// GET /api/accounts/:id - Get account by ID
export function getAccountByID(req: Request, res: Response) {
    const { id } = req.params;
    
    prisma.account.findUnique({
        where: { id },
        select: {
            id: true,
            username: true,
            email: true
        }
    })
    .then((account: any) => {
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        res.json(account);
    })
    .catch((error: any) => {
        console.error('Error fetching account:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}

// POST /api/accounts - Create new account
export function createAccount(req: Request, res: Response) {
    const accountDto = req.body as AccountDto;
    
    // Check if account with same username or email already exists
    prisma.account.findFirst({
        where: {
            OR: [
                { username: accountDto.username },
                { email: accountDto.email }
            ]
        }
    })
    .then((existingAccount: any) => {
        if (existingAccount) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }
        
        return prisma.account.create({
            data: {
                username: accountDto.username!,
                email: accountDto.email!,
                password: accountDto.password! // Note: In production, hash the password before storing
            },
            select: {
                id: true,
                username: true,
                email: true
            }
        });
    })
    .then((account: any) => {
        res.status(201).json(account);
    })
    .catch((error: any) => {
        console.error('Error creating account:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}

// PUT /api/accounts/:id - Update account
export function updateAccount(req: Request, res: Response) {
    const { id } = req.params;
    const accountDto = req.body as AccountDto;
    
    prisma.account.findUnique({
        where: { id }
    })
    .then((existingAccount: any) => {
        if (!existingAccount) {
            return res.status(404).json({ error: 'Account not found' });
        }
        
        // If updating username or email, check for conflicts
        if (accountDto.username || accountDto.email) {
            return prisma.account.findFirst({
                where: {
                    OR: [
                        ...(accountDto.username ? [{ username: accountDto.username }] : []),
                        ...(accountDto.email ? [{ email: accountDto.email }] : [])
                    ],
                    NOT: { id }
                }
            })
            .then((conflictAccount: any) => {
                if (conflictAccount) {
                    return res.status(400).json({ error: 'Username or email already exists' });
                }
                
                return prisma.account.update({
                    where: { id },
                    data: {
                        ...(accountDto.username && { username: accountDto.username }),
                        ...(accountDto.email && { email: accountDto.email }),
                        ...(accountDto.password && { password: accountDto.password })
                    },
                    select: {
                        id: true,
                        username: true,
                        email: true
                    }
                });
            });
        }
        
        return prisma.account.update({
            where: { id },
            data: {
                ...(accountDto.username && { username: accountDto.username }),
                ...(accountDto.email && { email: accountDto.email }),
                ...(accountDto.password && { password: accountDto.password })
            },
            select: {
                id: true,
                username: true,
                email: true
            }
        });
    })
    .then((account: any) => {
        if (account) res.json(account);
    })
    .catch((error: any) => {
        console.error('Error updating account:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}

// DELETE /api/accounts/:id - Delete account
export function deleteAccount(req: Request, res: Response) {
    const { id } = req.params;
    
    prisma.account.findUnique({
        where: { id }
    })
    .then((existingAccount: any) => {
        if (!existingAccount) {
            return res.status(404).json({ error: 'Account not found' });
        }
        
        return prisma.account.delete({
            where: { id }
        });
    })
    .then(() => {
        res.json({ message: 'Account deleted successfully' });
    })
    .catch((error: any) => {
        console.error('Error deleting account:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}
