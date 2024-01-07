import { useState } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { StudentContext } from './context/StudentContext'
import { ThemeProvider } from './components/theme-provider'

function App() {

  const [count, setCount] = useState(0)

  return (
      <>
        <StudentContext>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <RouterProvider router={router}/>
          </ThemeProvider>
        </StudentContext>
      </>
  )

}
export default App
