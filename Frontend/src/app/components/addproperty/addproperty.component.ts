import { Component, Input, OnInit } from '@angular/core';
import { ComponentService } from '../../services/component.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-addproperty',
  templateUrl: './addproperty.component.html',
  styleUrls: ['./addproperty.component.css']
})
export class AddpropertyComponent implements OnInit {
  @Input() propertyForm: FormGroup;
  @Input() secondFormGroup: FormGroup;
  @Input() thirdFormGroup: FormGroup;
  @Input() fourthFormGroup: FormGroup;

  currentStep = 1;
  title: string = 'Add property';
  selectedFloor!: number;
  floors: number[];
  images: any = [];
  propertiesFilesSource: any = [];
  defaultImageIndex: number = -1;

  constructor(
    private component: ComponentService,
    private database: DatabaseService,
    private formBuilder: FormBuilder
  ) {
    // Initialize the form
    this.propertyForm = this.formBuilder.group({
      propertyOption: new FormControl('', [Validators.required]),
      propertyType: new FormControl('0', [Validators.required]),
      propertyVariant: new FormControl(''),
      projectName: new FormControl(''),
      propertyName: new FormControl(''),
      city: new FormControl('', [Validators.required]),
      locality: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      boundaryWall: new FormControl(''),
      personalWashroom: new FormControl(''),
      pentryCafetria: new FormControl(''),
      entranceWidth: new FormControl(''),
      entranceWidthUnit: new FormControl(''),
      monthlyRent: new FormControl(''),
      mintanceCharge: new FormControl(''),
      mintanceChargeUnit: new FormControl(''),
      possesionStatus: new FormControl(''),
      constructionAge: new FormControl(''),
      availabilityMonth: new FormControl(''),
      availabilityYear: new FormControl(''),
      rentNegotiablePrice: new FormControl(''),
      expectedPrice: new FormControl(''),
      expectedPriceType: new FormControl(''),
      saleNegotiablePrice: new FormControl(''),
    });

    this.secondFormGroup = this.formBuilder.group({
      propertiesFile: new FormControl(''),
      defaultImage: new FormControl('', [Validators.required])
    });

    this.thirdFormGroup = this.formBuilder.group({
      bedrooms: new FormControl(''),
      balconies: new FormControl(''),
      bathrooms: new FormControl(''),
      totalFloor: new FormControl(''),
      floorNo: new FormControl(''),
      facing: new FormControl(''),
      furnishedStatus: new FormControl(''),
      carpetArea: new FormControl(''),
      carpetAreaUnit: new FormControl(''),
      coveredArea: new FormControl(''),
      coveredAreaUnit: new FormControl(''),
      superArea: new FormControl(''),
      superAreaUnit: new FormControl(''),
      plotArea: new FormControl(''),
      plotAreaUnit: new FormControl(''),
     
    });

    this.fourthFormGroup = this.formBuilder.group({
      amenities: new FormControl([]),
    });

    this.floors = Array.from({ length: 200 }, (_, i) => i + 1);
  }

  ngOnInit(): void {
    this.setBannerTitle();
    this.onPropertyOptionChange(); // Add this line to initialize the listener
  }

  get f() {
    return this.propertyForm.controls;
  }

  onSelectDefaultImage(index: number) {
    this.defaultImageIndex = index; // Update the defaultImageIndex
    this.propertyForm.patchValue({ defaultImage: index });
  }

  onFileChange(event: any) {
    const files = event.target.files;
    this.images.push(...files);

    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = (event: any) => {
          this.propertiesFilesSource.push(event.target.result);
        };
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

  // Listen for changes on the propertyOption form control
  onPropertyOptionChange() {
    this.propertyForm.get('propertyOption')?.valueChanges.subscribe((value) => {
      const propertyVariantControl = this.propertyForm.get('propertyVariant');

      if (value === 'rent') {
        propertyVariantControl?.setValidators([Validators.required]);
      } else {
        propertyVariantControl?.clearValidators();
      }

      propertyVariantControl?.updateValueAndValidity();
    });
  }

  nextStep() {
    // Log the form validity and all controls
    console.log('Property Form Valid:', this.propertyForm.valid);
    Object.keys(this.propertyForm.controls).forEach((key) => {
      const control = this.propertyForm.get(key);
      console.log(
        `Control: ${key}, Valid: ${control?.valid}, Value: ${control?.value}, Errors: ${control?.errors}`
      );
    });

    // Check if form is valid and proceed
    if (this.currentStep === 1 && this.propertyForm.valid) {
      this.currentStep++;
      console.log('Moving to step 2');
    } else if (this.currentStep === 2 && this.secondFormGroup.valid) {
      this.currentStep++;
      console.log('Moving to step 3');
    }else if(this.currentStep === 3 && this.thirdFormGroup.valid){
      this.currentStep++;
      console.log('Moving to step 4');
    }else {
      console.log('Form is not valid or another issue is present');
    }
  }

  previousStep() {
    this.currentStep--;
  }

  submitPropertyForm() {
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
      formData.append('rentNegotiablePrice', this.propertyForm.get('rentNegotiablePrice')?.value);
      formData.append('expectedPrice', this.propertyForm.get('expectedPrice')?.value);
      formData.append('expectedPriceType', this.propertyForm.get('expectedPriceType')?.value);
      formData.append('saleNegotiablePrice', this.propertyForm.get('saleNegotiablePrice')?.value);
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

  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.propertyForm.patchValue({
        image: file
      });
      // Optional: You can also use a FileReader to preview the image
      // const reader = new FileReader();
      // reader.onload = () => {
      //   console.log(reader.result); // Handle the file preview
      // };
      // reader.readAsDataURL(file);
    }
  }

    setBannerTitle(){
      this.component.setCurrentTitle(this.title);
    }

  



}