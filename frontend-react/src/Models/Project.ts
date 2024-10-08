import Address from "./Address";
import FloorPlan from "./FloorPlan";
interface Project {
    id: string;
    name: string;
    description: string;
    images: string[];
    totalFloor: number;
    location: string;
    builtIn: string;
    possesion: string;
    ammenities: string[];
    address: Address;
    floorPlans: FloorPlan[];
}

export default Project;