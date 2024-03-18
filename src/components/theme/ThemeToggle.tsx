import { LuMoon, LuSun } from 'react-icons/lu'
import { useTheme } from './ThemeProvider'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  return (
    <Button variant={'outline'} size={'icon'} onClick={toggleTheme}>
      {theme === 'dark' ? (
        <LuMoon className="h-6 w-6 " />
      ) : (
        <LuSun className="h-6 w-6 " />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
