import React, { useState } from 'react';
import "./Brand.css"

const BrandManager: React.FC = () => {
  const [newBrandName, setNewBrandName] = useState<string>('');
  const [Brands, setBrands] = useState<string[]>([]);

  const handleAddBrand = () => {
    if (newBrandName.trim() !== '') {
      setBrands([...Brands, newBrandName]);
      setNewBrandName('');
    }
  };

  return (
    <div>
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
        {Brands.map((brand, index) => (
          <li key={index}>{brand}</li>
        ))}
      </ul>
    </div>
  );
};

export default BrandManager;
