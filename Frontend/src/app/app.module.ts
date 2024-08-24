import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardsComponent } from './components/cards/cards.component';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BigcardComponent } from './components/bigcard/bigcard.component';
import { BannerComponent } from './components/banner/banner.component';
import { ResidentialBuyComponent } from './components/residential-buy/residential-buy.component';
import { ResidentialRentComponent } from './components/residential-rent/residential-rent.component';
import { CommercialRentComponent } from './components/commercial-rent/commercial-rent.component';
import { CommercialBuyComponent } from './components/commercial-buy/commercial-buy.component';
import { AddpropertyComponent } from './components/addproperty/addproperty.component';
import { UserDashComponent } from './components/user-dash/user-dash.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { PropertyDetailComponent } from './components/property-detail/property-detail.component';
import { HttpClientModule ,HttpClient} from '@angular/common/http';
import { AboutComponent } from './components/about/about.component';
import { SellDashboardComponent } from './components/sell-dashboard/sell-dashboard.component';
import { AlertPopupComponent } from './components/alert-popup/alert-popup.component';
import { MultiStepFormComponent } from './components/multi-step-form/multi-step-form.component';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    CardsComponent,
    LoginComponent,
    SignupComponent,
    BigcardComponent,
    BannerComponent,
    ResidentialBuyComponent,
    ResidentialRentComponent,
    CommercialRentComponent,
    CommercialBuyComponent,
    AddpropertyComponent,
    UserDashComponent,
    PropertyListComponent,
    PropertyDetailComponent,
    AboutComponent,
    SellDashboardComponent,
    AlertPopupComponent,
    MultiStepFormComponent,

  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
