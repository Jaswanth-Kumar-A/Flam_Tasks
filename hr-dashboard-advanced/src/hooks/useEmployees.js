import { useEffect } from 'react';
import useStore from '../store/useStore';

const useEmployees = () => {
  const { employees, setEmployees, setLoading, setError } = useStore();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/users?limit=20');
        const data = await response.json();
        
        // Add performance rating and department to each employee
        const enhancedEmployees = data.users.map(employee => ({
          ...employee,
          performance: Math.floor(Math.random() * 5) + 1,
          department: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'][Math.floor(Math.random() * 5)]
        }));
        
        setEmployees(enhancedEmployees);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (employees.length === 0) {
      fetchEmployees();
    }
  }, []);

  return employees;
};

export default useEmployees; 