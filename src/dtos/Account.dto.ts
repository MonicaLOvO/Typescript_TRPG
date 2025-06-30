export interface AccountDto {
    id?: string;
    username?: string;
    email?: string;
    password?: string;
}

export interface CreateAccountDto {
    username: string;
    email: string;
    password: string;
} 