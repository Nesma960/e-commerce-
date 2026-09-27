import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validate } from '@angular/forms/signals';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-register',
  styleUrl: './register.component.css',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router)

  registerForm!: FormGroup;

  ngOnInit(): void {
    this.registerFormInit();
  }

  registerFormInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      rePassword: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/)]]
    },
      {
        validators: [this.confirmPassword]
      })
  }

  // custom validation
  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get("rePassword")?.value;
    if (password !== rePassword && rePassword !== '') {
      group.get('rePassword')?.setErrors({ mismatch: true })
      return { mismatch: true }
    }
    return null
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      this.authService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            setTimeout(() => {
              this.router.navigate(['/login'])
            }, 500);
          }

        }
      })
    } else {
      this.registerForm.markAllAsTouched()
    }

  }
}
