import { UserRole } from "./user.interface";
export declare class UserEntity {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    role: UserRole;
    emailToLowerCase(): void;
}
