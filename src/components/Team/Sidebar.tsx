'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  name: string
  href: string
  icon: string
  badge?: number
  subItems?: {
    name: string
    href: string
    icon: string
  }[]
}

const navItems: NavItem[] = [
  { 
    name: 'Dashboard', 
    href: '/team', 
    icon: '🏠'
  },
  { 
    name: 'My Tasks', 
    href: '/team/tasks', 
    icon: '✅',
    badge: 5,
    subItems: [
      { name: 'Assigned', href: '/team/tasks', icon: '📋' },
      { name: 'In Progress', href: '/team/tasks/in-progress', icon: '🔄' },
      { name: 'Completed', href: '/team/tasks/completed', icon: '✔️' }
    ]
  },
  { 
    name: 'Projects', 
    href: '/team/projects', 
    icon: '📂',
    subItems: [
      { name: 'My Projects', href: '/team/projects', icon: '📋' },
      { name: 'Team Projects', href: '/team/projects/team', icon: '👥' }
    ]
  },
  { 
    name: 'Time Tracking', 
    href: '/team/time', 
    icon: '⏱️',
    subItems: [
      { name: 'Daily Log', href: '/team/time', icon: '📅' },
      { name: 'Timesheets', href: '/team/time/sheets', icon: '📊' }
    ]
  },
  { 
    name: 'Leave', 
    href: '/team/leave', 
    icon: '📅',
    subItems: [
      { name: 'Request Leave', href: '/team/leave', icon: '➕' },
      { name: 'My Leaves', href: '/team/leave/history', icon: '📋' },
      { name: 'Balance', href: '/team/leave/balance', icon: '🧮' }
    ]
  },
  { 
    name: 'Documents', 
    href: '/team/documents', 
    icon: '📄'
  },
  { 
    name: 'Settings', 
    href: '/team/settings', 
    icon: '⚙️'
  }
]

interface SidebarProps {
  className?: string
}

export const Sidebar = ({ className = '' }: SidebarProps) => {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
    if (!isCollapsed) {
      setExpandedItems([])
    }
  }

  const toggleSubMenu = (itemName: string) => {
    if (isCollapsed) return
    
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(item => item !== itemName)
        : [...prev, itemName]
    )
  }

  const isActive = (href: string) => {
    return pathname === href || (href !== '/team' && pathname.startsWith(href))
  }

  const isSubItemActive = (item: NavItem) => {
    return item.subItems?.some(subItem => pathname === subItem.href) || false
  }

  return (
    <div className={`h-screen bg-gray-900 text-white transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} ${className}`}>
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold text-white">Team Portal</h1>
              <p className="text-xs text-gray-400">Collaboration Hub</p>
            </div>
          )}
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg 
              className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>
      
      <nav className="mt-6 px-3">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const hasSubItems = item.subItems && item.subItems.length > 0
            const isExpanded = expandedItems.includes(item.name)
            const itemIsActive = isActive(item.href) || isSubItemActive(item)
            
            return (
              <li key={item.name}>
                <div className="relative">
                  <Link
                    href={item.href}
                    onClick={() => hasSubItems && toggleSubMenu(item.name)}
                    className={`flex items-center px-3 py-3 rounded-lg transition-all duration-200 group ${
                      itemIsActive 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'hover:bg-gray-800 text-gray-300 hover:text-white'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    
                    {!isCollapsed && (
                      <>
                        <span className="ml-3 font-medium">{item.name}</span>
                        
                        {item.badge && (
                          <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                            {item.badge}
                          </span>
                        )}
                        
                        {hasSubItems && (
                          <svg 
                            className={`ml-auto w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                      </>
                    )}
                  </Link>
                  
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                      {item.name}
                      {item.badge && (
                        <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                
                {hasSubItems && isExpanded && !isCollapsed && (
                  <ul className="mt-2 ml-6 space-y-1">
                    {item.subItems?.map((subItem) => (
                      <li key={subItem.name}>
                        <Link
                          href={subItem.href}
                          className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                            pathname === subItem.href
                              ? 'bg-blue-500 text-white'
                              : 'text-gray-400 hover:text-white hover:bg-gray-800'
                          }`}
                        >
                          <span className="text-base mr-3">{subItem.icon}</span>
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
      
      {!isCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
              TM
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Team Member</p>
              <p className="text-xs text-gray-400">Developer</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}