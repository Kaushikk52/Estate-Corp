import Address from "./Address";
import FloorPlan from "./FloorPlan";
interface Project {
    id: string;
    name: string;
    description: string;
    images: string[];
    totalFloors: number;
    location: string;
    builtIn: string;
    possesion: string;
    ammenities: string[];
    address: Address;
    floorPlans: FloorPlan[];
    underConstruction:boolean;
}

export default Project;