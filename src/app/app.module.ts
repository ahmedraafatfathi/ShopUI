import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

// import router file
import {appRoutingModule} from '../app/Routing/appRouting';
import { AccountManageComponent } from './Components/account-manage/account-manage.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { HomeComponent } from './Components/home/home.component';


import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AboutComponent } from './Components/about/about.component';



import { GoogleLoginProvider, FacebookLoginProvider, AuthService } 
         from 'angular-6-social-login';  
import { SocialLoginModule, AuthServiceConfig } from 'angular-6-social-login';  
import { TokenInterceptor } from './Interceptors/TokenInterceptor.interceptor';
import { ProductComponent } from './Components/product/product.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthGuard } from './Guards/auth.gaurd';


export function socialConfigs() {  
  const config = new AuthServiceConfig(  
    [  
     
      {  
        id: GoogleLoginProvider.PROVIDER_ID,  
        provider: new GoogleLoginProvider('313221005134-0sp0rvoi3eijo0dn5hbicburc0rhvhjq.apps.googleusercontent.com')  
      }  
    ]  
  );  
  return config;  
}  


@NgModule({
  declarations: [
    AppComponent,
    AccountManageComponent,
    NotFoundComponent,
    HomeComponent,
    AboutComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,

    // routing class
    appRoutingModule,

    //ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
  ],
  providers: [
    AuthGuard,
    AuthService,  
    {  
      provide: AuthServiceConfig,  
      useFactory: socialConfigs  
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}