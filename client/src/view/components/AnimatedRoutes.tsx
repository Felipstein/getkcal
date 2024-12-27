import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { HomeLayout } from '../layouts/HomeLauout'
import { MealsPage } from '../pages/MealsPage'
import { WaterPage } from '../pages/WaterPage'
import { useEffect } from 'react'

export function AnimatedRoutes() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (pathname === '/') {
      navigate('/meals')
    }
  }, [navigate, pathname])

  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/meals" element={<MealsPage />} />
        <Route path="/water" element={<WaterPage />} />
      </Route>
    </Routes>
  )
}
