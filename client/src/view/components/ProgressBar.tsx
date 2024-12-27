import { CSSProperties } from 'react'
import * as Progress from '@radix-ui/react-progress'

interface ProgressBarProps {
  color?: string
  porcentage: number
}

export function ProgressBar({ color, porcentage }: ProgressBarProps) {
  return (
    <Progress.Root
      className="bg-blackA6 relative h-3.5 w-full overflow-hidden rounded-full"
      style={{
        transform: 'translateZ(0)',
      }}
      value={porcentage}
    >
      <Progress.Indicator
        className="ease-[cubic-bezier(0.65, 0, 0.35, 1)] size-full bg-gradient-to-r from-white to-[--gradient-color] transition-transform duration-[660ms]"
        style={
          {
            transform: `translateX(-${100 - porcentage}%)`,
            '--gradient-color': color || '#fff',
          } as CSSProperties
        }
      />
    </Progress.Root>
  )
}
