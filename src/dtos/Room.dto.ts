export interface RoomDto {
    id?: string;
    accountId?: string;
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateRoomDto {
    accountId: string;
    name: string;
} 