import { useLocation } from 'react-router-dom'
import { ProgressBar } from '../../../components/ProgressBar'
import cn from '../../../../utils/cn'
import { Tab } from '../../../components/Tab'

export function PageHeader() {
  const { pathname } = useLocation()

  const isInTabMeals = pathname === '/meals'
  return (
    <div>
      <Tab />

      <div className="mt-6 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">
            {isInTabMeals ? 'Proteínas ingeridas' : 'Água consumida'}
          </span>

          <p className="flex gap-1 text-base text-gray-500">
            <span
              className={cn(isInTabMeals ? 'text-teal-200' : 'text-blue-300')}
            >
              200g
            </span>
            /<span className="text-gray-400">200g</span>
          </p>
        </div>

        <ProgressBar
          color={isInTabMeals ? '#99F6E4' : '#93C5FD'}
          porcentage={100}
        />
      </div>
    </div>
  )
}
