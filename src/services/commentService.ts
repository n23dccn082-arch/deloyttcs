import api from './api'
import type { UserSummary } from './authService'

export interface CommentResponse {
  id: number
  taskId: number
  user: UserSummary
  content: string
  createdAt: string
}

export const commentService = {
  async getComments(taskId: number): Promise<CommentResponse[]> {
    const { data } = await api.get<CommentResponse[]>(`/tasks/${taskId}/comments`)
    return data
  },

  async addComment(taskId: number, content: string): Promise<CommentResponse> {
    const { data } = await api.post<CommentResponse>(`/tasks/${taskId}/comments`, { content })
    return data
  },

  async deleteComment(commentId: number): Promise<void> {
    await api.delete(`/comments/${commentId}`)
  },
}
