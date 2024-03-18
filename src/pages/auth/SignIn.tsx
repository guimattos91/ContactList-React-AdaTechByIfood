import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { signIn } from '@/api/auth/signIn'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { ImSpinner2 } from 'react-icons/im'
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md'
import { toast } from 'sonner'
import img from '@/assets/sign_in.svg'
import { BsJournalCode } from 'react-icons/bs'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

const signInFormSchema = z.object({
  email: z.string().email(),
  senha: z.string().min(6),
})

type SignInForm = z.infer<typeof signInFormSchema>

const SignIn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const navigate = useNavigate()
  const [rememberMe, setRememberMe] = useState<boolean>(false)
  const [searchParams] = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: {
      email: searchParams.get('email') ?? '',
      senha: '',
    },
  })

  const { mutateAsync: authenticate } = useMutation({ mutationFn: signIn })

  async function handleSignIn(data: SignInForm) {
    if (!data.email || !data.senha) {
      return
    }
    try {
      setIsLoading(true)
      const response = await authenticate({
        email: data.email,
        senha: data.senha,
      })
      const token = response
      if (rememberMe) {
        localStorage.setItem('devContactsToken', token)
      } else {
        sessionStorage.setItem('devContactsToken', token)
      }
      toast.success('Login realizado com sucesso!')
      setIsLoading(false)
      navigate('/contacts')
    } catch (error) {
      setIsLoading(false)
      toast.error('Credenciais inválidas.')
    }
  }

  return (
    <>
      <div className="grid h-screen grid-rows-[auto,1fr] overflow-hidden antialiased md:grid-cols-2">
        <div className="auto-rows-max md:col-span-2">
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-2">
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
              Acessar conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Transforme sua rotina com DevContacts!
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
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
                  Seu e-mail
                </label>
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
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      value=""
                      className="h-3 w-3 rounded border text-primary accent-primary"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="font-light text-foreground"
                    >
                      Lembre-me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  Esqueceu sua senha?
                </a>
              </div>
            </div>
            <div className="space-y-2">
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading && isSubmitting}
              >
                {isLoading ? (
                  <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Entrar
              </Button>
            </div>
          </form>
          <div className="space-y-2">
            <p className="text-sm font-light text-foreground">
              Não possui conta?{' '}
              <Link
                to="/sign-up"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Clique aqui{' '}
              </Link>{' '}
              para se cadastrar
            </p>
          </div>
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
          <Button variant={'outline'} type="button" disabled={isLoading}>
            {isLoading ? (
              <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <FaGithub className="mr-2 h-4 w-4" />
            )}{' '}
            Entrar com GitHub
          </Button>
        </div>
      </div>
    </>
  )
}

export { SignIn }
