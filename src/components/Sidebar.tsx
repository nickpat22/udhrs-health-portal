import React from 'react';
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  FlaskConical,
  Pill,
  Activity,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, collapsed, setCollapsed }) => {
  const { logout, user, canAccessModule } = useAuth();

  const modules = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'records', label: 'Records', icon: FileText },
    { id: 'laboratory', label: 'Laboratory', icon: FlaskConical },
    { id: 'pharmacy', label: 'Pharmacy', icon: Pill },
    { id: 'activity', label: 'Activity Log', icon: Activity },
  ];

  const accessibleModules = modules.filter(m => canAccessModule(m.id));

  return (
    <>
      {/* Mobile Overlay */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen bg-white shadow-lg z-50 transition-all duration-300 ${
          collapsed ? '-translate-x-full' : 'translate-x-0'
        } lg:translate-x-0 lg:static lg:z-auto w-64`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-cyan-600">UDHRS</h1>
            <p className="text-xs text-gray-500">{user?.role}</p>
          </div>
          <button
            onClick={() => setCollapsed(true)}
            className="lg:hidden text-gray-600 hover:text-gray-900"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-6 space-y-2">
          {accessibleModules.map(module => {
            const Icon = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => {
                  setActiveTab(module.id);
                  setCollapsed(true);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === module.id
                    ? 'bg-cyan-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{module.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Toggle */}
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="fixed bottom-6 right-6 lg:hidden bg-cyan-600 text-white p-3 rounded-full shadow-lg z-40"
        >
          <Menu size={24} />
        </button>
      )}
    </>
  );
};

export default Sidebar;
