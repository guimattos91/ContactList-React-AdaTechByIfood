import { api } from '@/lib/axios'

export interface UpdateUserProfileResponse {
  data: {
    nome?: string
    email?: string
    senha?: string
    foto?: string
  }
  status: number
}

export async function updateUserProfile({
  nome,
  email,
  senha,
  foto,
}: {
  nome?: string
  email?: string
  senha?: string
  foto?: string
}) {
  const token =
    sessionStorage.getItem('devContactsToken') ||
    localStorage.getItem('devContactsToken')
  const response = await api.patch<UpdateUserProfileResponse>(
    '/user',
    {
      nome,
      email,
      senha,
      foto,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data.data
}
