export enum RoleType {
    KP = 0,
    Player = 1
}

// Optional: You can also export a class wrapper if you prefer the C# style structure
export class RoleEnum {
    public static RoleType = RoleType;
} 