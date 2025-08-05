// components/Admin/Card.tsx
import React from 'react'

interface CardProps {
  title: string
  value: number | string
  icon: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  className?: string
}

export const Card = ({ 
  title, 
  value, 
  icon, 
  trend = 'neutral', 
  trendValue = '2.5% from last week',
  className = ''
}: CardProps) => {
  const trendColors = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-gray-500',
  }

  const trendIcons = {
    up: (
      <svg
        className="w-4 h-4 mr-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      </svg>
    ),
    down: (
      <svg
        className="w-4 h-4 mr-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    ),
    neutral: null
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className="text-4xl opacity-80">{icon}</div>
      </div>
      
      {trend !== 'neutral' && trendValue && (
        <div className={`mt-4 flex items-center text-sm font-medium ${trendColors[trend]}`}>
          {trendIcons[trend]}
          <span>{trendValue}</span>
        </div>
      )}
    </div>
  )
}