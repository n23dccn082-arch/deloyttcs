import { createContext, useContext, useState, type ReactNode } from 'react'
import type { ProjectResponse } from '../services/projectService'

export type { ProjectResponse }

const STORAGE_KEY = 'taskflow_active_project'

interface ProjectContextType {
  projects: ProjectResponse[]
  activeProject: ProjectResponse | null
  setActiveProject: (p: ProjectResponse) => void
  setProjects: (projects: ProjectResponse[]) => void
}

const ProjectContext = createContext<ProjectContextType | null>(null)

function loadSaved(): ProjectResponse | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ProjectResponse) : null
  } catch { return null }
}

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<ProjectResponse[]>([])
  const [activeProject, setActiveProjectState] = useState<ProjectResponse | null>(loadSaved)

  function setActiveProject(p: ProjectResponse) {
    setActiveProjectState(p)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p))
  }

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
