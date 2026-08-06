import React from 'react';

const categories = ['All', 'Action', 'Sci-Fi', 'Comedy', 'Horror', 'Drama', 'Thriller', 'Animation'];

const CategoryFilter = ({ activeCategory, setActiveCategory }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-12 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeCategory === category
              ? 'bg-[#DC2626] text-white shadow-[0_0_10px_rgba(220,38,38,0.5)]'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white border border-gray-700'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;