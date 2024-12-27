import { Logo } from "./Logo";
import { ChevronDown } from 'lucide-react'

export function Header() {
  return (
    <header className="flex justify-between px-4 py-3">
      <Logo />

      <div className="flex items-center gap-0.5">
        <hr className="h-[1px] w-[18px] rotate-90 opacity-60" />

        <div className="flex items-center gap-1">
          <ChevronDown size={20} className="text-gray-300" />
          <div className="w-7 h-7 bg-gray-700 rounded-full" />
        </div>
      </div>
    </header>
  )
}
