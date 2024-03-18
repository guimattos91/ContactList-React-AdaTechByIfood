import { api } from '@/lib/axios'
import { getToken } from '@/hooks/useAuthToken'

export interface GetUserResponse {
  data: {
    id: string
    email: string
    nome: string
    foto: string
  }
  status: number
}

export async function getUser() {
  const token = getToken()
  const response = await api.get<GetUserResponse>('/user', {
    headers: {
      Authorization: `${token}`,
    },
  })
  return response.data.data
}
