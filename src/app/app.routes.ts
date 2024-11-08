import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { OpinionsComponent } from './opinions/opinions.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginComponent } from './login/login.component';
import { SiginComponent } from './sigin/sigin.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { RestartPasswordComponent } from './restart-password/restart-password.component';



export const routes: Routes = [
    {
        path:'',
        component:HomeComponent 
    },
    {
        path:'tienda',
        component:ShopComponent 
    },
    {
        path:'opiniones',
        component:OpinionsComponent 
    },
    {
        path:'sobre_nosotros',
        component:AboutUsComponent 
    },
    {
        path:'ingreso',
        component:LoginComponent 
    },
    {
        path:'registro',
        component:SiginComponent 
    },
    {
        path:'carrito',
        component:ShopCartComponent
    },
    {
        path:'recuperar',
        component:ForgetPasswordComponent
    },
    {
        path:'reiniciar',
        component:RestartPasswordComponent
    }
];
