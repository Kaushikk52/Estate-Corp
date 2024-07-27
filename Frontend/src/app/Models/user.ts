// user.model.ts

export class User {
    id: number;
    fullName: string;
    email: string;
    contactNo: string;
    maharera: string;
    propertyCount: number;
  
    constructor(id: number, fullName: string, email: string, contactNo: string, maharera: string, propertyCount: number) {
      this.id = id;
      this.fullName = fullName;
      this.email = email;
      this.contactNo = contactNo;
      this.maharera = maharera;
      this.propertyCount = propertyCount;
    }
  }
  