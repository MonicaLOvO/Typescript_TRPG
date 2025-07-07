export interface CharacterBaseDto {
    id?: string;
    accountId?: string;
    name?: string;
    age?: number | null;
    gender?: string | null;
    description?: string | null;
    occupation?: string | null;
    era?: string | null;
    imageId?: string | null;
    str?: number;
    con?: number;
    siz?: number;
    dex?: number;
    app?: number;
    int?: number;
    pow?: number;
    edu?: number;
    luck?: number | null;
    hp?: number;
    mp?: number;
    san?: number;
    mov?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateCharacterBaseDto {
    accountId: string;  // Required
    name: string;       // Required
    age?: number | null;
    gender?: string | null;
    description?: string | null;
    occupation?: string | null;
    era?: string | null;
    imageId?: string | null;
    str?: number;       // Defaults to 0
    con?: number;       // Defaults to 0
    siz?: number;       // Defaults to 0
    dex?: number;       // Defaults to 0
    app?: number;       // Defaults to 0
    int?: number;       // Defaults to 0
    pow?: number;       // Defaults to 0
    edu?: number;       // Defaults to 0
    luck?: number | null;
    hp?: number;        // Defaults to 0
    mp?: number;        // Defaults to 0
    san?: number;       // Defaults to 0
    mov?: number;       // Defaults to 0
}

export interface UpdateCharacterBaseDto {
    name?: string;
    age?: number | null;
    gender?: string | null;
    description?: string | null;
    occupation?: string | null;
    era?: string | null;
    imageId?: string | null;
    str?: number;
    con?: number;
    siz?: number;
    dex?: number;
    app?: number;
    int?: number;
    pow?: number;
    edu?: number;
    luck?: number | null;
    hp?: number;
    mp?: number;
    san?: number;
    mov?: number;
} 