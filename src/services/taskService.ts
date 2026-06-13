import api from './api'
import type { UserSummary } from './authService'

export interface TaskResponse {
  id: number
  projectId: number
  projectName: string
  sprintId: number | null
  sprintName: string | null
  title: string
  description: string | null
  status: 'TODO' | 'IN_PROGRESS' | 'DONE'
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  storyPoints: number | null
  assignee: UserSummary | null
  createdBy: UserSummary
  dueDate: string | null
  createdAt: string
  updatedAt: string
}

export const taskService = {
  async getTasks(projectId: number, sprintId?: number): Promise<TaskResponse[]> {
    const params = sprintId ? { sprintId } : {}
    const { data } = await api.get<TaskResponse[]>(`/projects/${projectId}/tasks`, { params })
    return data
  },

  async createTask(projectId: number, payload: {
    title: string; description?: string; status?: string; priority?: string
    storyPoints?: number; assigneeId?: number; sprintId?: number; dueDate?: string
  }): Promise<TaskResponse> {
    const { data } = await api.post<TaskResponse>(`/projects/${projectId}/tasks`, payload)
    return data
  },

  async getTask(taskId: number): Promise<TaskResponse> {
    const { data } = await api.get<TaskResponse>(`/tasks/${taskId}`)
    return data
  },

  async updateTask(taskId: number, payload: Partial<{
    title: string; description: string; status: string; priority: string
    storyPoints: number; assigneeId: number; sprintId: number; dueDate: string
  }>): Promise<TaskResponse> {
    const { data } = await api.put<TaskResponse>(`/tasks/${taskId}`, payload)
    return data
  },

  async updateStatus(taskId: number, status: string): Promise<TaskResponse> {
    const { data } = await api.put<TaskResponse>(`/tasks/${taskId}/status`, { status })
    return data
  },

  async deleteTask(taskId: number): Promise<void> {
    await api.delete(`/tasks/${taskId}`)
  },

  async getMyTasks(status?: string): Promise<TaskResponse[]> {
    const params = status ? { status } : {}
    const { data } = await api.get<TaskResponse[]>('/tasks/my-tasks', { params })
    return data
  },
}
