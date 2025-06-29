import { AccountDto } from "../dtos/Account.dto";
import { Account } from "../types/response";

export function MapToEntity(dto: AccountDto): Account
{
    return {
        id: dto.id ?? "",
        username: dto.username ?? "",
        email: dto.email ?? ""
    }
}

export function MapToDto(entity: Account): AccountDto
{
    return {
        id: entity.id,
        username: entity.username ?? "",
        email: entity.email ?? ""
    }
}
