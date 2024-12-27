import { PlusIcon } from 'lucide-react'
import { useMemo } from 'react'

interface PageFooterProps {
  tab: 'meals' | 'water'
}

export function PageFooter({ tab }: PageFooterProps) {
  const isInTabMeals = useMemo(() => tab === 'meals', [tab])

  const buttonLabel = useMemo(
    () => (isInTabMeals ? 'Nova Refeição' : 'Adicionar consumo'),
    [isInTabMeals],
  )
  return (
    <footer className="absolute bottom-6 w-full max-w-[600px] px-4 sm:px-0">
      <button className="p flex w-full items-center justify-center gap-1 rounded-md border border-dashed border-gray-700 py-5 text-sm font-medium text-gray-400 transition-colors hover:border-white hover:text-white">
        <PlusIcon size={18} />

        {buttonLabel}
      </button>
    </footer>
  )
}
