export interface CharacterItemsDto {
    id?: string;
    itemName?: string;
    value?: number;
    quantity?: number;
    description?: string;
    diceId?: string;
    characterId?: string;
}

export interface CreateCharacterItemsDto {
    itemName: string;
    value?: number;
    quantity?: number;
    description?: string;
    diceId?: string;
    characterId: string;
} 