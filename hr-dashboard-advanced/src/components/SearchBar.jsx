import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchBar = ({ onSearch, departments }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedRating, setSelectedRating] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({
      searchTerm,
      department: selectedDepartment,
      rating: selectedRating
    });
  };

  return (
    <form onSubmit={handleSearch} className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>
        
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="input w-48"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <select
          value={selectedRating}
          onChange={(e) => setSelectedRating(e.target.value)}
          className="input w-48"
        >
          <option value="">All Ratings</option>
          {[1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>
              {rating} Stars
            </option>
          ))}
        </select>

        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar; 