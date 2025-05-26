import { useState, useEffect } from 'react';
import EmployeeCard from '../components/EmployeeCard';
import SearchBar from '../components/SearchBar';
import useEmployees from '../hooks/useEmployees';
import useStore from '../store/useStore';

const Dashboard = () => {
  const employees = useEmployees();
  const { loading, error } = useStore();
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const departments = [...new Set(employees.map(emp => emp.department))];

  useEffect(() => {
    setFilteredEmployees(employees);
  }, [employees]);

  const handleSearch = ({ searchTerm, department, rating }) => {
    let filtered = employees;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        emp =>
          emp.firstName.toLowerCase().includes(term) ||
          emp.lastName.toLowerCase().includes(term) ||
          emp.email.toLowerCase().includes(term)
      );
    }

    if (department) {
      filtered = filtered.filter(emp => emp.department === department);
    }

    if (rating) {
      filtered = filtered.filter(emp => emp.performance === parseInt(rating));
    }

    setFilteredEmployees(filtered);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Employee Dashboard
      </h1>

      <SearchBar onSearch={handleSearch} departments={departments} />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No employees found matching your search criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 