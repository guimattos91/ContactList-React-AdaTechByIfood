import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { BsPersonAdd } from 'react-icons/bs'
import { useState } from 'react'
import { registerContact } from '@/api/contact/registerContact'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

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
  foto?: string
}

interface ModalProps {}

const ModalRegister: React.FC<ModalProps> = () => {
  const { register, handleSubmit, reset } = useForm<Data>()
  const [telefones, setTelefones] = useState<Telefone[]>([])

  const onSubmit = (formData: Data) => {
    const data: Data = { ...formData, telefones }
    registerContact(data)
    setTelefones([])
    reset()
  }

  const addPhone = (value: string) => {
    if (value.trim() !== '') {
      const existingPhoneIndex = telefones.findIndex(
        (phone) => phone.tipo === 'celular',
      )
      if (existingPhoneIndex !== -1) {
        const updatedTelefones = [...telefones]
        updatedTelefones[existingPhoneIndex] = {
          tipo: 'celular',
          numero: value.trim(),
        }
        setTelefones(updatedTelefones)
      } else {
        setTelefones([...telefones, { tipo: 'celular', numero: value.trim() }])
      }
    }
  }
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-8 right-8 cursor-pointer text-4xl text-foreground hover:text-primary sm:text-5xl"
            variant="link"
          >
            <BsPersonAdd />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-11/12 sm:max-w-[500px]">
          <form
            className="rounded-md p-2 sm:p-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <DialogHeader>
              <DialogTitle className="my-4">Adicionar Contato</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="relative z-0">
                <input
                  id="nome"
                  type="text"
                  className="peer block h-9 w-full appearance-none border-0 border-b-2 border-input bg-transparent px-0 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-0"
                  placeholder=" "
                  {...register('nome')}
                />
                <label
                  htmlFor="nome"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm font-light leading-none duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary"
                >
                  Nome
                </label>
              </div>
              <div className="relative z-0">
                <input
                  type="tel"
                  id="telefones"
                  placeholder=" "
                  {...register('telefones')}
                  onChange={(e) => addPhone(e.target.value)}
                  className="peer block h-9 w-full appearance-none border-0 border-b-2 border-input bg-transparent px-0 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-0"
                />
                <label
                  htmlFor="telefones"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm font-light leading-none duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary"
                >
                  Telefones
                </label>
              </div>
              <div className="relative z-0">
                <input
                  id="email"
                  type="email"
                  className="peer block h-9 w-full appearance-none border-0 border-b-2 border-input bg-transparent px-0 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-0"
                  placeholder=" "
                  {...register('email')}
                />
                <label
                  htmlFor="email"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm font-light leading-none duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary"
                >
                  E-mail
                </label>
              </div>
              <div className="relative z-0">
                <input
                  id="stack"
                  type="stack"
                  className="peer block h-9 w-full appearance-none border-0 border-b-2 border-input bg-transparent px-0 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-0"
                  placeholder=" "
                  {...register('stack')}
                />
                <label
                  htmlFor="stack"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm font-light leading-none duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary"
                >
                  Stack
                </label>
              </div>
              <div className="relative z-0 mx-auto">
                <Button variant="outline" className="cursor-pointer text-sm">
                  <label htmlFor="foto" className="cursor-pointer">
                    Adicionar foto
                  </label>
                  <input
                    id="foto"
                    type="file"
                    className="hidden"
                    {...register('foto')}
                  />
                </Button>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">Adicionar contato</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export { ModalRegister }
