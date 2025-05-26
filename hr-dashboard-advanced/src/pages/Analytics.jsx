import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import useEmployees from '../hooks/useEmployees';
import useStore from '../store/useStore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const employees = useEmployees();
  const { bookmarks } = useStore();
  const [departmentData, setDepartmentData] = useState(null);
  const [bookmarkData, setBookmarkData] = useState(null);

  useEffect(() => {
    // Calculate department-wise average ratings
    const departments = [...new Set(employees.map(emp => emp.department))];
    const departmentRatings = departments.map(dept => {
      const deptEmployees = employees.filter(emp => emp.department === dept);
      const avgRating =
        deptEmployees.reduce((sum, emp) => sum + emp.performance, 0) /
        deptEmployees.length;
      return avgRating;
    });

    setDepartmentData({
      labels: departments,
      datasets: [
        {
          label: 'Average Performance Rating',
          data: departmentRatings,
          backgroundColor: 'rgba(14, 165, 233, 0.5)',
          borderColor: 'rgb(14, 165, 233)',
          borderWidth: 1,
        },
      ],
    });

    // Generate mock bookmark trend data
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return date.toLocaleString('default', { month: 'short' });
    }).reverse();

    setBookmarkData({
      labels: last6Months,
      datasets: [
        {
          label: 'Bookmarks Added',
          data: last6Months.map(() => Math.floor(Math.random() * 10) + 1),
          borderColor: 'rgb(14, 165, 233)',
          backgroundColor: 'rgba(14, 165, 233, 0.5)',
          tension: 0.4,
        },
      ],
    });
  }, [employees]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Department Performance</h2>
          {departmentData && (
            <Bar options={chartOptions} data={departmentData} />
          )}
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Bookmark Trends</h2>
          {bookmarkData && (
            <Line options={chartOptions} data={bookmarkData} />
          )}
        </div>

        <div className="card lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-primary-50 dark:bg-primary-900 rounded-lg">
              <h3 className="font-medium text-primary-900 dark:text-primary-100">
                Total Employees
              </h3>
              <p className="text-2xl font-bold text-primary-700 dark:text-primary-300">
                {employees.length}
              </p>
            </div>
            <div className="p-4 bg-primary-50 dark:bg-primary-900 rounded-lg">
              <h3 className="font-medium text-primary-900 dark:text-primary-100">
                Bookmarked
              </h3>
              <p className="text-2xl font-bold text-primary-700 dark:text-primary-300">
                {bookmarks.length}
              </p>
            </div>
            <div className="p-4 bg-primary-50 dark:bg-primary-900 rounded-lg">
              <h3 className="font-medium text-primary-900 dark:text-primary-100">
                Avg. Performance
              </h3>
              <p className="text-2xl font-bold text-primary-700 dark:text-primary-300">
                {(
                  employees.reduce((sum, emp) => sum + emp.performance, 0) /
                  employees.length
                ).toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 