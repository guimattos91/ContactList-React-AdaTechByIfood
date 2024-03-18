import { api } from '@/lib/axios'

export interface SignInBody {
  email: string
  senha: string
}

export interface SignInResponse {
  data: {
    id: string
    email: string
    nome: string
    foto: string
    token: string
  }
}

export async function signIn({ email, senha }: SignInBody): Promise<string> {
  const response = await api.post<SignInResponse>(
    '/auth',
    { email, senha },
    { headers: { 'Content-Type': 'application/json' } },
  )
  const token = response.data.data.token

  return token
}
