export interface RoomChatDto {
    id?: string;
    roomId: string;
    title?: string;
    content?: string;
    time?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateRoomChatDto {
    roomId: string;
    title?: string;
    content?: string;
    time?: Date;
}

export interface UpdateRoomChatDto {
    roomId?: string;
    title?: string;
    content?: string;
    time?: Date;
} 