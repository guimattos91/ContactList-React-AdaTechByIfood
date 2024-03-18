import { api } from '@/lib/axios'

export interface SignUpBody {
  nome: string
  email: string
  senha: string
  foto?: string
}

export async function signUp({ nome, email, senha }: SignUpBody) {
  await api.post(
    '/user',
    { nome, email, senha },
    { headers: { 'Content-Type': 'application/json' } },
  )
}
