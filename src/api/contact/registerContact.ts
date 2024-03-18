import { api } from '@/lib/axios'
import { getToken } from '@/hooks/useAuthToken'

interface Telefone {
  tipo: 'casa' | 'trabalho' | 'celular'
  numero: string
}
interface Endereco {
  logradouro: string
  cidade: string
  estado: string
  cep: string
  pais: string
}

interface Data {
  nome: string
  stack?: string
  telefones?: Telefone[]
  email?: string
  endereco?: Endereco
  notas?: string
  foto?: null | string | ArrayBuffer
}

export async function registerContact(data: Data): Promise<void> {
  const token = getToken()
  const response = await api
    .post('/contact', data, { headers: { Authorization: `${token}` } })
    .then((response) => {
      return response?.data
    })
    .catch((error) => {
      return error?.response?.data
    })
  return response
}
