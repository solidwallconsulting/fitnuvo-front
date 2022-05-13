import { Role } from "./adminsModel/role.model";
import { User } from "./user.model";
import { Permission } from "./permission";

export class Loginresult {
    token: string;
    user: User;
    role: Role;
    menu: Permission[];
}