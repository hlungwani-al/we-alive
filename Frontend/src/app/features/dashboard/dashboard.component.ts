import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CheckinService } from '../../core/services/checkin.service';
import { ConnectionsService } from '../../core/services/connections.service';
import { ConnectionSearchResult, ConnectionSummary } from '../../shared/models/user.model';

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
  readonly searchQuery = signal('');
  readonly searchResults = signal<ConnectionSearchResult[]>([]);
  readonly searchInProgress = signal(false);
  readonly searchError = signal<string | null>(null);

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

  updateSearchQuery(value: string): void {
    this.searchQuery.set(value);
  }

  searchPeople(): void {
    const query = this.searchQuery().trim();
    if (!query) {
      this.searchResults.set([]);
      this.searchError.set(null);
      return;
    }

    this.searchInProgress.set(true);
    this.searchError.set(null);

    this.connectionsService.search(query).subscribe({
      next: (results) => {
        const connectedIds = new Set(this.connections().map((connection) => connection.id));
        this.searchResults.set(
          results.map((result) => ({
            ...result,
            connected: connectedIds.has(result.id),
          })),
        );
        this.searchInProgress.set(false);
      },
      error: () => {
        this.searchResults.set([]);
        this.searchError.set('Could not load search results. Please try again.');
        this.searchInProgress.set(false);
      },
    });
  }

  connectTo(userId: string): void {
    this.connectionsService.connect(userId).subscribe({
      next: (connection) => {
        this.connections.update((current) => [...current, connection]);
        this.searchResults.update((results) =>
          results.map((result) =>
            result.id === userId ? { ...result, connected: true } : result,
          ),
        );
      },
      error: () => {
        this.searchError.set('Could not connect right now. Please try again.');
      },
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
