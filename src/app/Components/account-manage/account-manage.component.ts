import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";  
import { Router } from "@angular/router";  
import { ProfileService } from 'src/app/Services/Profile/profile.service';
import { Profile } from 'src/app/Entities/Profile';
import { RegisterResult } from 'src/app/Entities/RegisterResult';
import { SocialUser } from 'angular-6-social-login';
import { SocialloginService } from 'src/app/Services/socialLogin/sociallogin.service';
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } 
         from 'angular-6-social-login';  
import { SocialLoginModule, AuthServiceConfig } from 'angular-6-social-login';  


@Component({
  selector: 'app-account-manage',
  templateUrl: './account-manage.component.html',
  styleUrls: ['./account-manage.component.css']
})
export class AccountManageComponent implements OnInit {


  formbtn:string ;  

  userInfo:RegisterResult;

  id:any="";
  registerForm:FormGroup;
  loginForm:FormGroup;  
  

  btnvisibility:boolean;  

  response;  
  socialusers=new SocialUser();

  genders = [
    { id: 1, name: "Male" },
    { id: 2, name: "Female" }
  ];

  constructor(private router:ActivatedRoute,private navRoter:Router,private profileService:ProfileService,public OAuth: AuthService,  
    private SocialloginService: SocialloginService)
  {
    this.btnvisibility=true;
    this.formbtn="Register";

    this.id= this.router.snapshot.params['id'];

    this.registerForm = new FormGroup({       
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      phoneNumber: new FormControl('', [Validators.required,Validators.pattern("[0-9 ]{11}")]),
      // password: new FormControl('', [Validators.required,Validators.minLength(6)])
      password: new FormControl('', [Validators.required])
    });

    this.loginForm = new FormGroup({          
      // emailLogin: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      usernameLogin: new FormControl('', [Validators.required]),
      passwordLogin: new FormControl('', [Validators.required])
    });

  }

  ngOnInit() {
    // if (this.router.snapshot.params['id']) {
    //   //do your stuff. example: console.log('id: ', this.route.snapshot.queryParams['id']);
      
    //   if(this.id!=""){

    //     this.profileService.getSpecificUserInfo(this.id).then(res => {
    //       this.registerForm.patchValue(res);  
    //     }).catch(error => {
    //     });
 
    //     this.btnvisibility = false;  
    //     this.formlabelSignup = 'Edit User Info';  
    //     this.formbtn = 'Update';
    //   }
      
    // }
    
  
    
  }

  back(){
    this.navRoter.navigate(['/home']);
  }

  register() {  
    console.log('Create fire');
    this.profileService.Register(this.registerForm.value).then(res => {
      // this.userInfo= res as RegisterResult;
      this.navRoter.navigate(['/home']);
    }).catch(error => {
      alert("Can't Sign up");  
    });  
  }
  
  login() { 
    debugger; 
    console.log('Login fire');
    this.profileService.Login(this.loginForm.value).then(res => {
      
      // this.userInfo= res as RegisterResult;
      // localStorage.setItem ('token', this.userInfo.token);
      // localStorage.setItem('userId',this.userInfo.id);
      localStorage.setItem('token',res as string);


      this.navRoter.navigate(['/home']);
    }).catch(error => {
      alert("Can't Login");  
    });  
  }

  // Social Login Methods
  socialSignIn(socialProvider: string) {  
    let socialPlatformProvider;  
    if (socialProvider === 'facebook') {  
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;  
    } else if (socialProvider === 'google') {  
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;  
    }
      
    this.OAuth.signIn(socialPlatformProvider).then(socialusers => {  
      console.log(socialProvider, socialusers);  
      console.log(socialusers);  
      this.Savesresponse(socialusers);
  
    });  
  }  

  logout() {  
     this.OAuth.signOut().then(data => {  
       debugger; 
      //  localStorage.removeItem('socialusers');
      localStorage.clear();

       this.navRoter.navigate(['/manage']);  
     });  
  }

  Savesresponse(socialusers: SocialUser) {  
    this.SocialloginService.Savesresponse(socialusers).subscribe((res: any) => {  
      debugger;  
      console.log(res);  
      this.socialusers=res;  
      this.response = res.userDetail;  
      localStorage.setItem('socialusers', JSON.stringify( this.socialusers));  
      localStorage.setItem('userName',socialusers.name);

      console.log(localStorage.setItem('socialusers', JSON.stringify(this.socialusers)));  
      this.navRoter.navigate(['/home']);  
    })  
  }  

}
