import { Moon, Sun } from "lucide-react"
import { Button } from "./ui/button"
import { useTheme } from "./theme-provider"

export function ModeToggle() {
  const { setTheme,theme } = useTheme()

  return (
        <Button size="icon" onClick={setTheme} title={theme === 'light' ? 'light':'dark'}>
            { theme === 'light' ? 
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
                :
                <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
            }
          <span className="sr-only">Toggle theme</span>
        </Button>
  )
}
