import { createContext, ReactNode, useEffect, useState } from 'react'

import { meals as mockMeals } from '../mocks/meals'

import { Meal } from '../@Types'

interface ResourcesProviderProps {
  children: ReactNode
}

interface ResourcesContextValues {
  water: number
  proteins: number
  meals: Meal[]
  proteinGoal: number
  waterGoal: number
}

export const ResourcesContext = createContext({} as ResourcesContextValues)

export function ResourcesProvider({ children }: ResourcesProviderProps) {
  const [meals, setMeals] = useState<Meal[]>([])
  const [water, setWater] = useState(0)
  const [proteins, setProteins] = useState(0)
  const [proteinGoal, setProteinGoal] = useState(0)
  const [waterGoal, setWaterGoal] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setMeals(mockMeals)
      setProteins(mockMeals.reduce((acc, meal) => acc + meal.protein, 0))
      setWater(2000)
      setProteinGoal(200)
      setWaterGoal(3500)
    })
  }, [])
  return (
    <ResourcesContext.Provider
      value={{ meals, water, proteins, proteinGoal, waterGoal }}
    >
      {children}
    </ResourcesContext.Provider>
  )
}
