import React from 'react';
import { Users, Calendar, FileText, Pill } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.fullName}!</h1>
        <p className="text-gray-600 mt-2">Role: {user?.role.toUpperCase()}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-cyan-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900">1,234</p>
            </div>
            <Users className="text-cyan-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Appointments</p>
              <p className="text-2xl font-bold text-gray-900">45</p>
            </div>
            <Calendar className="text-green-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Records</p>
              <p className="text-2xl font-bold text-gray-900">892</p>
            </div>
            <FileText className="text-purple-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-amber-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Prescriptions</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
            <Pill className="text-amber-600" size={32} />
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="mt-8 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg shadow-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Getting Started</h2>
        <p className="mb-4">Welcome to the Universal Digital Health Records System. Use the navigation menu to access different modules based on your role and permissions.</p>
      </div>
    </div>
  );
};

export default Dashboard;
