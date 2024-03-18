import { createBrowserRouter } from 'react-router-dom'
import { Error } from './pages/Error'
import { NotFound } from './pages/NotFound404'
import { Hero } from './pages/hero/Hero'
import { SignIn } from './pages/auth/SignIn'
import { SignUp } from './pages/auth/SignUp'
import { Contacts } from './pages/Contacts'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Hero />,
    errorElement: <Error />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
    errorElement: <Error />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
    errorElement: <Error />,
  },
  {
    path: '/contacts',
    element: <Contacts />,
    errorElement: <Error />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
