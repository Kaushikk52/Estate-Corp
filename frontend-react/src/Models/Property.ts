import PropertyDetails from "./PropertyDetails";
import Address from "./Address";
interface Property {
    id: string;
    name: string;
    images: string[];
    type: string;
    address: Address;
    details: PropertyDetails;
  }

  export default Property;