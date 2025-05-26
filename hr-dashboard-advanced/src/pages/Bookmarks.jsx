import { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import useStore from '../store/useStore';

const Bookmarks = () => {
  const { bookmarks, removeBookmark } = useStore();
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handlePromote = (employee) => {
    setSelectedEmployee(employee);
    setShowPromoteModal(true);
  };

  const handleRemoveBookmark = (employeeId) => {
    removeBookmark(employeeId);
  };

  if (bookmarks.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Bookmarks
        </h1>
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No bookmarked employees yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Bookmarks
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarks.map((employee) => (
          <div key={employee.id} className="card hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center space-x-4">
              <img
                src={employee.image}
                alt={employee.firstName}
                className="w-16 h-16 rounded-full"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {employee.firstName} {employee.lastName}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {employee.email}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Department: {employee.department}
                </p>
              </div>
            </div>

            <div className="mt-4">
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
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => window.location.href = `/employee/${employee.id}`}
                className="btn btn-primary flex-1"
              >
                View
              </button>
              <button
                onClick={() => handlePromote(employee)}
                className="btn btn-secondary flex-1"
              >
                Promote
              </button>
              <button
                onClick={() => handleRemoveBookmark(employee.id)}
                className="btn btn-secondary flex-1"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {showPromoteModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">
              Promote {selectedEmployee.firstName} {selectedEmployee.lastName}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Are you sure you want to promote this employee?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowPromoteModal(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle promotion logic here
                  setShowPromoteModal(false);
                }}
                className="btn btn-primary"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookmarks; 