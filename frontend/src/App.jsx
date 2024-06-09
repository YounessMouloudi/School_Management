import { useState } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { StudentContext } from './context/StudentContext'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from './components/ui/sonner'
// import { Toaster } from './components/ui/toaster'


function App() {

  const [count, setCount] = useState(0)

  return (
      <>
        <StudentContext>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <RouterProvider router={router}/>
          </ThemeProvider>
          <Toaster/>
        </StudentContext>
      </>
  )

}
export default App
