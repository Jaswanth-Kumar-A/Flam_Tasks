import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import useStore from '../store/useStore';

const EmployeeCard = ({ employee }) => {
  const { bookmarks, addBookmark, removeBookmark } = useStore();
  const isBookmarked = bookmarks.some(bookmark => bookmark.id === employee.id);

  const handleBookmark = () => {
    if (isBookmarked) {
      removeBookmark(employee.id);
    } else {
      addBookmark(employee);
    }
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
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
          <p className="text-sm text-gray-600 dark:text-gray-300">{employee.email}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Department: {employee.department}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex flex-row items-center space-x-1">
          {[...Array(5)].map((_, index) => (
            <span key={index}>
              {index < employee.performance ? (
                <StarIcon className="w-4 h-4 text-yellow-400" />
              ) : (
                <StarOutlineIcon className="w-4 h-4 text-gray-300" />
              )}
            </span>
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
          onClick={handleBookmark}
          className={`btn ${isBookmarked ? 'btn-primary' : 'btn-secondary'} flex-1`}
        >
          {isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </button>
        <button className="btn btn-secondary flex-1">
          Promote
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard; 