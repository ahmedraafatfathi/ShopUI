import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AccountManageComponent } from '../Components/account-manage/account-manage.component';
import { NotFoundComponent } from '../Components/not-found/not-found.component';
import { HomeComponent } from '../Components/home/home.component';
import { AboutComponent } from '../Components/about/about.component';
import { ProductComponent } from '../Components/product/product.component';
import { AuthGuard } from '../Guards/auth.gaurd';

const routes: Routes = [
    {path:'home',component:HomeComponent},
    {path:'about',component:AboutComponent},
    {path:'manage',component:AccountManageComponent},
    {path:'product',component:ProductComponent , 
    canActivate: [AuthGuard]},
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'**',component:NotFoundComponent},

]

@NgModule({

    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})

export class appRoutingModule {

}