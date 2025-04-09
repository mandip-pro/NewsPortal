import React, { useState } from 'react';

const categories = [
    'Trending',
  'World',
  'Technology',
  'Health',
  'Sports',
  'Entertainment',
  'Business'
];

function Sidebar(props) {
  const [activeCategory, setActiveCategory] = useState('Trending');

  const handleToggleCategory = (category) => {
    setActiveCategory(activeCategory === category ? '' : category);

  };
  props.setSelectedCategory(activeCategory.toLowerCase())
  return (
    <div className="sidebar">
      <h3>Categories</h3>
      <ul>
        {categories.map((category) => (
          <li
            key={category}
            className={activeCategory === category ? 'active' : ''}
            onClick={() => handleToggleCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;