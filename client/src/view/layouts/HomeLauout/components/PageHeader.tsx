import { ProgressBar } from '../../../components/ProgressBar'
import cn from '../../../../utils/cn'
import { Tab } from '../../../components/Tab'
import { useContext, useMemo } from 'react'
import { ResourcesContext } from '../../../../contexts/resourcesContext'

interface PageHeaderProps {
  tab: 'meals' | 'water'
}

export function PageHeader({ tab }: PageHeaderProps) {
  const { water, proteins, waterGoal, proteinGoal } =
    useContext(ResourcesContext)

  const isInTabMeals = useMemo(() => tab === 'meals', [tab])

  const progressBarPorcentage = isInTabMeals
    ? (proteins / proteinGoal) * 100
    : (water / waterGoal) * 100

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
              {isInTabMeals ? `${proteins}g` : `${water}ml`}
            </span>
            /
            <span className="text-gray-400">
              {isInTabMeals ? `${proteinGoal}g` : `${waterGoal}ml`}
            </span>
          </p>
        </div>

        <ProgressBar
          color={isInTabMeals ? '#99F6E4' : '#93C5FD'}
          porcentage={progressBarPorcentage || 0}
        />
      </div>
    </div>
  )
}
