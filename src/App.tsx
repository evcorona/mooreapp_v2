import { QueryClient, QueryClientProvider } from 'react-query'

import { BrowserRouter } from 'react-router-dom'
import Login from './pages/login'
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient()
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <ToastContainer
          position="top-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          limit={3}
          theme="colored"
        />
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  )
}
