import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import useEmployees from '../hooks/useEmployees';

const EmployeeDetails = () => {
  const { id } = useParams();
  const employees = useEmployees();
  const [activeTab, setActiveTab] = useState('overview');

  const employee = employees.find(emp => emp.id === parseInt(id));

  if (!employee) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Employee not found</div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'projects', label: 'Projects' },
    { id: 'feedback', label: 'Feedback' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 dark:text-gray-300">Full Name</p>
                  <p className="font-medium">{employee.firstName} {employee.lastName}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300">Email</p>
                  <p className="font-medium">{employee.email}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300">Phone</p>
                  <p className="font-medium">{employee.phone}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300">Department</p>
                  <p className="font-medium">{employee.department}</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Performance</h3>
              <div className="flex flex-row items-center space-x-1">
                {[...Array(5)].map((_, index) => (
                  <StarIcon
                    key={index}
                    className={`w-4 h-4 ${
                      index < employee.performance
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-gray-600 dark:text-gray-300">
                  ({employee.performance}/5)
                </span>
              </div>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Current Projects</h3>
            <div className="space-y-4">
              {['Project A', 'Project B', 'Project C'].map((project, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0">
                  <h4 className="font-medium">{project}</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Status: {['In Progress', 'Completed', 'Planning'][index]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'feedback':
        return (
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Recent Feedback</h3>
            <div className="space-y-4">
              {[
                'Great team player and excellent communication skills.',
                'Consistently delivers high-quality work.',
                'Shows strong leadership potential.',
              ].map((feedback, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0">
                  <p className="text-gray-600 dark:text-gray-300">{feedback}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(Date.now() - index * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-4 mb-8">
        <img
          src={employee.image}
          alt={employee.firstName}
          className="w-24 h-24 rounded-full"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {employee.firstName} {employee.lastName}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">{employee.department}</p>
        </div>
      </div>

      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-8">{renderTabContent()}</div>
    </div>
  );
};

export default EmployeeDetails; 