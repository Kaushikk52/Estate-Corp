import Project from "./Project";
import Property from "./Property"

export enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
    AGENT = "AGENT",
    RESALER = "RESALER",
}
interface User{
    id:string;
    token:string;
    fullName:string;
    email:string;
    phone:string;
    projects:Project[];
    properties:Property[];
    role:Role;
}

export default User;