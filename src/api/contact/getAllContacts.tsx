import { api } from '@/lib/axios'
import { getToken } from '@/hooks/useAuthToken'

export interface Telefone {
    tipo?: 'casa' | 'trabalho' | 'celular';
    numero?: string;
  }

export interface Endereco {
    logradouro?: string;
    cidade?: string;
    estado?: string;
    cep?: string;
    pais?: string;
  }

export interface Contato {
  id: string
  nome?: string
  idUsuario:string
  stack?:string
  email?: string
  notas?:string
  foto?: string
  telefones?: Telefone[];
  endereco?: Endereco;
}
  
export interface GetContactResponse {
  data: Contato [],
  status: number
}

export async function getAllContacts() {
  const token = getToken()
  const response = await api.get<GetContactResponse>('/contact', {
    headers: {
      Authorization: `${token}`,
    },
  })
  return response.data.data
}
