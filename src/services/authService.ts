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
  async register(username: string, email: string, password: string): Promise<void> {
    await api.post('/auth/register', { username, email, password })
  },

  async verifyEmail(token: string): Promise<AuthResponse> {
    const { data } = await api.get<AuthResponse>(`/auth/verify-email?token=${token}`)
    return data
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/login', { email, password })
    return data
  },

  async forgotPassword(email: string): Promise<void> {
    await api.post('/auth/forgot-password', { email })
  },

  async resetPassword(token: string, newPassword: string): Promise<void> {
    await api.post('/auth/reset-password', { token, newPassword })
  },
}
