'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const menuItems = [
  { iconSrc: '/dashboardMain.svg', label: 'Dashboard', path: '/', active: false },
  { iconSrc: '/briefcase.svg', label: 'Projects', path: '/board', active: false },
  { iconSrc: '/task.svg', label: 'Tasks', path: '/tasks', active: false },
  { iconSrc: '/dashboard.svg', label: 'Dashboard', path: '/dashboard-alt', active: false },
  { iconSrc: '/clock.svg', label: 'Time log', path: '/time-log', active: false },
  { iconSrc: '/resuorcemanagement.svg', label: 'Resource mgmt', path: '/resource', active: false },
  { iconSrc: '/users.svg', label: 'Users', path: '/users', active: false },
  { iconSrc: '/projectTemplate.svg', label: 'Project template', path: '/template', active: false },
  { iconSrc: '/settings.svg', label: 'Menu settings', path: '/settings', active: false },
];

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {

  return (
    <aside className={`${isCollapsed ? 'w-[70px]' : 'w-[220px]'} bg-black text-white h-screen fixed left-0 top-0 flex flex-col py-6 px-4 transition-all duration-300`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors z-10 shadow-md border border-gray-200"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4 text-gray-700" /> : <ChevronLeft className="w-4 h-4 text-gray-700" />}
      </button>

      {/* Logo Section */}
      <div className={`flex items-center gap-3 mb-8 px-2 ${isCollapsed ? 'justify-center' : ''}`}>
        <Image src="/logo.svg" alt="Promage Logo" width={28} height={28} />
        {!isCollapsed && <span className="text-lg font-semibold">Promage</span>}
      </div>

      {/* Create New Project Button */}
      {!isCollapsed ? (
        <Link href="/board" className="bg-white text-black rounded-full py-3 px-4 mb-6 flex items-center gap-2 hover:bg-gray-100 transition-colors">
          <Image src="/plus.svg" alt="Plus Icon" width={20} height={20} />
          <span className="text-sm font-medium">Create new project</span>
        </Link>
      ) : (
        <Link href="/board" className="bg-white text-black rounded-full w-12 h-12 mb-6 flex items-center justify-center hover:bg-gray-100 transition-colors mx-auto">
          <Image src="/plus.svg" alt="Plus Icon" width={24} height={24} />
        </Link>
      )}

      {/* Menu Items */}
      <nav className="flex-1 space-y-1 ">
        {menuItems.map((item, index) => {
          const isActive = index === 0; // Dashboard is active
          return (
            <Link
              key={item.path}
              href={item.path === '/' ? '/' : item.path}
              className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-black text-gray-400 font-medium hover:text-white hover:bg-orange-500'
                  : 'text-gray-400 hover:text-white hover:bg-orange-500'
              }`}
              title={isCollapsed ? item.label : ''}
            >
              <Image 
                src={item.iconSrc} 
                alt={item.label} 
                width={isCollapsed ? 22 : 18} 
                height={isCollapsed ? 22 : 18}
                className={isActive ? '' : 'brightness-0 invert opacity-60'}
              />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Action Button */}
      
    </aside>
  );
}
