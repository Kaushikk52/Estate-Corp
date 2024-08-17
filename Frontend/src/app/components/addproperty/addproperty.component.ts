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

  // submitPropertyForm() {
  //   const propertyOwner = localStorage.getItem('Name');
  //   if (propertyOwner !== null) {
  //       const randomNum = Math.floor(1000 + Math.random() * 9000);
  //       const randomNumber = 'prop' + randomNum;

  //       const formData = new FormData();
  //       formData.append('propertyId', randomNumber);
  //       formData.append('propertyOwner', propertyOwner);
  //       formData.append('propertyName', this.propertyForm.get('propertyName')?.value || null);
  //       formData.append('projectName', this.propertyForm.get('projectName')?.value || null);
  //       formData.append('propertyType', this.propertyForm.get('propertyType')?.value || null);
  //       formData.append('propertyVariant', this.propertyForm.get('propertyVariant')?.value || null);
  //       formData.append('city', this.propertyForm.get('city')?.value || null);
  //       formData.append('locality', this.propertyForm.get('locality')?.value || null);
  //       formData.append('address', this.propertyForm.get('address')?.value || null);
  //       formData.append('bedrooms', this.propertyForm.get('bedrooms')?.value || null);
  //       formData.append('totalFloor', this.propertyForm.get('totalFloor')?.value || null);
  //       formData.append('floorNo', this.propertyForm.get('floorNo')?.value || null);
  //       formData.append('furnishedStatus', this.propertyForm.get('furnishedStatus')?.value || null);
  //       formData.append('boundaryWall', this.propertyForm.get('boundaryWall')?.value || null);
  //       formData.append('personalWashroom', this.propertyForm.get('personalWashroom')?.value || null);
  //       formData.append('balconies', this.propertyForm.get('balconies')?.value || null);
  //       formData.append('bathrooms', this.propertyForm.get('bathrooms')?.value || null);
  //       formData.append('pentryCafetria', this.propertyForm.get('pentryCafetria')?.value || null);
  //       formData.append('facing', this.propertyForm.get('facing')?.value || null);
  //       formData.append('carpetArea', this.propertyForm.get('carpetArea')?.value || null);
  //       formData.append('carpetAreaUnit', this.propertyForm.get('carpetAreaUnit')?.value || null);
  //       formData.append('coveredArea', this.propertyForm.get('coveredArea')?.value || null);
  //       formData.append('coveredAreaUnit', this.propertyForm.get('coveredAreaUnit')?.value || null);
  //       formData.append('superArea', this.propertyForm.get('superArea')?.value || null);
  //       formData.append('superAreaUnit', this.propertyForm.get('superAreaUnit')?.value || null);
  //       formData.append('plotArea', this.propertyForm.get('plotArea')?.value || null);
  //       formData.append('plotAreaUnit', this.propertyForm.get('plotAreaUnit')?.value || null);
  //       formData.append('entranceWidth', this.propertyForm.get('entranceWidth')?.value || null);
  //       formData.append('entranceWidthUnit', this.propertyForm.get('entranceWidthUnit')?.value || null);
  //       formData.append('monthlyRent', this.propertyForm.get('monthlyRent')?.value || null);
  //       formData.append('mintanceCharge', this.propertyForm.get('mintanceCharge')?.value || null);
  //       formData.append('mintanceChargeUnit', this.propertyForm.get('mintanceChargeUnit')?.value || null);
  //       formData.append('possesionStatus', this.propertyForm.get('possesionStatus')?.value || null);
  //       formData.append('constructionAge', this.propertyForm.get('constructionAge')?.value || null);
  //       formData.append('availabilityMonth', this.propertyForm.get('availabilityMonth')?.value || null);
  //       formData.append('availabilityYear', this.propertyForm.get('availabilityYear')?.value || null);
  //       formData.append('rentNegotiablePrice', this.propertyForm.get('rentNegotiablePrice')?.value || null);
  //       formData.append('expectedPrice', this.propertyForm.get('expectedPrice')?.value || null);
  //       formData.append('expectedPriceType', this.propertyForm.get('expectedPriceType')?.value || null);
  //       formData.append('saleNegotiablePrice', this.propertyForm.get('saleNegotiablePrice')?.value || null);
  //       formData.append('amenities', this.propertyForm.get('amenities')?.value || null);
  //       formData.append('defaultImage', this.propertyForm.get('defaultImage')?.value || null);
        
      
  //     for (let i = 0; i < this.images.length; i++) {
  //       formData.append('images', this.images[i]);
  //     }

  //     this.database.postProperty(formData).subscribe(data => {
  //       console.log(data);
  //     })
  //     // this.propertyForm.reset();
  //   }
  // }



  submitPropertyForm() {
    const propertyOwner = localStorage.getItem('Name');
    if (propertyOwner !== null) {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const randomNumber = 'prop' + randomNum;

        const formData = new FormData();
        formData.append('propertyId', randomNumber);
        formData.append('propertyOwner', propertyOwner);

        const fields = [
            'propertyName', 'projectName', 'propertyType', 'propertyVariant',
            'city', 'locality', 'address', 'bedrooms', 'totalFloor', 'floorNo',
            'furnishedStatus', 'boundaryWall', 'personalWashroom', 'balconies',
            'bathrooms', 'pentryCafetria', 'facing', 'carpetArea', 'carpetAreaUnit',
            'coveredArea', 'coveredAreaUnit', 'superArea', 'superAreaUnit',
            'plotArea', 'plotAreaUnit', 'entranceWidth', 'entranceWidthUnit',
            'monthlyRent', 'mintanceCharge', 'mintanceChargeUnit', 'possesionStatus',
            'constructionAge', 'availabilityMonth', 'availabilityYear',
            'rentNegotiablePrice', 'expectedPrice', 'expectedPriceType', 'saleNegotiablePrice',
            'amenities', 'defaultImage'
        ];

        fields.forEach(field => {
            formData.append(field, this.propertyForm.get(field)?.value || '');
        });

        for (let i = 0; i < this.images.length; i++) {
            formData.append('images', this.images[i]);
        }

        this.database.postProperty(formData).subscribe(
            data => {
                console.log(data);
                // Optionally reset the form here
                // this.propertyForm.reset();
            },
            error => {
                console.error('Error:', error);
            }
        );
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