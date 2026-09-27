import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';
import { log } from 'node:console';

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.component.css',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router)

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginFormInit();
  }

  loginFormInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    })
  }


  submitForm(): void {
    if (this.loginForm.valid) {
      this.authService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            // save token and user data

            localStorage.setItem('martoToken', res.token)
            localStorage.setItem('userData', JSON.stringify(res.user))
            this.authService.isLogged.set(true)

            // navigate to home
            this.router.navigate(['/'])
          }

        }
      })
    } else {
      this.loginForm.markAllAsTouched()

    }

  }
}
