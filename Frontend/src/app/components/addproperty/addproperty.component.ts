import { Component, Input, OnInit } from '@angular/core';
import { ComponentService } from '../../services/component.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-addproperty',
  templateUrl: './addproperty.component.html',
  styleUrl: './addproperty.component.css'
})
export class AddpropertyComponent implements OnInit {

  @Input() propertyForm: FormGroup;
  
  title: string = 'Add property';
  selectedFloor!: number;
  floors: number[];



  images: any = [];
  propertiesFilesSource: any = [];
  defaultImageIndex: number = -1;

  constructor(private component: ComponentService, private database: DatabaseService) {
    this.propertyForm = new FormGroup({
      propertyOption: new FormControl('', [Validators.required]),
      propertyType: new FormControl('0', [Validators.required]),
      propertyVariant: new FormControl('', [Validators.required]),
      projectName: new FormControl(''),
      propertyName: new FormControl(''),
      city: new FormControl('', [Validators.required]),
      locality: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      bedrooms: new FormControl(''),
      totalFloor: new FormControl(''),
      floorNo: new FormControl(''),
      furnishedStatus: new FormControl(''),
      boundaryWall: new FormControl(''),
      personalWashroom: new FormControl(''),
      balconies: new FormControl(''),
      bathrooms: new FormControl(''),
      pentryCafetria: new FormControl(''),
      facing: new FormControl(''),
      carpetArea: new FormControl(''),
      carpetAreaUnit: new FormControl(''),
      coveredArea: new FormControl(''),
      coveredAreaUnit: new FormControl(''),
      superArea: new FormControl(''),
      superAreaUnit: new FormControl(''),
      plotArea: new FormControl(''),
      plotAreaUnit: new FormControl(''),
      entranceWidth: new FormControl(''),
      entranceWidthUnit: new FormControl(''),
      monthlyRent: new FormControl(''),
      mintanceCharge: new FormControl(''),
      mintanceChargeUnit: new FormControl(''),
      possesionStatus: new FormControl(''),
      constructionAge: new FormControl(''),
      availabilityMonth: new FormControl(''),
      availabilityYear: new FormControl(''),
      rentNagociablePrice: new FormControl(''),
      expectedPrice: new FormControl(''),
      expectedPriceType: new FormControl(''),
      saleNagociablePrice: new FormControl(''),
      amenities: new FormControl([]),
      propertiesFile: new FormControl(''),
      // propertiesFileSource: new FormControl(''),
      defaultImage: new FormControl('', [Validators.required])
    })

    this.floors = Array.from({ length: 200 }, (_, i) => i + 1);
  }


  ngOnInit(): void {
    this.setBannerTitle();
  }

  get f() {
    return this.propertyForm.controls
  }

  onSelectDefaultImage(index: number) {
    this.defaultImageIndex = index;   //update the defaultImageIndex
    this.propertyForm.patchValue({ defaultImage: index })
  }



  onFileChange(event: any) {
    const files = event.target.files
    this.images.push(...files);

    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = (event: any) => {
          // this.images.push(reader.result);
          // this.propertyForm.patchValue({
          // propertiesFileSource: this.images
          // })
          this.propertiesFilesSource.push(event.target.result)
        }
      }
    }
  }

  showRadioSection(): boolean {
    const propertyOption = this.propertyForm.get('propertyOption')?.value;
    const propertyType = this.propertyForm.get('propertyType')?.value;
    if (propertyOption === 'sell') {
      return false; // Hide the section when sell is selected
    }
    if (propertyOption === 'rent') {
      // Conditions to show the section for rent option
      return !['3', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'].includes(propertyType);
    }
    return false; // Hide the section by default
  }


  onCheckboxChange(event: any, amenity: string) {
    const amenities = this.propertyForm.get('amenities')?.value;
    if (event.target.checked) {
      amenities.push(amenity);
    } else {
      const index = amenities.indexOf(amenity);
      if (index !== -1) {
        amenities.splice(index, 1);
      }
    }
    this.propertyForm.get('amenities')?.setValue(amenities);
  }

  submitPropertyForm() {
    // console.log(this.propertyForm.value);
    var propertyOwner = localStorage.getItem('Name');
    if (propertyOwner !== null) {
      const randomNum = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
      var randomNumber = 'prop' + randomNum; // Prefix 'prop' to the random numberform
      var formData = new FormData();
      formData.append('propertyId', randomNumber);
      formData.append('propertyOwner', propertyOwner);
      formData.append('propertyName', this.propertyForm.get('propertyName')?.value);
      formData.append('projectName', this.propertyForm.get('projectName')?.value);
      formData.append('propertyType', this.propertyForm.get('propertyType')?.value);
      formData.append('propertyVariant', this.propertyForm.get('propertyVariant')?.value);
      formData.append('city', this.propertyForm.get('city')?.value);
      formData.append('locality', this.propertyForm.get('locality')?.value);
      formData.append('address', this.propertyForm.get('address')?.value);
      formData.append('bedrooms', this.propertyForm.get('bedrooms')?.value);
      formData.append('totalFloor', this.propertyForm.get('totalFloor')?.value);
      formData.append('floorNo', this.propertyForm.get('floorNo')?.value);
      formData.append('furnishedStatus', this.propertyForm.get('furnishedStatus')?.value);
      formData.append('boundaryWall', this.propertyForm.get('boundaryWall')?.value);
      formData.append('personalWashroom', this.propertyForm.get('personalWashroom')?.value);
      formData.append('balconies', this.propertyForm.get('balconies')?.value);
      formData.append('bathrooms', this.propertyForm.get('bathrooms')?.value);
      formData.append('pentryCafetria', this.propertyForm.get('pentryCafetria')?.value);
      formData.append('facing', this.propertyForm.get('facing')?.value);
      formData.append('carpetArea', this.propertyForm.get('carpetArea')?.value);
      formData.append('carpetAreaUnit', this.propertyForm.get('carpetAreaUnit')?.value);
      formData.append('coveredArea', this.propertyForm.get('coveredArea')?.value);
      formData.append('coveredAreaUnit', this.propertyForm.get('coveredAreaUnit')?.value);
      formData.append('superArea', this.propertyForm.get('superArea')?.value);
      formData.append('superAreaUnit', this.propertyForm.get('superAreaUnit')?.value);
      formData.append('plotArea', this.propertyForm.get('plotArea')?.value);
      formData.append('plotAreaUnit', this.propertyForm.get('plotAreaUnit')?.value);
      formData.append('entranceWidth', this.propertyForm.get('entranceWidth')?.value);
      formData.append('entranceWidthUnit', this.propertyForm.get('entranceWidthUnit')?.value);
      formData.append('monthlyRent', this.propertyForm.get('monthlyRent')?.value);
      formData.append('mintanceCharge', this.propertyForm.get('mintanceCharge')?.value);
      formData.append('mintanceChargeUnit', this.propertyForm.get('mintanceChargeUnit')?.value);
      formData.append('possesionStatus', this.propertyForm.get('possesionStatus')?.value);
      formData.append('constructionAge', this.propertyForm.get('constructionAge')?.value);
      formData.append('availabilityMonth', this.propertyForm.get('availabilityMonth')?.value);
      formData.append('availabilityYear', this.propertyForm.get('availabilityYear')?.value);
      formData.append('rentNagociablePrice', this.propertyForm.get('rentNagociablePrice')?.value);
      formData.append('expectedPrice', this.propertyForm.get('expectedPrice')?.value);
      formData.append('expectedPriceType', this.propertyForm.get('expectedPriceType')?.value);
      formData.append('saleNagociablePrice', this.propertyForm.get('saleNagociablePrice')?.value);
      formData.append('amenities', this.propertyForm.get('amenities')?.value);
      formData.append('defaultImage', this.propertyForm.get('defaultImage')?.value);   

      for (let i = 0; i < this.images.length; i++) {
        formData.append('images', this.images[i]);
      }

      this.database.postProperty(formData).subscribe(data => {
        console.log(data);
      })








      // this.propertyForm.reset();
    }
  }

    setBannerTitle(){
      this.component.setCurrentTitle(this.title);
    }

  



}