const { VITE_API_URL } = import.meta.env
const token = sessionStorage.getItem('moore-jwt')

export const routes = {
  login: `${VITE_API_URL}/auth/login/`,
  signup: `${VITE_API_URL}/auth/signup/`,
  collaborators: `${VITE_API_URL}/users/`,
  clients: `${VITE_API_URL}/clients/`,
  projects: `${VITE_API_URL}/projects/`,
  activities: `${VITE_API_URL}/activities/`,
  userActivities: `${VITE_API_URL}/activities/user/`,
  insights: `${VITE_API_URL}/insights/`,
}

export const headers = { headers: { Authorization: token } }
