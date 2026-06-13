import api from './api'
import type { TaskResponse } from './taskService'

export interface SprintProgressResponse {
  sprintId: number
  sprintName: string
  projectId: number
  projectName: string
  totalTasks: number
  doneTasks: number
  totalPoints: number
  donePoints: number
  endDate: string | null
}

export interface DashboardResponse {
  todayTasks: TaskResponse[]
  upcomingTasks: TaskResponse[]
  sprintProgress: SprintProgressResponse[]
}

export const dashboardService = {
  async getMyFocus(): Promise<DashboardResponse> {
    const { data } = await api.get<DashboardResponse>('/dashboard/my-focus')
    return data
  },
}
