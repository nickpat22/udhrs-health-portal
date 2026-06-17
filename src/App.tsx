import React, { useState } from 'react';
import { AuthProvider, useAuth } from './auth/AuthContext';
import { ToastProvider } from './hooks/useToast';
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import PatientList from './components/PatientList';
import Appointments from './components/Appointments';
import Records from './components/Records';
import Laboratory from './components/Laboratory';
import Pharmacy from './components/Pharmacy';
import ActivityLog from './components/ActivityLog';

type Tab = 'dashboard' | 'patients' | 'appointments' | 'records' | 'laboratory' | 'pharmacy' | 'activity';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'patients':
        return <PatientList onSelectPatient={(id) => console.log('Selected patient:', id)} />;
      case 'appointments':
        return <Appointments />;
      case 'records':
        return <Records />;
      case 'laboratory':
        return <Laboratory />;
      case 'pharmacy':
        return <Pharmacy />;
      case 'activity':
        return <ActivityLog />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab as any}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className="flex-1 overflow-auto lg:ml-0">
        {renderContent()}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;
