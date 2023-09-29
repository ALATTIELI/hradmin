import React, { useState } from "react";
import "./Brand.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";



const AddBrand: React.FC = () => {
  const [newBrandName, setNewBrandName] = useState<string>("");
  const [brands, setBrands] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingName, setEditingName] = useState<string>("");

  const handleAddBrand = () => {
    if (newBrandName.trim() !== "") {
      setBrands([...brands, newBrandName]);
      setNewBrandName("");
    }
  };

  const handleDeleteBrand = (index: number) => {
    const newBrands = [...brands];
    newBrands.splice(index, 1);
    setBrands(newBrands);
  };

  const handleEditBrand = (index: number) => {
    setEditingIndex(index);
    setEditingName(brands[index]);
  };

  const handleUpdateBrand = () => {
    const newCategories = [...brands];
    newCategories[editingIndex as number] = editingName;
    setBrands(newCategories);
    setEditingIndex(null);
    setEditingName("");
  };

  return (
    <div>
      <Link to="/Stock-order" className="back-icon">
      <ArrowBackIcon />
    </Link>
      <h1>Brand Manager</h1>
      <div>
        <input
          type="text"
          placeholder="Enter brand name"
          value={newBrandName}
          onChange={(e) => setNewBrandName(e.target.value)}
        />
        <button onClick={handleAddBrand}>Add Brand</button>
      </div>
      <ul>
        {brands.map((brand, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <div>
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                />
                <button onClick={handleUpdateBrand}>Update</button>
              </div>
            ) : (
              <>
                {brand}
                <div className="icon-container">
                  <span
                    className="clickable-icon edit-icon"
                    onClick={() => handleEditBrand(index)}
                  >
                    <EditIcon />
                  </span>
                  <span
                    className="clickable-icon delete-icon"
                    onClick={() => handleDeleteBrand(index)}
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

export default AddBrand;
