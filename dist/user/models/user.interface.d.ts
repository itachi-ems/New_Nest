export interface USER {
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: UserRole;
}
export declare enum UserRole {
    ADMIN = "admin",
    INSPECTOR = "inspector",
    SHOPKEEPER = "shopkeeper",
    USER = "user"
}
