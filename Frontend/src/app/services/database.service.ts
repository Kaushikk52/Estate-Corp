import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { Properties } from '../Models/properties';
import { DashProperties } from '../Models/dashproperties';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  
  dbAddr = 'http://localhost:3000';

  postSignupFormData(data: any){
    return this.http.post(`${this.dbAddr}/users/signup`, data);
  }
  
  postLogin(data: any){
    return this.http.post(`${this.dbAddr}/users/login`, data);
  }

  getAllUser(){
    return this.http.get<User[]>(`${this.dbAddr}/users/all-user`);
  }

  checkEmail(data: any){
    return this.http.get(`${this.dbAddr}/users/check-email?email=${data}`);
  }

  checkContact(data: any){
    return this.http.get(`${this.dbAddr}/users/check-contact?number=${data}`)
  }

  postVerifyToken(data: any){
    
    return this.http.post(`${this.dbAddr}/verify-token`, {token:data})
  }

  postProperty(data: any){
    return this.http.post(`${this.dbAddr}/properties`, data)
  }

  getNotConfirmProperties(){
    return this.http.get<Properties[]>(`${this.dbAddr}/properties`);
  }

  getAllProperties(){
    return this.http.get<Properties[]>(`${this.dbAddr}/properties/all`);
  }

  getProperties(city: string, propertyType: string){
    return this.http.get<Properties[]>(`${this.dbAddr}/properties/search?city=${city}&propertyType=${propertyType}`);
  }

  confirmProperty(id: string){
    return this.http.get(`${this.dbAddr}/properties/confirm?id=${id}`);
  }

  getApprovedProperties(){
    return this.http.get<DashProperties[]>(`${this.dbAddr}/properties/allapproved`);
  }

  getApprovedPropertyById(propertyId: string){
    return this.http.get<DashProperties>(`${this.dbAddr}/properties/${propertyId}`);
  }
  

  approveProperty(id: string){
    return this.http.put(`${this.dbAddr}/properties/approve?id=${id}`,id);
  }

  unApproveProperty(id: string){
    return this.http.put(`${this.dbAddr}/properties/unapprove?id=${id}`,id);
  }

  getPropertyById(propertyId: string){
    return this.http.get(`${this.dbAddr}/properties/${propertyId}`);
  }


}

