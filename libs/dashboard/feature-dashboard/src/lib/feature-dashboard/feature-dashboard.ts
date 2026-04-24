import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthSessionFacade } from '@boilerplate/data-access-auth';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'lib-feature-dashboard',
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './feature-dashboard.html',
  styleUrl: './feature-dashboard.scss',
})
export class FeatureDashboardComponent {
  private readonly authSession = inject(AuthSessionFacade);
  private readonly router = inject(Router);

  readonly session = this.authSession.session;
  readonly displayName = computed(() => this.session()?.user.displayName ?? 'User');

  async logout(): Promise<void> {
    this.authSession.logout();
    await this.router.navigate(['/login']);
  }
}
