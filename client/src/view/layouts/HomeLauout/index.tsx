import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '../../components/Header'
import { PageHeader } from './components/PageHeader'
import { ResourcesProvider } from '../../../contexts/resourcesContext'
import { PageFooter } from './components/PageFooter'

export function HomeLayout() {
  const { pathname } = useLocation()

  const tab = pathname.slice(1) as 'meals' | 'water'
  return (
    <div className="relative h-full">
      <Header />

      <ResourcesProvider>
        <div className="m-auto mt-8 w-full max-w-[600px] px-4 sm:px-0">
          <PageHeader tab={tab} />

          <div className="mt-8">
            <Outlet />
          </div>

          <PageFooter tab={tab} />
        </div>
      </ResourcesProvider>
    </div>
  )
}
