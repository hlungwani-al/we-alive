import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CheckinService } from '../../core/services/checkin.service';
import { ConnectionsService } from '../../core/services/connections.service';
import { ConnectionSummary } from '../../shared/models/user.model';

const CHECKIN_WINDOW_MS = 24 * 60 * 60 * 1000;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  readonly connections = signal<ConnectionSummary[]>([]);
  readonly isChecking = signal(false);
  readonly lastCheckedInAt = signal<Date | null>(null);
  readonly justConfirmed = signal(false);

  /** Derived "alive" status: true within the 24h window since the last check-in. */
  readonly isCurrentlyAlive = computed(() => {
    const last = this.lastCheckedInAt();
    if (!last) return false;
    return Date.now() - last.getTime() < CHECKIN_WINDOW_MS;
  });

  constructor(
    private readonly auth: AuthService,
    private readonly checkinService: CheckinService,
    private readonly connectionsService: ConnectionsService,
    private readonly router: Router,
  ) {}

  get user() {
    return this.auth.currentUser;
  }

  ngOnInit(): void {
    this.connectionsService.listMine().subscribe({
      next: (connections) => this.connections.set(connections),
      error: () => this.connections.set([]),
    });
  }

  tapAlive(): void {
    if (this.isChecking()) return;
    this.isChecking.set(true);

    this.checkinService.checkIn().subscribe({
      next: (res) => {
        this.lastCheckedInAt.set(new Date(res.checkedInAt));
        this.isChecking.set(false);
        this.justConfirmed.set(true);
        setTimeout(() => this.justConfirmed.set(false), 2200);
      },
      error: () => {
        this.isChecking.set(false);
      },
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
