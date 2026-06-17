import api from './api'

export interface SprintResponse {
  id: number
  projectId: number
  name: string
  goal: string | null
  startDate: string | null
  endDate: string | null
  status: 'PLANNING' | 'ACTIVE' | 'COMPLETED'
  totalTasks: number
  doneTasks: number
  totalPoints: number
  donePoints: number
}

export interface UpdateSprintPayload {
  name?: string
  goal?: string
  startDate?: string
  endDate?: string
}

export interface BurndownPoint {
  date: string
  ideal: number
  actual: number | null
}

export interface BurndownDataResponse {
  sprintId: number
  sprintName: string
  byTask: BurndownPoint[]
  byPoint: BurndownPoint[]
}

export const sprintService = {
  async getSprints(projectId: number): Promise<SprintResponse[]> {
    const { data } = await api.get<SprintResponse[]>(`/projects/${projectId}/sprints`)
    return data
  },

  async createSprint(projectId: number, payload: {
    name: string; goal?: string; startDate?: string; endDate?: string
  }): Promise<SprintResponse> {
    const { data } = await api.post<SprintResponse>(`/projects/${projectId}/sprints`, payload)
    return data
  },

  async startSprint(sprintId: number): Promise<SprintResponse> {
    const { data } = await api.put<SprintResponse>(`/sprints/${sprintId}/start`)
    return data
  },

  async completeSprint(sprintId: number): Promise<SprintResponse> {
    const { data } = await api.put<SprintResponse>(`/sprints/${sprintId}/complete`)
    return data
  },

  async getBurndown(sprintId: number): Promise<BurndownDataResponse> {
    const { data } = await api.get<BurndownDataResponse>(`/sprints/${sprintId}/burndown`)
    return data
  },

  async updateSprint(sprintId: number, payload: UpdateSprintPayload): Promise<SprintResponse> {
    const { data } = await api.put<SprintResponse>(`/sprints/${sprintId}`, payload)
    return data
  },

  async deleteSprint(sprintId: number): Promise<void> {
    await api.delete(`/sprints/${sprintId}`)
  },
}
