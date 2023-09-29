import React from "react";

type ProductProps = {
  productName: string;
  description: string;
  costPrice: number;
  barcodePrice: number;
  photoUrl: string;
  sku: string;
  barcode: string;
  availableQuantity: number;
  category: string;
  brand: string;
};

const AddedProduct: React.FC<ProductProps> = (props) => {
  return (
    <div className="added-product">
      <h2>Added Product Details</h2>
      <div><strong>Product Name:</strong> {props.productName}</div>
      <div><strong>Description:</strong> {props.description}</div>
      <div><strong>Cost Price:</strong> ${props.costPrice.toFixed(2)}</div>
      <div><strong>Barcode Price:</strong> ${props.barcodePrice.toFixed(2)}</div>
      <div><strong>Photo URL:</strong> {props.photoUrl}</div>
      <div><strong>SKU:</strong> {props.sku}</div>
      <div><strong>Barcode:</strong> {props.barcode}</div>
      <div><strong>Available Quantity:</strong> {props.availableQuantity}</div>
      <div><strong>Category:</strong> {props.category}</div>
      <div><strong>Brand:</strong> {props.brand}</div>
    </div>
  );
};

export default AddedProduct;
