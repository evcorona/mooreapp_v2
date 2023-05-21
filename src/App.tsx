import {
  DB_SCHEMA,
  NAVIGATION_ITEMS,
  ROLES,
} from './constants/businessConstants'
import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'

import AdminDashboard from './pages/Administrator/Dashboard'
import AdminPageTemplate from './components/Template/AdminPageTemplate/AdminPageTemplate'
import Administrator from './pages/Administrator/Details'
import Collaborator from './pages/Collaborator/Dashboard'
import CreateClient from './pages/Administrator/Create/CreateClient'
import CreateProject from './pages/Administrator/Create/CreateProject'
import Login from './pages/Login'
import NavBar from './components/NavBar/NavBar'
import { getAll as getAllActivities } from './lib/api/activities'
import { getAll as getAllClients } from './lib/api/clients'
import { getAll as getAllCollaborators } from './lib/api/collaborators'
import { getAll as getAllProjects } from './lib/api/projects'

export default function App() {
  const [isLogged, setIsLogged] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  useEffect(() => {
    const jwt = sessionStorage.getItem('moore-jwt')
    const payload = jwt && JSON.parse(atob(jwt.split('.')[1]))
    if (payload) {
      setIsLogged(true)
      payload.rol === ROLES.admin ? setIsAdmin(true) : setIsAdmin(false)
    } else {
      setIsLogged(false)
    }
  }, [])

  if (!isLogged) {
    return <Login />
  }

  const navigationItems = isAdmin
    ? NAVIGATION_ITEMS.admin
    : NAVIGATION_ITEMS.user

  return (
    <div className="App">
      <div className="fixed -z-50 h-screen w-screen bg-main" />
      <NavBar
        items={navigationItems}
        // name={usr}
        // here={here}
      />
      {isAdmin ? (
        <Routes>
          <Route path="/" element={<Administrator />} />
          <Route path="/administrator" element={<AdminDashboard />} />
          <Route
            path="/clients"
            element={
              <AdminPageTemplate
                title="clientes"
                apiQuery={getAllClients}
                dbSchema={DB_SCHEMA.admin.clients}
                searchPlaceholder="por cliente"
                details
              />
            }
          />
          <Route path="/clients/:id" element={<Administrator />} />
          <Route path="/clients/create" element={<CreateClient />} />

          <Route
            path="/projects"
            element={
              <AdminPageTemplate
                title="proyectos"
                apiQuery={getAllProjects}
                dbSchema={DB_SCHEMA.admin.projects}
                searchPlaceholder="por código de proyecto"
                details
              />
            }
          />
          <Route path="/projects/:id" element={<Administrator />} />
          <Route path="/projects/create" element={<CreateProject />} />

          <Route
            path="/collaborators"
            element={
              <AdminPageTemplate
                title="colaboradores"
                apiQuery={getAllCollaborators}
                dbSchema={DB_SCHEMA.admin.collaborators}
                searchPlaceholder="por nombre de colaborador"
                details
              />
            }
          />
          <Route path="/collaborators/:id" element={<Administrator />} />
          <Route path="/collaborators/create" element={<CreateClient />} />

          <Route
            path="/activities"
            element={
              <AdminPageTemplate
                title="actividades"
                apiQuery={getAllActivities}
                dbSchema={DB_SCHEMA.admin.activities}
                searchPlaceholder="por colaborador"
              />
            }
          />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Collaborator />} />
          <Route path="/collaborator" element={<Collaborator />} />
          <Route path="/activities" element={<Collaborator />} />
          <Route path="/activities/:id" element={<Collaborator />} />
          <Route path="/activities/create" element={<Collaborator />} />
        </Routes>
      )}
      <footer className="mt-6 p-4 text-center text-xs">
        MooreApp made with 💙 by CrownSolutions. v2.0 (2023)
      </footer>
    </div>
  )
}
