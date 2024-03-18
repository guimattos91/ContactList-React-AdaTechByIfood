import { useTheme } from '@/components/theme/ThemeProvider'
import { Button } from '@/components/ui/button'
import { SparklesCore } from '@/components/ui/sparkles'
import { BsJournalCode } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Hero = () => {
  const { theme } = useTheme()

  const particleColor = theme === 'dark' ? '#ddd6fe' : '#6d28d9'

  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-background">
        <div className="fixed top-6 flex w-9/12 items-center justify-between">
          <div>
            <BsJournalCode className="h-8 w-8" />
          </div>
          <div>
            <Button variant={'outline'}>
              <Link to="/sign-in">Entrar</Link>
            </Button>
            <Button className="ml-4">
              <Link to="/sign-up">Cadastrar</Link>
            </Button>
          </div>
        </div>

        <h1 className="relative z-20 text-center text-3xl font-bold text-foreground md:text-7xl lg:text-9xl">
          DevContacts
        </h1>
        <div className="relative h-40 w-[40rem]">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
          <div className="absolute inset-x-20 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
          <div className="absolute inset-x-60 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-violet-500 to-transparent blur-sm" />
          <div className="absolute inset-x-60 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

          {/* Core component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="h-full w-full"
            particleColor={particleColor}
          />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 h-full w-full bg-background [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>
    </>
  )
}

export { Hero }
