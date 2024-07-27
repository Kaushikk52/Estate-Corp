// properties-list.model.ts
export class Properties {
  id: number;
  propertyOwner: string;
  propertyId: string;
  propertyName: string;
  propertyType: string;
  propertyOption: number;
  city: string;
  locality: string;
  address: string;
  bedrooms: number;
  totalFloor: number;
  floorNo: number;
  furnishedStatus: string;
  balconies: number;
  bathrooms: number;
  facing: string;
  carpetArea: number;
  carpetAreaUnit: string;
  superArea: number;
  superAreaUnit: string;
  possesionStatus: string;
  constructionAge: number;
  expectedPrice : number;
  expectedPriceType : string;
  amenities: string[];
  defaultImage: number;
  isConfirm: number;
  isApproved: number;
  
  constructor(id: number, propertyOwner: string, propertyId: string, propertyName: string, propertyType: string, propertyOption: number, city: string, locality: string, address: string, bedrooms: number, totalFloor: number, floorNo: number, furnishedStatus: string, balconies: number, bathrooms: number, facing: string, carpetArea: number, carpetAreaUnit: string, superArea: number, superAreaUnit: string, possesionStatus: string, constructionAge: number, expectedPrice : number, expectedPriceType : string,amenities: string[], defaultImage: number, isConfirm: number, isApproved: number) {
      this.id = id;
      this.propertyOwner = propertyOwner;
      this.propertyId = propertyId;
      this.propertyName = propertyName;
      this.propertyType = propertyType;
      this.propertyOption = propertyOption;
      this.city = city;
      this.locality = locality;
      this.address = address;
      this.bedrooms = bedrooms;
      this.totalFloor = totalFloor;
      this.floorNo = floorNo;
      this.furnishedStatus = furnishedStatus;
      this.balconies = balconies;
      this.bathrooms = bathrooms;
      this.facing = facing;
      this.carpetArea = carpetArea;
      this.carpetAreaUnit = carpetAreaUnit;
      this.superArea = superArea;
      this.superAreaUnit = superAreaUnit;
      this.possesionStatus = possesionStatus;
      this.constructionAge = constructionAge;
      this.expectedPrice = expectedPrice;
      this.expectedPriceType = expectedPriceType;
      this.amenities = amenities;
      this.defaultImage = defaultImage;
      this.isConfirm = isConfirm;
      this.isApproved = isApproved;
  }
}
