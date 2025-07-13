export interface ImageDto {
    id?: string;
    imageBase64: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateImageDto {
    imageBase64: string;
}

export interface UpdateImageDto {
    imageBase64?: string;
} 