import PropertyDetails from "./PropertyDetails";
import Address from "./Address";
import User from "./User";

export enum Type{
  RENT = "RENT",
  BUY = "BUY"
}

interface Property {
    id: string;
    name: string;
    mahareraNo:string;
    owner:User;
    images: string[];
    type: Type;
    address: Address;
    details: PropertyDetails;
    createdAt:Date;
    
  }

  export default Property;