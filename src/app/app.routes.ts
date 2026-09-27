import { Routes } from '@angular/router';
import { authGuardGuard } from './core/auth/guards/auth-guard-guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/home/home.component').then((c) => c.HomeComponent),
        title: 'Home | Marto'
    },
    {
        path: 'brands',
        loadComponent: () =>
            import('./features/brands/brands.component').then(
                (c) => c.BrandsComponent
            ),
        title: 'Brands | Marto',
    },
    {
        path: 'products',
        loadComponent: () =>
            import('./features/products/products.component')
                .then((c) => c.ProductsComponent),
        title: 'Products | Marto'
    },
    {
        path: 'categories/:id',
        loadComponent: () => import('./features/categories/categories.component').then((c) => c.CategoriesComponent),
        title: 'Categories | Marto'
    },

    {
        path: 'details/:slug/:id',
        loadComponent: () => import('./features/details/details.component').then((c) => c.DetailsComponent),
        title: 'Details | Marto'
    },
    {
        path: 'cart',
        loadComponent: () => import('./features/cart/cart.component').then((c) => c.CartComponent),
        title: 'Cart | Marto',
        canActivate: [authGuardGuard]
    },
    {
        path: 'checkout/:id',
        loadComponent: () => import('./features/checkout/checkout.component').then((c) => c.CheckoutComponent),
        title: 'Checkout | Marto',
        canActivate: [authGuardGuard]
    },
    {
        path: 'allorders',
        loadComponent: () => import('./features/allorders/allorders.component').then((c) => c.AllordersComponent),
        title: 'Orders | Marto',
        canActivate: [authGuardGuard]
    },
    {
        path: 'shop',
        loadComponent: () => import('./features/shop/shop.component').then((c) => c.ShopComponent),
        title: 'Shop | Marto'
    },
    {
        path: 'wishlist',
        loadComponent: () => import('./features/wishlist/wishlist.component').then((c) => c.WishlistComponent),
        title: 'Wishlist | Marto',
        canActivate: [authGuardGuard]
    },
    {
        path: 'login',
        loadComponent: () => import('./features/login/login.component').then((c) => c.LoginComponent),
        title: 'Login | Marto'
    },
    {
        path: 'register',
        loadComponent: () => import('./features/register/register.component').then((c) => c.RegisterComponent),
        title: 'Register | Marto'
    },
    {
        path: 'forgotpassword',
        loadComponent: () => import('./features/forgot-password/forgot-password.component').then((c) => c.ForgotPasswordComponent),
        title: 'Forgot Password | Marto'
    },
    {
        path: '**',
        loadComponent: () => import('./features/not-found/not-found.component').then((c) => c.NotFoundComponent),
        title: 'Page Not Found | Marto'
    }
];
