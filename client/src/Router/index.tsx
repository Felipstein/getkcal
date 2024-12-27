import { BrowserRouter } from 'react-router-dom'
import { AnimatedRoutes } from '../view/components/AnimatedRoutes'

export function Router() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
