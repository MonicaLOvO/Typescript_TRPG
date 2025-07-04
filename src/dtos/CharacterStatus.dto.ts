export interface CharacterStatusDto {
    id?: string;
    statusName?: string;
    value?: number;
    description?: string;
    characterId?: string;
}

export interface CreateCharacterStatusDto {
    statusName: string;
    value?: number;
    description?: string;
    characterId: string;
} 