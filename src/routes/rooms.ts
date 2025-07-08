import { Router } from "express";
import { 
    createRoom, 
    deleteRoom, 
    getRoomByID, 
    getRooms, 
    getRoomsByAccount,
    updateRoom 
} from "../handlers/rooms";

const router = Router();

// GET /api/rooms - Get all rooms
router.get('/', getRooms);

// GET /api/rooms/account/:accountId - Get rooms by account ID
router.get('/account/:accountId', getRoomsByAccount);

// GET /api/rooms/:id - Get room by ID
router.get('/:id', getRoomByID);

// POST /api/rooms - Create new room
router.post('/', createRoom);

// PUT /api/rooms/:id - Update room
router.put('/:id', updateRoom);

// DELETE /api/rooms/:id - Delete room
router.delete('/:id', deleteRoom);

export default router; 