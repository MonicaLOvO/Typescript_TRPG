export interface ClassItemsDto {
    id?: string;
    itemName: string;
    value?: number | null;
    quantity: number;
    description?: string | null;
    diceId?: string | null;
    classId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateClassItemsDto {
    itemName: string;
    value?: number | null;
    quantity?: number;
    description?: string | null;
    diceId?: string | null;
    classId: string;
}

export interface UpdateClassItemsDto {
    itemName?: string;
    value?: number | null;
    quantity?: number;
    description?: string | null;
    diceId?: string | null;
} 