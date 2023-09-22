import React, { useState } from 'react';
import "./Category.css"

const CategoryManager: React.FC = () => {
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);

  const handleAddCategory = () => {
    if (newCategoryName.trim() !== '') {
      setCategories([...categories, newCategoryName]);
      setNewCategoryName('');
    }
  };

  return (
    <div>
      <h1>Category Manager</h1>
      <div>
        <input
          type="text"
          placeholder="Enter category name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManager;
