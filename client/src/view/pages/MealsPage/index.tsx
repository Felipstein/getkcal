import { UtensilsCrossedIcon } from 'lucide-react'
import { meals } from '../../../mocks/meals'
import { Header } from './components/Header'

export function MealsPage() {
  return (
    <div className="mt-6 h-full">
      <Header />

      <div className="scrollbar-none mt-2 grid h-full max-h-[60vh] w-full touch-pan-y grid-cols-1 gap-3 overflow-auto">
        {meals.map(({ hour, id, protein, title }) => (
          <div
            className="flex items-center justify-between bg-gray-900 px-3 py-2 text-white"
            key={id}
          >
            <div>
              <h1 className="text-base font-medium">{title}</h1>

              <div className="mt-2 flex items-center">
                <div className="w-fit rounded-full bg-red-500 p-1">
                  <UtensilsCrossedIcon size={18} />
                </div>

                <span className="ml-2 text-xs text-gray-400">
                  +{protein}g Proteína
                </span>
              </div>
            </div>

            <span className="text-sm">
              {hour.toString().replace('.', ':')}
              {hour > 12.59 ? 'pm' : 'am'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
