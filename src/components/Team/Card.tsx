import React from 'react'

interface TeamCardProps {
  title: string
  value: number | string
  icon: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'indigo'
  className?: string
  onClick?: () => void
}

export const TeamCard = ({ 
  title, 
  value, 
  icon, 
  trend = 'neutral', 
  trendValue,
  color = 'blue',
  className = '',
  onClick
}: TeamCardProps) => {
  const colorClasses = {
    blue: 'border-blue-200 bg-blue-50',
    green: 'border-green-200 bg-green-50',
    yellow: 'border-yellow-200 bg-yellow-50',
    red: 'border-red-200 bg-red-50',
    purple: 'border-purple-200 bg-purple-50',
    indigo: 'border-indigo-200 bg-indigo-50'
  }

  const trendColors = {
    up: 'text-green-600 bg-green-100',
    down: 'text-red-600 bg-red-100',
    neutral: 'text-gray-600 bg-gray-100',
  }

  const trendIcons = {
    up: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ),
    down: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    ),
    neutral: null
  }

  return (
    <div 
      className={`bg-white rounded-xl shadow-sm border-2 ${colorClasses[color]} p-6 hover:shadow-md transition-all duration-200 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
          
          {trend !== 'neutral' && trendValue && (
            <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${trendColors[trend]}`}>
              {trendIcons[trend]}
              <span className="ml-1">{trendValue}</span>
            </div>
          )}
        </div>
        
        <div className="text-4xl opacity-70 ml-4">{icon}</div>
      </div>
    </div>
  )
}