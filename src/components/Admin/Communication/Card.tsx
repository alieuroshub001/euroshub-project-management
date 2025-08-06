"use client"
import React from 'react'
import { Hash, Users, MessageSquare, ChevronDown, ChevronUp, MoreVertical } from 'lucide-react'

interface CardProps {
  channel: {
    id: string
    name: string
    description: string
    type: 'public' | 'private' | 'direct'
    unreadCount: number
    isMuted: boolean
    lastMessage?: {
      content: string
      timestamp: string
      user: string
    }
    members: number
  }
  isActive?: boolean
  onClick?: () => void
  onMuteToggle?: () => void
}

export const Card: React.FC<CardProps> = ({ 
  channel, 
  isActive = false, 
  onClick, 
  onMuteToggle 
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false)

  return (
    <div 
      className={`p-4 border rounded-lg mb-3 cursor-pointer transition-all ${
        isActive 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-200 hover:border-gray-300 bg-white'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <div className="p-2 bg-gray-100 rounded-lg mr-3">
            {channel.type === 'direct' ? (
              <Users className="w-5 h-5 text-gray-600" />
            ) : (
              <Hash className="w-5 h-5 text-gray-600" />
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center">
              <h3 className="font-medium text-gray-900 mr-2">{channel.name}</h3>
              {channel.isMuted && (
                <span className="text-xs text-gray-500">(muted)</span>
              )}
              {channel.unreadCount > 0 && (
                <span className="ml-2 bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
                  {channel.unreadCount} unread
                </span>
              )}
            </div>
            
            <p className="text-sm text-gray-600 mt-1">
              {channel.type === 'direct' 
                ? `Direct message` 
                : channel.description}
            </p>
            
            {isExpanded && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span className="mr-3">{channel.members} members</span>
                  <span>Last active: {channel.lastMessage?.timestamp || 'unknown'}</span>
                </div>
                
                {channel.lastMessage && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-700">
                      {channel.lastMessage.user}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {channel.lastMessage.content}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={(e) => {
              e.stopPropagation()
              onMuteToggle?.()
            }}
            className="p-1 text-gray-400 hover:text-gray-600"
            aria-label={channel.isMuted ? 'Unmute channel' : 'Mute channel'}
          >
            {channel.isMuted ? (
              <MessageSquare className="w-4 h-4" />
            ) : (
              <MessageSquare className="w-4 h-4" />
            )}
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation()
              setIsExpanded(!isExpanded)
            }}
            className="p-1 text-gray-400 hover:text-gray-600"
            aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}