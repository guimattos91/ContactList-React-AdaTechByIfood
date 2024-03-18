// import { api } from '@/lib/axios'

// export async function signOut() {
//   await api.post('/sign-out')
// }

export async function signOut() {
  sessionStorage.removeItem('devContactsToken')
  localStorage.removeItem('devContactsToken')
}
