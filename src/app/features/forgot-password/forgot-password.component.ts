import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-forgot-password',
  styleUrl: './forgot-password.component.css',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {

  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  private readonly toastrService = inject(ToastrService);

  step: WritableSignal<number> = signal<number>(1)


  emailControl: WritableSignal<FormControl> = signal<FormControl>(new FormControl('', [Validators.required, Validators.email]))
  resetCodeControl: WritableSignal<FormControl> = signal<FormControl>(new FormControl('', [Validators.required]))
  newPasswordControl: WritableSignal<FormControl> = signal<FormControl>(new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]))

  submitEmail(e: SubmitEvent): void {
    e.preventDefault();

    if (this.emailControl().valid) {
      const data = {
        email: this.emailControl().value
      }
      // call api
      this.authService.forgotPassword(data).subscribe({
        next: (res) => {
          if (res.statusMsg === 'success') {
            // toaster Message
            this.toastrService.success(res.message, 'MartoCart', {
              progressBar: true,
              timeOut: 1000,
              closeButton: true,
            })
            setTimeout(() => {
              this.step.set(2);
            }, 1000);
          }
        }
      })
    }
  }


  submitResetCode(e: SubmitEvent): void {
    e.preventDefault()
    if (this.resetCodeControl().valid) {
      const data = {
        resetCode: this.resetCodeControl().value
      }
      // call api
      this.authService.verifyResetCode(data).subscribe({
        next: (res) => {
          if (res.status === 'Success') {
            // toaster Message
            this.toastrService.success('Code verified successfully!', "MartoCart", {
              progressBar: true,
              timeOut: 1000,
              closeButton: true
            })
            setTimeout(() => {
              this.step.set(3);
            }, 1000);
          }
        }
      })
    }
  }

  submitNewPassword(e: SubmitEvent): void {
    e.preventDefault()
    if (this.newPasswordControl().valid) {
      const data = {
        email: this.emailControl().value,
        newPassword: this.newPasswordControl().value
      }
      // call api
      this.authService.resetPassword(data).subscribe({
        next: (res) => {
          // toaster
          this.toastrService.success('Password reset successfully!', 'MartoCart', {
            closeButton: true,
            timeOut: 1000,
            progressBar: true,
          })

          // navigate login
          setTimeout(() => {
            this.router.navigate(['/login'])
          }, 1500);
        }
      })
    }
  }


}
