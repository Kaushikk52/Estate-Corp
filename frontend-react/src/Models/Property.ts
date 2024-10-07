import PropertyDetails from "./PropertyDetails";
import Address from "./Address";
import User from "./User";
interface Property {
    id: string;
    name: string;
    owner:User;
    images: string[];
    type: string;
    address: Address;
    details: PropertyDetails;
  }

  export default Property;