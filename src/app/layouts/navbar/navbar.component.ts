import {
  AfterViewInit,
  Component,
  computed,
  inject,
  OnInit,
  PLATFORM_ID,
  Signal,
} from '@angular/core';

import { RouterLink } from '@angular/router';

import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { AuthService } from '../../core/auth/services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly flowbiteService = inject(FlowbiteService);
  private readonly authService = inject(AuthService);
  private readonly platform = inject(PLATFORM_ID);
  private readonly cartService = inject(CartService)


  logged: Signal<boolean> = computed(() => this.authService.isLogged())
  count: Signal<number> = computed(() => this.cartService.cartCount())

  ngOnInit(): void {
    this.checkUserToken()
    this.flowbiteService.loadFlowbite();
  }

  checkUserToken(): void {
    if (isPlatformBrowser(this.platform)) {
      const token = localStorage.getItem("martoToken");
      if (token) {
        this.authService.isLogged.set(true)
        this.getCartCount();
      }
    }
  }

  logOut(): void {
    this.authService.signOut();
  }

  getCartCount(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartService.cartCount.set(res.numOfCartItems)
      }
    })
  }


}
