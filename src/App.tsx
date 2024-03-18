import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { ThemeProvider } from './components/theme/ThemeProvider'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
import { Toaster } from 'sonner'

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="devContacts-theme">
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster position="top-right" richColors />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  )
}

export default App
