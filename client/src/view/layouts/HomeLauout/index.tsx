import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import { PageHeader } from './components/PageHeader'

export function HomeLayout() {
  return (
    <div>
      <Header />

      <div className="mt-8 px-4">
        <PageHeader />

        <div className="mt-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
