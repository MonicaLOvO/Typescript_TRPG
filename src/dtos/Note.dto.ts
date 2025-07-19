export interface NoteDto {
    id?: string;
    actorId: string;
    title?: string;
    content?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateNoteDto {
    actorId: string;
    title: string;
    content: string;
}

export interface UpdateNoteDto {
    actorId?: string;
    title?: string;
    content?: string;
} 