import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProfileService } from './Services/Profile/profile.service';
import { Router } from '@angular/router';
import { SocialloginService } from './Services/socialLogin/sociallogin.service';
import { AuthService } from 'angular-6-social-login';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ahmedRaafatTask';
  username:any;

  constructor(private translate: TranslateService, private navRoter: Router,private profileService: ProfileService,private socialLoginService: SocialloginService,public OAuth: AuthService) {
    translate.setDefaultLang('en');
    this.username=localStorage.getItem('userName');
  }

  logout() {
    // localStorage.removeItem("token");
    localStorage.clear();

    this.OAuth.signOut().then(data => {  
     localStorage.clear();
     this.profileService.loggedIn = false;

      this.navRoter.navigate(['/manage']);  
    });  

  }
}
