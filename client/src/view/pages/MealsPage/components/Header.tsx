import { PlusIcon } from 'lucide-react'

export function Header() {
  return (
    <header className="flex items-center justify-between">
      <span className="text-sm text-gray-400">Refeições diária</span>

      <button>
        <PlusIcon size={24} className="text-gray-300" />
      </button>
    </header>
  )
}
