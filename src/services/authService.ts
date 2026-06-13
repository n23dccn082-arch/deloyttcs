import api from './api'

export interface UserSummary {
  id: number
  username: string
  email: string
  avatarUrl: string | null
}

export interface AuthResponse {
  token: string
  user: UserSummary
}

export const authService = {
  async register(username: string, email: string, password: string): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/register', { username, email, password })
    return data
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/login', { email, password })
    return data
  },
}
