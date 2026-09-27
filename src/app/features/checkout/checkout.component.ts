import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PaymentService } from '../../core/services/payment/payment.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-checkout',
  styleUrl: './checkout.component.css',
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit {
  private readonly paymentService = inject(PaymentService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder)
  private readonly router = inject(Router)

  paymentMethod = signal<'cash' | 'visa'>('cash');
  cartId: WritableSignal<string> = signal<string>('');
  checkoutForm!: FormGroup;

  ngOnInit(): void {
    this.getCartId();
    this.checkoutFormInit()
  }

  getCartId(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.cartId.set(param.get('id')!)
    })
  }

  checkoutFormInit(): void {
    this.checkoutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
        city: ['', [Validators.required]]
      })
    })
  }

  submitForm(): void {
    if (this.checkoutForm.valid) {
      if (this.paymentMethod() === 'cash') {
        // call cash Api
        this.paymentService.createCashOrder(this.cartId(), this.checkoutForm.value).subscribe({
          next: (res) => {
            if (res.status === 'success') {
              // navigate to order page
              this.router.navigate(['/allorders'])
            }
          }
        })
      }
      else if (this.paymentMethod() === 'visa') {
        // call visa Api
        this.paymentService.checkoutSession(this.cartId(), this.checkoutForm.value).subscribe({
          next: (res) => {
            if (res.status === 'success') {
              open(res.session.url, "_self")
            }
          }
        })
      }
    }
  }
}
