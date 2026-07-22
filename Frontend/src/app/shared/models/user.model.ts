export interface User {
  id: string;
  email: string;
  displayName: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface GroupSummary {
  id: string;
  name: string;
  memberCount: number;
}
