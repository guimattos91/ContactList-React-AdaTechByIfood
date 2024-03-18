import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { signUp } from '@/api/auth/signUp'

import { Button } from '@/components/ui/button'
import { ImSpinner2 } from 'react-icons/im'
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md'
import img from '@/assets/sign_up.svg'
import { BsJournalCode } from 'react-icons/bs'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'

const signUpFormSchema = z.object({
  nome: z.string().min(3, 'O nome deve conter pelo menos 3 caracteres'),
  email: z.string().email('O email deve ser um email valido'),
  senha: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

type SignUpForm = z.infer<typeof signUpFormSchema>

const SignUp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema),
  })

  const { mutateAsync: signUpFn } = useMutation({
    mutationFn: signUp,
  })

  async function handleSignUp(data: SignUpForm) {
    try {
      setIsLoading(true)
      await signUpFn({
        nome: data.nome,
        email: data.email,
        senha: data.senha,
      })
      setIsLoading(false)
      toast.success('Conta criada com sucesso!', {
        action: {
          label: 'Entrar',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      })
    } catch (error) {
      setIsLoading(false)
      if (isAxiosError(error)) {
        const status = error.response?.status
        if (status === 409) {
          toast.error('O email fornecido já está em uso.')
        } else {
          toast.error('Erro ao criar conta. Tente novamente mais tarde!')
        }
      }
    }
  }
  return (
    <>
      <div className="grid h-screen grid-rows-[auto,1fr] overflow-hidden antialiased md:grid-cols-2">
        <div className="auto-rows-max md:col-span-2">
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
            <Link
              to="/"
              className="flex items-center gap-3 text-lg text-foreground"
            >
              <BsJournalCode className="h-5 w-5" />
              <span className="font-semibold">DevContacts</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
        <div className="hidden items-center justify-center md:flex">
          <img src={img} alt="" className="h-[600px] w-[600px]" />
        </div>
        <div className="mx-auto my-auto flex h-fit w-11/12 max-w-[600px] flex-col justify-center gap-6 rounded-xl border border-border px-4 py-12 shadow-lg shadow-border">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              DevContacts: sua agenda de contatos feita sob medida para
              desenvolvedores.
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
            <div className="space-y-2">
              <div className="relative z-0 ">
                <input
                  id="name"
                  type="text"
                  className="peer block h-9 w-full appearance-none border-0 border-b-2 border-input bg-transparent px-0 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-0"
                  placeholder=" "
                  {...register('nome')}
                />
                <label
                  htmlFor="name"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm font-light leading-none duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary"
                >
                  Seu nome
                </label>
                {errors.nome && (
                  <span className="mt-2 text-xs text-destructive">
                    {errors.nome.message}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative z-0 ">
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
                  Seu e-mail
                </label>
                {errors.email && (
                  <span className="mt-2 text-xs text-destructive">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative z-0 ">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="peer block h-9 w-full appearance-none border-0 border-b-2 border-input bg-transparent px-0 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-0"
                  placeholder=" "
                  autoComplete="new-password"
                  {...register('senha')}
                />
                <label
                  htmlFor="password"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm font-light leading-none duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary"
                >
                  Sua senha
                </label>
                <button
                  type="button"
                  className="absolute right-0 top-3 flex items-center pr-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <MdOutlineVisibilityOff />
                  ) : (
                    <MdOutlineVisibility />
                  )}
                </button>
                {errors.senha && (
                  <span className="mt-2 text-xs text-destructive">
                    {errors.senha.message}
                  </span>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading && isSubmitting}
            >
              {isLoading ? (
                <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Finalizar Cadastro
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos{' '}
              <a
                href=""
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                termos de serviço
              </a>{' '}
              e{' '}
              <a
                href=""
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                políticas de privacidade.
              </a>
            </p>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                OU
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-center text-sm font-light text-foreground">
              Já tem uma conta?{' '}
              <Link
                to="/sign-in"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Clique aqui{' '}
              </Link>{' '}
              para entrar
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export { SignUp }
