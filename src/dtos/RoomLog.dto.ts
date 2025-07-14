export interface RoomLogDto {
    id?: string;
    roomId: string;
    title?: string;
    content?: string;
    time?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateRoomLogDto {
    roomId: string;
    title?: string;
    content?: string;
    time?: Date;
}

export interface UpdateRoomLogDto {
    roomId?: string;
    title?: string;
    content?: string;
    time?: Date;
} 