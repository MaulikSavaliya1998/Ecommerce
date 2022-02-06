const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHadler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

// Get All Product
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.find();
  res.status(200).json({ success: true, product });
});

// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }

  res.status(200).json({ success: true, product });
});

// Update Product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });

  res.status(200).json({ success: true, product });
});

// Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }

  await product.remove();
  res
    .status(200)
    .json({ success: true, message: "Product Deleted Successfully!" });
});
