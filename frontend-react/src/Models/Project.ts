import Address from "./Address";
import FloorPlan from "./FloorPlan";
import User from "./User";
interface Project {
    id: string;
    name: string;
    owner:User;
    description: string;
    images: string[];
    totalFloors: number;
    location: string;
    builtIn: string;
    possesion: string;
    ammenities: string[];
    address: Address;
    floorPlans: FloorPlan[];
    underConstruction:string;
}

export default Project;