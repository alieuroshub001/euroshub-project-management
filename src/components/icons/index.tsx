import { LucideProps } from 'lucide-react'
import dynamic from 'next/dynamic'

export const Icons = {
  spinner: dynamic(() =>
    import('lucide-react').then((mod) => mod.Loader2)
  ),
  // Add other icons as needed
}