import { createContext, useContext, useState, type ReactNode } from 'react'
import type { ProjectResponse } from '../services/projectService'

export type { ProjectResponse }

interface ProjectContextType {
  projects: ProjectResponse[]
  activeProject: ProjectResponse | null
  setActiveProject: (p: ProjectResponse) => void
  setProjects: (projects: ProjectResponse[]) => void
}

const ProjectContext = createContext<ProjectContextType | null>(null)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<ProjectResponse[]>([])
  const [activeProject, setActiveProject] = useState<ProjectResponse | null>(null)

  return (
    <ProjectContext.Provider value={{ projects, activeProject, setActiveProject, setProjects }}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProject() {
  const ctx = useContext(ProjectContext)
  if (!ctx) throw new Error('useProject must be used inside ProjectProvider')
  return ctx
}
