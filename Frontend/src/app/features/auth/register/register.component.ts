import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>{
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if(!password || !confirmPassword) return null;

  if(password.value !== confirmPassword.value){
    confirmPassword.setErrors({passwordMismatch:true});
    return {passwordMismatch:true};
  } else{
    if(confirmPassword.hasError('passwordMismatch')){
      const errors = confirmPassword.errors;
      delete errors?.['passwordMismatch'];
      confirmPassword.setErrors(Object.keys(errors || {}).length ? errors : null)
    }
  }
  return null;
};

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  readonly form: FormGroup;

  readonly strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  constructor(
    private readonly fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      displayName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.strongPasswordRegex)]],
      confirmPassword:['', [Validators.required]],
    }, {validators: passwordMatchValidator});
  }

  readonly isSubmitting = signal(false);
  readonly errorMessage = signal<string | null>(null);

  submit(): void {
    if (this.form.invalid || this.isSubmitting()) {
      this.form.markAllAsTouched();
      return;
    }

    const { displayName, email, password } = this.form.getRawValue();
    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    this.auth.register(email!, password!, displayName!).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => {
        this.isSubmitting.set(false);
        this.errorMessage.set('Could not create account. The email may already be in use.');
      },
    });
  }
}
