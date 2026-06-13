import api from './api'
import type { UserSummary } from './authService'

export interface ProjectResponse {
  id: number
  name: string
  description: string
  status: 'ACTIVE' | 'ARCHIVED'
  startDate: string | null
  endDate: string | null
  createdBy: UserSummary
  createdAt: string
}

export interface MemberResponse {
  userId: number
  username: string
  email: string
  avatarUrl: string | null
  role: 'ADMIN' | 'MANAGER' | 'MEMBER'
}

export const projectService = {
  async getProjects(): Promise<ProjectResponse[]> {
    const { data } = await api.get<ProjectResponse[]>('/projects')
    return data
  },

  async createProject(payload: {
    name: string; description?: string; startDate?: string; endDate?: string
  }): Promise<ProjectResponse> {
    const { data } = await api.post<ProjectResponse>('/projects', payload)
    return data
  },

  async updateProject(id: number, payload: Partial<{
    name: string; description: string; startDate: string; endDate: string; status: string
  }>): Promise<ProjectResponse> {
    const { data } = await api.put<ProjectResponse>(`/projects/${id}`, payload)
    return data
  },

  async deleteProject(id: number): Promise<void> {
    await api.delete(`/projects/${id}`)
  },

  async getMembers(projectId: number): Promise<MemberResponse[]> {
    const { data } = await api.get<MemberResponse[]>(`/projects/${projectId}/members`)
    return data
  },

  async addMember(projectId: number, email: string, role: string): Promise<MemberResponse> {
    const { data } = await api.post<MemberResponse>(`/projects/${projectId}/members`, { email, role })
    return data
  },

  async updateMemberRole(projectId: number, userId: number, role: string): Promise<MemberResponse> {
    const { data } = await api.put<MemberResponse>(`/projects/${projectId}/members/${userId}`, { role })
    return data
  },

  async removeMember(projectId: number, userId: number): Promise<void> {
    await api.delete(`/projects/${projectId}/members/${userId}`)
  },
}
