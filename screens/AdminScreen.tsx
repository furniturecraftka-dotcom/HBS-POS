
import React, { useState } from 'react';
import { usePos } from '../context/usePos';
import ReportsView from '../components/admin/ReportsView';
import UserManagementView from '../components/admin/UserManagementView';
import SystemInfoView from '../components/admin/SystemInfoView';
import MenuManagementView from '../components/admin/MenuManagementView';
import { ChartBarIcon, UsersIcon, InformationCircleIcon, LogoutIcon, ClipboardListIcon } from '../components/icons';

type AdminTab = 'reports' | 'users' | 'system' | 'menu';

const AdminScreen: React.FC = () => {
  const { currentUser, logout } = usePos();
  const [activeTab, setActiveTab] = useState<AdminTab>('reports');

  const renderContent = () => {
    switch (activeTab) {
      case 'reports':
        return <ReportsView />;
      case 'users':
        return <UserManagementView />;
      case 'system':
        return <SystemInfoView />;
      case 'menu':
        return <MenuManagementView />;
      default:
        return null;
    }
  };

  const TabButton: React.FC<{ tabName: AdminTab; icon: React.ReactNode; label: string }> = ({ tabName, icon, label }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left transition-colors ${
        activeTab === tabName ? 'bg-amber-500 text-slate-900' : 'text-slate-300 hover:bg-slate-700'
      }`}
    >
      {icon}
      <span className="font-semibold">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-900 text-slate-200">
      <aside className="w-64 bg-slate-800 p-4 flex flex-col justify-between">
        <div>
            <h1 className="text-2xl font-bold text-amber-400 mb-8 px-2">Admin Panel</h1>
            <nav className="space-y-2">
                <TabButton tabName="reports" icon={<ChartBarIcon className="w-6 h-6"/>} label="Reports" />
                <TabButton tabName="menu" icon={<ClipboardListIcon className="w-6 h-6"/>} label="Menu Management" />
                <TabButton tabName="users" icon={<UsersIcon className="w-6 h-6"/>} label="User Management" />
                <TabButton tabName="system" icon={<InformationCircleIcon className="w-6 h-6"/>} label="System Info" />
            </nav>
        </div>
        <div>
            <div className="text-center text-slate-400 mb-4">
                Logged in as <br/> <span className="font-bold text-slate-200">{currentUser?.name}</span>
            </div>
            <button
                onClick={logout}
                className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-lg text-left transition-colors bg-red-500 hover:bg-red-600 text-white font-bold"
            >
                <LogoutIcon className="w-6 h-6"/>
                <span>Logout</span>
            </button>
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminScreen;
