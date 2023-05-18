import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Administrator from './pages/Dashboard'
import Collaborator from './pages/Dashboard'
import Login from './pages/login'
import NavBar from './components/NavBar/NavBar'
import businessConstants from './constants/businessConstants'

export default function App() {
  const [isLogged, setIsLogged] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  useEffect(() => {
    const jwt = sessionStorage.getItem('moore-jwt')
    const payload = jwt && JSON.parse(atob(jwt.split('.')[1]))
    if (payload) {
      setIsLogged(true)
      payload.rol === businessConstants.roles.admin
        ? setIsAdmin(true)
        : setIsAdmin(false)
    } else {
      setIsLogged(false)
    }
  }, [])

  if (!isLogged) {
    return <Login />
  }

  const navigationItems = isAdmin
    ? businessConstants.navigation.admin
    : businessConstants.navigation.user

  return (
    <div className="App">
      <NavBar
        items={navigationItems}
        // name={usr}
        // here={here}
      />
      {isAdmin ? (
        <Routes>
          <Route path="/" element={<Administrator />} />
          <Route path="/administrator" element={<Administrator />} />
          <Route path="/clients" element={<Administrator />} />
          <Route path="/clients/:id" element={<Administrator />} />
          <Route path="/clients/create" element={<Administrator />} />
          <Route path="/projects" element={<Administrator />} />
          <Route path="/projects/:id" element={<Administrator />} />
          <Route path="/projects/create" element={<Administrator />} />
          <Route path="/collaborators" element={<Administrator />} />
          <Route path="/collaborators/:id" element={<Administrator />} />
          <Route path="/collaborators/create" element={<Administrator />} />
          <Route path="/activities" element={<Administrator />} />
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
    </div>
  )
}

{
  /* <QueryClientProvider client={queryClient}>
      <div className="App">
        
        {!isLogged ? <Login /> : <Collaborator />}

         {!self ? <Login /> : <p>Hello</p>}
         <BrowserRouter>
          <Routes></Routes>
        </BrowserRouter> 
      </div>
    </QueryClientProvider> */
}
