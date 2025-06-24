import { Router } from "express";
import { createUser, getUserByID, getUsers } from "../handlers/users";

const router = Router();

// /api/users
router.get('/', getUsers);

// /api/users/123
router.get('/:id', getUserByID);

// /api/users
router.post('/', createUser);
export default router;