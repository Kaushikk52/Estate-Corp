// dash-properties-list.model.ts

export class DashProperties {
    id: number;
    propertyOwner: string;
    propertyId: string;
    propertyName: string;
    projectName: string;
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
    amenities: string[];
    isApproved: number;
    saleNagociablePrice:number;
    expectedPrice:number;
    expectedPriceType:string;

    constructor(
        id: number,
        propertyOwner: string,
        propertyId: string,
        propertyName: string,
        projectName: string,
        propertyType: string,
        propertyOption: number,
        city: string,
        locality: string,
        address: string,
        bedrooms: number,
        totalFloor: number,
        floorNo: number,
        furnishedStatus: string,
        balconies: number,
        bathrooms: number,
        facing: string,
        carpetArea: number,
        carpetAreaUnit: string,
        superArea: number,
        superAreaUnit: string,
        possesionStatus: string,
        amenities: string[],
        isApproved: number,
        saleNagociablePrice:number,
        expectedPrice:number,
        expectedPriceType:string
    ) {
        this.id = id;
        this.propertyOwner = propertyOwner;
        this.propertyId = propertyId;
        this.propertyName = propertyName;
        this.projectName = projectName;
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
        this.amenities = amenities;
        this.isApproved = isApproved;
        this.saleNagociablePrice = saleNagociablePrice;
        this.expectedPrice = expectedPrice;
        this.expectedPriceType = expectedPriceType;
    }
}
