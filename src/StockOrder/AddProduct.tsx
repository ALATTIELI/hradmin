import { useState } from "react";
import { Link } from "react-router-dom";
import "./AddProduct.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function AddProduct() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [costPrice, setCostPrice] = useState(0);
  const [barcodePrice, setBarcodePrice] = useState(0);
  const [photoUrl, setPhotoUrl] = useState("");
  const [sku, setSku] = useState("");
  const [barcode, setBarcode] = useState("");
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [productAdded, setProductAdded] = useState(false); // New state to track product addition

  const handleAddStock = () => {
    const newStock = {
      productName,
      description,
      costPrice,
      barcodePrice,
      photoUrl,
      sku,
      barcode,
      availableQuantity,
      category,
      brand,
    };
    console.log(newStock);

    // TODO: Add logic to save the new stock (e.g., send to server, update local state, etc.)

    // Redirect to another page after adding, e.g., stock order list
    setProductAdded(true); // Mark the product as added
  };

  return (
    <div className="add-product">
      <Link to="/Stock-order" className="back-icon">
      <ArrowBackIcon />
    </Link>
      <h2>Add New Product</h2>
      {productAdded ? (
        <div>
          <p>Product added successfully!</p>
          <Link to="/Add-Product">Go back to Products</Link>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddStock();
          }}
        >
          <input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Brand"
          />
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
          />
          <input
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder="Photo URL"
          />
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product Name"
          />
          <input
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            placeholder="SKU"
          />
          <input
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            placeholder="Barcode"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          ></textarea>
          <input
            type="number"
            value={costPrice}
            onChange={(e) => setCostPrice(Number(e.target.value))}
            placeholder="Cost Price"
          />
          <input
            type="number"
            value={barcodePrice}
            onChange={(e) => setBarcodePrice(Number(e.target.value))}
            placeholder="Barcode Price"
          />
          <input
            type="number"
            value={availableQuantity}
            onChange={(e) => setAvailableQuantity(Number(e.target.value))}
            placeholder="Available Quantity"
          />
          <button type="submit">Add Product</button>
        </form>
      )}
    </div>
  );
}

export default AddProduct;
