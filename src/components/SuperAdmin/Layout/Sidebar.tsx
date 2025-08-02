import { useState } from 'react';
import { 
  FiUsers, 
  FiSettings, 
  FiDatabase, 
  FiPieChart, 
  FiFileText, 
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiShield
} from 'react-icons/fi';

interface SidebarLinkProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarLink = ({ icon, text, active = false, onClick }: SidebarLinkProps) => (
  <li 
    className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
    onClick={onClick}
  >
    <span className="text-xl">{icon}</span>
    <span className="ml-3">{text}</span>
  </li>
);

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeLink, setActiveLink] = useState('Dashboard');

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLinkClick = (linkName: string) => {
    setActiveLink(linkName);
    // Here you would typically also handle navigation
  };

  return (
    <div className={`h-screen bg-white shadow-lg flex flex-col transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
      {/* Sidebar Header */}
      <div className="p-4 flex items-center justify-between border-b">
        {!collapsed && (
          <h1 className="text-xl font-bold text-blue-600">Admin Panel</h1>
        )}
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          {collapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
        </button>
      </div>

      {/* Sidebar Links */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          <SidebarLink 
            icon={<FiHome />} 
            text="Dashboard" 
            active={activeLink === 'Dashboard'}
            onClick={() => handleLinkClick('Dashboard')}
          />
          <SidebarLink 
            icon={<FiUsers />} 
            text="User Management" 
            active={activeLink === 'User Management'}
            onClick={() => handleLinkClick('User Management')}
          />
          <SidebarLink 
            icon={<FiShield />} 
            text="Roles & Permissions" 
            active={activeLink === 'Roles & Permissions'}
            onClick={() => handleLinkClick('Roles & Permissions')}
          />
          <SidebarLink 
            icon={<FiDatabase />} 
            text="Data Management" 
            active={activeLink === 'Data Management'}
            onClick={() => handleLinkClick('Data Management')}
          />
          <SidebarLink 
            icon={<FiPieChart />} 
            text="Analytics" 
            active={activeLink === 'Analytics'}
            onClick={() => handleLinkClick('Analytics')}
          />
          <SidebarLink 
            icon={<FiFileText />} 
            text="Reports" 
            active={activeLink === 'Reports'}
            onClick={() => handleLinkClick('Reports')}
          />
          <SidebarLink 
            icon={<FiSettings />} 
            text="Settings" 
            active={activeLink === 'Settings'}
            onClick={() => handleLinkClick('Settings')}
          />
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t">
        <SidebarLink 
          icon={<FiLogOut />} 
          text={collapsed ? '' : 'Logout'} 
          onClick={() => console.log('Logout')}
        />
      </div>
    </div>
  );
};

export default Sidebar;