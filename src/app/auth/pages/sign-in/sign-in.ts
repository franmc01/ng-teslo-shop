import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@/auth/services/auth-service';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Component({
  selector: 'app-sign-in',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);

  hasError = signal(false);
  isPosting = signal(false);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  async onSubmit() {
    this.isPosting.set(true);
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      if (!email || !password) return;

      const loginSuccess = await firstValueFrom(this.authService.login(email, password));
      if (loginSuccess) {
        // Login exitoso
        console.log('Login successful');
        this.router.navigateByUrl('/');
      } else {
        // Login falló
        console.log('Login failed');
        this.hasError.set(true);
        this.isPosting.set(false);
      }
    } else {
      console.log('Login failed:', this.loginForm);
      this.loginForm.markAllAsTouched();
      this.isPosting.set(false);
      this.hasError.set(true);
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    const hasTouched = control?.touched;

    if (control?.hasError('required') && hasTouched) {
      return 'This field is required';
    }
    if (control?.hasError('email') && hasTouched) {
      return 'Invalid email format';
    }
    if (control?.hasError('minlength') && hasTouched) {
      return 'Minimum length is 6 characters';
    }
    return '';
  }
}
