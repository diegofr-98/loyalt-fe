import { useContext } from 'react'
import { BusinessContext } from '../providers/BusinessProvider'

export const useBusiness = () => {
  return useContext(BusinessContext)
}