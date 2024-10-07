import Project from "./Project";
import Property from "./Property"
interface User{
    id:string;
    token:string;
    fullName:string;
    email:string;
    phone:string;
    projects:Project[];
    properties:Property[];
    role:string;
}

export default User;