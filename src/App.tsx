import {
  DB_SCHEMA,
  NAVIGATION_ITEMS,
  ROLES,
} from './constants/businessConstants'
import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'

import AdminDashboard from './pages/Administrator/Dashboard'
import AdminPageTemplate from './components/Template/AdminPageTemplate/AdminPageTemplate'
import Administrator from './pages/Administrator/Dashboard'
import Collaborator from './pages/Collaborator/Dashboard'
import CreateClient from './pages/Administrator/Create/CreateClient'
import CreateCollaborator from './pages/Administrator/Create/CreateCollaborator'
import CreateProject from './pages/Administrator/Create/CreateProject'
import Details from './pages/Administrator/Details'
import EditClient from './pages/Administrator/Edit/EditClient'
import EditCollaborator from './pages/Administrator/Edit/EditCollaborator'
import EditProject from './pages/Administrator/Edit/EditProject'
import Login from './pages/Login'
import NavBar from './components/NavBar/NavBar'
import PageNotFound from './pages/PageNotFound'
import getApiQuery from './utils/getApiQuery'
import getHeaders from './utils/getHeaders'

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
      <div className="fixed -z-50 h-screen w-screen bg-background" />
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
                apiQuery={getApiQuery('getAll', 'clients')}
                headers={getHeaders('clients')}
                searchPlaceholder="por cliente"
                details
              />
            }
          />
          <Route
            path="/clients/:id"
            element={
              <Details
                title={'Detalles del cliente'}
                apiQuery={getApiQuery('getById', 'clients')}
                deleteApi={getApiQuery('deleteById', 'clients')}
                headers={getHeaders('clients')}
                dbSchema={DB_SCHEMA.admin.clients}
                collection="client"
              />
            }
          />
          <Route path="/clients/create" element={<CreateClient />} />
          <Route path="/clients/:id/edit" element={<EditClient />} />

          <Route
            path="/projects"
            element={
              <AdminPageTemplate
                title="proyectos"
                apiQuery={getApiQuery('getAll', 'projects')}
                headers={getHeaders('projects')}
                searchPlaceholder="por código de proyecto"
                details
              />
            }
          />
          <Route
            path="/projects/:id"
            element={
              <Details
                title={'Detalles del proyecto'}
                apiQuery={getApiQuery('getById', 'projects')}
                deleteApi={getApiQuery('deleteById', 'projects')}
                headers={getHeaders('projects')}
                collection="project"
              />
            }
          />
          <Route path="/projects/create" element={<CreateProject />} />
          <Route path="/projects/:id/edit" element={<EditProject />} />

          <Route
            path="/collaborators"
            element={
              <AdminPageTemplate
                title="colaboradores"
                apiQuery={getApiQuery('getAll', 'collaborators')}
                headers={getHeaders('collaborators')}
                searchPlaceholder="por nombre de colaborador"
                details
              />
            }
          />
          <Route
            path="/collaborators/:id"
            element={
              <Details
                title={'Detalles del colaborador'}
                apiQuery={getApiQuery('getById', 'collaborators')}
                deleteApi={getApiQuery('deleteById', 'collaborators')}
                headers={getHeaders('projects')}
                dbSchema={DB_SCHEMA.admin.collaborators}
                collection="collaborator"
              />
            }
          />
          <Route
            path="/collaborators/create"
            element={<CreateCollaborator />}
          />
          <Route
            path="/collaborators/:id/edit"
            element={<EditCollaborator />}
          />

          <Route
            path="/activities"
            element={
              <AdminPageTemplate
                title="actividades"
                apiQuery={getApiQuery('getAll', 'activities')}
                headers={getHeaders('activities')}
                searchPlaceholder="por colaborador"
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
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
      <footer className="w-full p-4 text-center text-xs italic text-gray">
        MooreApp made with 💙 by CrownSolutions. v2.0 (2023)
      </footer>
    </div>
  )
}
