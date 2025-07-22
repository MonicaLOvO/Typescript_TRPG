export interface ClassStatusDto {
    id?: string;
    statusName: string;
    value: number;
    description?: string | null;
    classId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateClassStatusDto {
    statusName: string;
    value?: number;
    description?: string | null;
    classId: string;
}

export interface UpdateClassStatusDto {
    statusName?: string;
    value?: number;
    description?: string | null;
} 