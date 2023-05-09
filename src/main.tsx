import './styles/global.scss'

import { QueryClient, QueryClientProvider } from 'react-query'

import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
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
      <App />
    </BrowserRouter>
  </QueryClientProvider>
)
