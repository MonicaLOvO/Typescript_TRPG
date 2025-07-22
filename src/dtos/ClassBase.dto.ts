export interface ClassBaseDto {
    id?: string;
    name: string;
    age?: number | null;
    gender?: string | null;
    description?: string | null;
    occupation?: string | null;
    era?: string | null;
    imageId?: string | null;
    str: number;
    con: number;
    siz: number;
    dex: number;
    app: number;
    int: number;
    pow: number;
    edu: number;
    luck?: number | null;
    hp: number;
    mp: number;
    san: number;
    mov: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateClassBaseDto {
    name: string;
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

export interface UpdateClassBaseDto {
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