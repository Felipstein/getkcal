import * as Tabs from '@radix-ui/react-tabs'
import { Link } from 'react-router-dom'

export function Tab() {
  return (
    <Tabs.Root className="flex w-full flex-col" defaultValue="tab1">
      <Tabs.List className="flex *:w-full *:rounded-md *:py-1.5 *:text-center *:font-medium">
        <Tabs.Trigger
          className="data-[state=active]:bg-gray-700 data-[state=inactive]:bg-transparent data-[state=active]:text-white data-[state=inactive]:text-gray-300"
          value="tab1"
          asChild
        >
          <Link to="meals">Refeições</Link>
        </Tabs.Trigger>
        <Tabs.Trigger
          className="data-[state=active]:bg-gray-700 data-[state=inactive]:bg-transparent data-[state=active]:text-white data-[state=inactive]:text-gray-300"
          value="tab2"
          asChild
        >
          <Link to="water">Água</Link>
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  )
}
