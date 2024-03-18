import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRedirect(true)
    }, 5000)

    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    if (redirect) {
      window.location.href = '/'
    }
  }, [redirect])
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Página não encontrada</h1>
      <p className="text-accent-foreground">
        Esta página será redirecionada para a{' '}
        <Link to="/" className="text-primary">
          Página Inicial
        </Link>{' '}
        em 5 segundos.
      </p>
    </div>
  )
}

export { NotFound }
