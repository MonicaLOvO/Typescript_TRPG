import { Router } from "express";
import { getUserByID, getUsers } from "../handlers/users";

const router = Router();

// /api/users
router.get('/', getUsers);

// /api/users/123
router.get('/:id', getUserByID);

export default router;