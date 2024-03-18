import { ContactList } from '@/components/ContactList'
import { SearchComponent } from '@/components/SearchComponent'
import { BsPersonLinesFill } from 'react-icons/bs'
import { ModalRegister } from '@/components/ModalRegister'
import { MenuUser } from '@/components/MenuUser'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { api } from '@/lib/axios'
import { isAxiosError } from 'axios'

const Contacts = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status
          if (status === 401) {
            sessionStorage.removeItem('devContactsToken')
            localStorage.removeItem('devContactsToken')
            navigate('/sign-in', { replace: true })
          } else {
            throw error
          }
        }
      },
    )

    return () => {
      api.interceptors.response.eject(interceptor)
    }
  }, [navigate])
  return (
    <>
      <div className="w-100 flex items-center justify-center gap-4 bg-secondary pb-16 pt-8 text-2xl font-bold text-primary sm:text-4xl ">
        <BsPersonLinesFill /> Meus Contatos
        <div className="fixed right-2 sm:right-8">
          <MenuUser />
        </div>
      </div>
      <SearchComponent />
      <div className="search"></div>
      <ContactList />
      <ModalRegister />
    </>
  )
}

export { Contacts }
