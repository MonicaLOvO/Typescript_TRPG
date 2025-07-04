export interface CharacterBaseDto {
    id?: string;
    accountId?: string;
    name?: string;
    age?: number;
    gender?: string;
    description?: string;
    occupation?: string;
    era?: string;
    imageId?: string;
    str?: number;
    con?: number;
    siz?: number;
    dex?: number;
    app?: number;
    int?: number;
    pow?: number;
    edu?: number;
    luck?: number;
    hp?: number;
    mp?: number;
    san?: number;
    mov?: number;
}

export interface CreateCharacterBaseDto {
    accountId: string;
    name: string;
    age?: number;
    gender?: string;
    description?: string;
    occupation?: string;
    era?: string;
    imageId?: string;
    str?: number;
    con?: number;
    siz?: number;
    dex?: number;
    app?: number;
    int?: number;
    pow?: number;
    edu?: number;
    luck?: number;
    hp?: number;
    mp?: number;
    san?: number;
    mov?: number;
} 