import React, { useState } from "react";
import "./Category.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";



const CategoryManager: React.FC = () => {
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingName, setEditingName] = useState<string>("");

  const handleAddCategory = () => {
    if (newCategoryName.trim() !== "") {
      setCategories([...categories, newCategoryName]);
      setNewCategoryName("");
    }
  };

  const handleDeleteCategory = (index: number) => {
    const newCategories = [...categories];
    newCategories.splice(index, 1);
    setCategories(newCategories);
  };

  const handleEditCategory = (index: number) => {
    setEditingIndex(index);
    setEditingName(categories[index]);
  };

  const handleUpdateCategory = () => {
    const newCategories = [...categories];
    newCategories[editingIndex as number] = editingName;
    setCategories(newCategories);
    setEditingIndex(null);
    setEditingName("");
  };

  return (
    <div>
      <Link to="/Stock-order" className="back-icon">
      <ArrowBackIcon />
    </Link>
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
          <li key={index}>
            {editingIndex === index ? (
              <div>
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                />
                <button onClick={handleUpdateCategory}>Update</button>
              </div>
            ) : (
              <>
                {category}
                <div className="icon-container">
                  <span
                    className="clickable-icon edit-icon"
                    onClick={() => handleEditCategory(index)}
                  >
                    <EditIcon />
                  </span>
                  <span
                    className="clickable-icon delete-icon"
                    onClick={() => handleDeleteCategory(index)}
                  >
                    <DeleteIcon />
                  </span>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManager;
