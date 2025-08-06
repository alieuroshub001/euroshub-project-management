"use client"
import React, { useState, useEffect } from 'react'
import { Search, MessageSquare, Users, Hash, Plus, MoreVertical, Send, Paperclip, Smile, ChevronDown, ChevronUp, Trash2, Edit2, Bell, BellOff, Volume2, VolumeX } from 'lucide-react'
import { Card } from '@/components/Admin/Communication/Card'

// Types
interface Channel {
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

interface Message {
  id: string
  channelId: string
  user: {
    id: string
    name: string
    avatar: string
    role: string
  }
  content: string
  timestamp: string
  isEdited: boolean
  reactions: {
    emoji: string
    count: number
    users: string[]
  }[]
  attachments?: {
    url: string
    type: 'image' | 'document' | 'video'
    name: string
  }[]
  thread?: {
    count: number
    lastMessage: string
  }
}

interface User {
  id: string
  name: string
  avatar: string
  role: string
  status: 'online' | 'offline' | 'away'
  lastActive?: string
}

// Mock Data
const mockChannels: Channel[] = [
  {
    id: '1',
    name: 'general',
    description: 'Company-wide announcements and discussions',
    type: 'public',
    unreadCount: 3,
    isMuted: false,
    lastMessage: {
      content: 'Has everyone reviewed the new project requirements?',
      timestamp: '10:30 AM',
      user: 'Sarah Johnson'
    },
    members: 24
  },
  {
    id: '2',
    name: 'engineering',
    description: 'Engineering team discussions',
    type: 'public',
    unreadCount: 0,
    isMuted: true,
    lastMessage: {
      content: 'I just pushed the latest changes to the dev branch',
      timestamp: 'Yesterday',
      user: 'Mike Chen'
    },
    members: 8
  },
  {
    id: '3',
    name: 'design-team',
    description: 'Design team collaboration',
    type: 'private',
    unreadCount: 5,
    isMuted: false,
    lastMessage: {
      content: 'Here are the updated mockups for the homepage',
      timestamp: '2 hours ago',
      user: 'Emily Davis'
    },
    members: 5
  },
  {
    id: '4',
    name: 'john-smith',
    description: 'Direct message with John Smith',
    type: 'direct',
    unreadCount: 0,
    isMuted: false,
    lastMessage: {
      content: 'Can we meet tomorrow to discuss the project timeline?',
      timestamp: '5 minutes ago',
      user: 'John Smith'
    },
    members: 2
  }
]

const mockMessages: Message[] = [
  {
    id: '1',
    channelId: '1',
    user: {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=10b981&color=fff',
      role: 'manager'
    },
    content: 'Welcome everyone to our new communication platform! This will be our main channel for company-wide announcements.',
    timestamp: '9:00 AM',
    isEdited: false,
    reactions: [
      { emoji: '👍', count: 5, users: ['1', '2', '3', '4', '5'] },
      { emoji: '🎉', count: 3, users: ['2', '3', '6'] }
    ]
  },
  {
    id: '2',
    channelId: '1',
    user: {
      id: '2',
      name: 'Mike Chen',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Chen&background=f59e0b&color=fff',
      role: 'developer'
    },
    content: 'Thanks for setting this up Sarah! Looking forward to more organized communication.',
    timestamp: '9:15 AM',
    isEdited: false,
    reactions: []
  },
  {
    id: '3',
    channelId: '1',
    user: {
      id: '3',
      name: 'Emily Davis',
      avatar: 'https://ui-avatars.com/api/?name=Emily+Davis&background=8b5cf6&color=fff',
      role: 'designer'
    },
    content: 'This is great! Much better than email threads.',
    timestamp: '9:20 AM',
    isEdited: true,
    reactions: [
      { emoji: '❤️', count: 2, users: ['1', '4'] }
    ]
  },
  {
    id: '4',
    channelId: '1',
    user: {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=10b981&color=fff',
      role: 'manager'
    },
    content: 'Has everyone reviewed the new project requirements?',
    timestamp: '10:30 AM',
    isEdited: false,
    reactions: [],
    attachments: [
      {
        url: '/project-requirements.pdf',
        type: 'document',
        name: 'Project Requirements v1.2.pdf'
      }
    ],
    thread: {
      count: 3,
      lastMessage: 'I have some questions about section 3'
    }
  }
]

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=10b981&color=fff',
    role: 'manager',
    status: 'online'
  },
  {
    id: '2',
    name: 'Mike Chen',
    avatar: 'https://ui-avatars.com/api/?name=Mike+Chen&background=f59e0b&color=fff',
    role: 'developer',
    status: 'online',
    lastActive: '2 minutes ago'
  },
  {
    id: '3',
    name: 'Emily Davis',
    avatar: 'https://ui-avatars.com/api/?name=Emily+Davis&background=8b5cf6&color=fff',
    role: 'designer',
    status: 'away',
    lastActive: '30 minutes ago'
  },
  {
    id: '4',
    name: 'John Smith',
    avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=3b82f6&color=fff',
    role: 'admin',
    status: 'offline',
    lastActive: '2 hours ago'
  }
]

export const MessagesModule = () => {
  const [channels, setChannels] = useState<Channel[]>(mockChannels)
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [activeChannel, setActiveChannel] = useState<Channel | null>(mockChannels[0])
  const [searchTerm, setSearchTerm] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [isAddChannelOpen, setIsAddChannelOpen] = useState(false)
  const [isManageMembersOpen, setIsManageMembersOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'channels' | 'direct'>('channels')
  const [filterType, setFilterType] = useState<'all' | 'public' | 'private' | 'direct'>('all')
  const [filterUnread, setFilterUnread] = useState(false)
  const [filterMuted, setFilterMuted] = useState(false)

  // Filter channels based on search and filters
  const filteredChannels = channels.filter(channel => {
    const matchesSearch = channel.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         channel.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || channel.type === filterType
    const matchesUnread = !filterUnread || channel.unreadCount > 0
    const matchesMuted = !filterMuted || channel.isMuted
    
    return matchesSearch && matchesType && matchesUnread && matchesMuted
  })

  // Filter direct messages
  const filteredDirectMessages = channels.filter(channel => {
    return channel.type === 'direct' && 
           channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  // Filter messages for active channel
  const channelMessages = activeChannel ? 
    messages.filter(msg => msg.channelId === activeChannel.id) : 
    []

  // Toggle channel mute status
  const toggleMuteChannel = (channelId: string) => {
    setChannels(channels.map(channel => 
      channel.id === channelId ? 
      { ...channel, isMuted: !channel.isMuted } : 
      channel
    ))
  }

  // Mark channel as read
  const markAsRead = (channelId: string) => {
    setChannels(channels.map(channel => 
      channel.id === channelId ? 
      { ...channel, unreadCount: 0 } : 
      channel
    ))
  }

  // Send new message
  const sendMessage = () => {
    if (!newMessage.trim() || !activeChannel) return
    
    const newMsg: Message = {
      id: Date.now().toString(),
      channelId: activeChannel.id,
      user: {
        id: '0', // Current user
        name: 'Admin User',
        avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=8b5cf6&color=fff',
        role: 'admin'
      },
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isEdited: false,
      reactions: []
    }
    
    setMessages([...messages, newMsg])
    setNewMessage('')
  }

  // Add reaction to message
  const addReaction = (messageId: string, emoji: string) => {
    setMessages(messages.map(msg => {
      if (msg.id !== messageId) return msg
      
      const existingReaction = msg.reactions.find(r => r.emoji === emoji)
      if (existingReaction) {
        return {
          ...msg,
          reactions: msg.reactions.map(r => 
            r.emoji === emoji ? 
            { ...r, count: r.count + 1, users: [...r.users, '0'] } : 
            r
          )
        }
      } else {
        return {
          ...msg,
          reactions: [...msg.reactions, { emoji, count: 1, users: ['0'] }]
        }
      }
    }))
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-gray-900">Communication</h2>
            <button 
              onClick={() => setIsAddChannelOpen(true)}
              className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
              title="Create new channel"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search channels or messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Tabs */}
          <div className="flex mt-4">
            <button
              onClick={() => setViewMode('channels')}
              className={`flex-1 py-2 text-sm font-medium ${viewMode === 'channels' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Channels
            </button>
            <button
              onClick={() => setViewMode('direct')}
              className={`flex-1 py-2 text-sm font-medium ${viewMode === 'direct' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Direct Messages
            </button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="p-3 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-2 mb-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded"
            >
              <option value="all">All types</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="direct">Direct</option>
            </select>
            
            <button
              onClick={() => setFilterUnread(!filterUnread)}
              className={`px-2 py-1 text-xs border rounded ${filterUnread ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-white text-gray-700 border-gray-300'}`}
            >
              Unread
            </button>
            
            <button
              onClick={() => setFilterMuted(!filterMuted)}
              className={`px-2 py-1 text-xs border rounded ${filterMuted ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-white text-gray-700 border-gray-300'}`}
            >
              Muted
            </button>
          </div>
        </div>
        
        {/* Channels List */}
        <div className="flex-1 overflow-y-auto">
          {viewMode === 'channels' ? (
            filteredChannels.map(channel => (
              <div 
                key={channel.id}
                onClick={() => {
                  setActiveChannel(channel)
                  markAsRead(channel.id)
                }}
                className={`flex items-center p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${activeChannel?.id === channel.id ? 'bg-blue-50' : ''}`}
              >
                <div className="mr-3">
                  {channel.type === 'direct' ? (
                    <Users className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Hash className="w-5 h-5 text-gray-500" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <p className="font-medium text-gray-900 truncate">{channel.name}</p>
                    {channel.isMuted && (
                      <VolumeX className="w-3 h-3 ml-1 text-gray-400" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate">
                    {channel.lastMessage ? 
                      `${channel.lastMessage.user}: ${channel.lastMessage.content}` : 
                      channel.description}
                  </p>
                </div>
                
                <div className="flex items-center ml-2">
                  {channel.unreadCount > 0 && (
                    <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center mr-2">
                      {channel.unreadCount}
                    </span>
                  )}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleMuteChannel(channel.id)
                    }}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    {channel.isMuted ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))
          ) : (
            filteredDirectMessages.map(channel => (
              <div 
                key={channel.id}
                onClick={() => {
                  setActiveChannel(channel)
                  markAsRead(channel.id)
                }}
                className={`flex items-center p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${activeChannel?.id === channel.id ? 'bg-blue-50' : ''}`}
              >
                <div className="relative mr-3">
                  <img 
                    src="https://ui-avatars.com/api/?name=John+Smith&background=3b82f6&color=fff" 
                    alt={channel.name} 
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{channel.name}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {channel.lastMessage?.content}
                  </p>
                </div>
                
                <div className="ml-2">
                  {channel.unreadCount > 0 && (
                    <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {channel.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
          
          {(viewMode === 'channels' && filteredChannels.length === 0) && (
            <div className="p-6 text-center text-gray-500">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p>No channels found</p>
              <button 
                onClick={() => setIsAddChannelOpen(true)}
                className="mt-2 text-blue-600 text-sm font-medium"
              >
                Create a new channel
              </button>
            </div>
          )}
          
          {(viewMode === 'direct' && filteredDirectMessages.length === 0) && (
            <div className="p-6 text-center text-gray-500">
              <Users className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p>No direct messages</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Main Content */}
      {activeChannel ? (
        <div className="flex-1 flex flex-col">
          {/* Channel Header */}
          <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
            <div className="flex items-center">
              {activeChannel.type === 'direct' ? (
                <>
                  <img 
                    src="https://ui-avatars.com/api/?name=John+Smith&background=3b82f6&color=fff" 
                    alt={activeChannel.name} 
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{activeChannel.name}</h3>
                    <p className="text-xs text-gray-500">Online</p>
                  </div>
                </>
              ) : (
                <>
                  <Hash className="w-5 h-5 text-gray-500 mr-3" />
                  <div>
                    <h3 className="font-bold text-gray-900">{activeChannel.name}</h3>
                    <p className="text-xs text-gray-500">{activeChannel.members} members</p>
                  </div>
                </>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setIsManageMembersOpen(true)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                title="Manage members"
              >
                <Users className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {channelMessages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <MessageSquare className="w-10 h-10 mx-auto mb-4 text-gray-300" />
                  <h4 className="text-lg font-medium mb-1">No messages yet</h4>
                  <p className="text-sm">Send a message to start the conversation</p>
                </div>
              </div>
            ) : (
              channelMessages.map((message, index) => (
                <div key={message.id} className="mb-6 group">
                  <div className="flex items-start">
                    <img 
                      src={message.user.avatar} 
                      alt={message.user.name} 
                      className="w-8 h-8 rounded-full mr-3 mt-1"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <p className="font-medium text-gray-900 mr-2">{message.user.name}</p>
                        <span className="text-xs text-gray-500">{message.timestamp}</span>
                        {message.isEdited && (
                          <span className="text-xs text-gray-400 ml-2">(edited)</span>
                        )}
                      </div>
                      
                      <p className="text-gray-800 mb-2">{message.content}</p>
                      
                      {/* Attachments */}
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mb-3">
                          {message.attachments.map((attachment, idx) => (
                            <div key={idx} className="p-3 border border-gray-200 rounded-lg bg-white inline-block max-w-xs mb-2">
                              <div className="flex items-center">
                                <div className="bg-gray-100 p-2 rounded mr-3">
                                  <Paperclip className="w-4 h-4 text-gray-500" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900 truncate">{attachment.name}</p>
                                  <p className="text-xs text-gray-500">{attachment.type}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Reactions */}
                      {message.reactions.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {message.reactions.map((reaction, idx) => (
                            <button
                              key={idx}
                              onClick={() => addReaction(message.id, reaction.emoji)}
                              className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full hover:bg-gray-200"
                            >
                              {reaction.emoji} {reaction.count}
                            </button>
                          ))}
                        </div>
                      )}
                      
                      {/* Thread */}
                      {message.thread && (
                        <button className="flex items-center text-xs text-gray-500 hover:text-gray-700">
                          <ChevronUp className="w-3 h-3 mr-1" />
                          {message.thread.count} replies (last: {message.thread.lastMessage})
                        </button>
                      )}
                    </div>
                    
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded mr-2">
                <Paperclip className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded mr-2">
                <Smile className="w-5 h-5" />
              </button>
              
              <input
                type="text"
                placeholder={`Message ${activeChannel.name}`}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="ml-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center p-6">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Select a channel</h3>
            <p className="text-gray-600 mb-4">Choose an existing channel or create a new one to start messaging</p>
            <button
              onClick={() => setIsAddChannelOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Channel
            </button>
          </div>
        </div>
      )}
      
      {/* Add Channel Modal */}
      {isAddChannelOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Create New Channel</h3>
                <button
                  onClick={() => setIsAddChannelOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Channel Name</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    #
                  </span>
                  <input
                    type="text"
                    className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. marketing-team"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="What's this channel about?"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Channel Type</label>
                <div className="grid grid-cols-3 gap-3">
                  <button className="p-3 border rounded-lg text-left hover:border-blue-500">
                    <div className="flex items-center">
                      <Hash className="w-5 h-5 text-gray-500 mr-2" />
                      <div>
                        <p className="font-medium">Public</p>
                        <p className="text-xs text-gray-500">Anyone can join</p>
                      </div>
                    </div>
                  </button>
                  <button className="p-3 border rounded-lg text-left hover:border-blue-500">
                    <div className="flex items-center">
                      <Hash className="w-5 h-5 text-gray-500 mr-2" />
                      <div>
                        <p className="font-medium">Private</p>
                        <p className="text-xs text-gray-500">Only invited members</p>
                      </div>
                    </div>
                  </button>
                  <button className="p-3 border rounded-lg text-left hover:border-blue-500">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-gray-500 mr-2" />
                      <div>
                        <p className="font-medium">Direct</p>
                        <p className="text-xs text-gray-500">1:1 conversation</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsAddChannelOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Add channel logic here
                    setIsAddChannelOpen(false)
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Channel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Manage Members Modal */}
      {isManageMembersOpen && activeChannel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">
                  {activeChannel.type === 'direct' ? 'User Details' : 'Channel Members'}
                </h3>
                <button
                  onClick={() => setIsManageMembersOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {activeChannel.type === 'direct' ? (
                <div className="flex items-center mb-6">
                  <img 
                    src="https://ui-avatars.com/api/?name=John+Smith&background=3b82f6&color=fff" 
                    alt={activeChannel.name} 
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{activeChannel.name}</h4>
                    <p className="text-gray-600">Software Engineer</p>
                    <p className="text-sm text-gray-500">Last active: 5 minutes ago</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search members..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {users.map(user => (
                      <div key={user.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                        <div className="flex items-center">
                          <div className="relative mr-3">
                            <img 
                              src={user.avatar} 
                              alt={user.name} 
                              className="w-8 h-8 rounded-full"
                            />
                            <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-white rounded-full ${user.status === 'online' ? 'bg-green-500' : user.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'}`}></div>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.role}</p>
                          </div>
                        </div>
                        <button className="text-red-600 text-sm font-medium">Remove</button>
                      </div>
                    ))}
                  </div>
                </>
              )}
              
              {activeChannel.type !== 'direct' && (
                <>
                  <div className="mt-6 mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Invite New Members</h4>
                    <div className="flex">
                      <select className="flex-1 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                        <option>Select team members...</option>
                        {users.map(user => (
                          <option key={user.id} value={user.id}>{user.name} ({user.role})</option>
                        ))}
                      </select>
                      <button className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Invite
                      </button>
                    </div>
                  </div>
                </>
              )}
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setIsManageMembersOpen(false)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default MessagesModule