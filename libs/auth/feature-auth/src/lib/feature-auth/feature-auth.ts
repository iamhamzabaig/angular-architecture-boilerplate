import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthSessionFacade } from '@boilerplate/data-access-auth';
import { firstValueFrom } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'lib-feature-auth',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './feature-auth.html',
  styleUrl: './feature-auth.scss',
})
export class FeatureAuthComponent {
  private readonly authSession = inject(AuthSessionFacade);
  private readonly router = inject(Router);

  readonly form = new FormGroup({
    email: new FormControl('architect@example.com', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('pass123', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  readonly requestPending = computed(() => this.authSession.requestStatus() === 'loading');
  readonly requestError = this.authSession.requestError;

  async signIn(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    try {
      await firstValueFrom(this.authSession.login(this.form.getRawValue()));
      await this.router.navigate(['/dashboard']);
    } catch {
      // Request error state is exposed as a signal in the facade.
    }
  }
}
