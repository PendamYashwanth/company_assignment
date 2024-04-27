const ProductDataAPI =
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json";

// Constants and variables initialization.
const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

let productData;
let apiStatus = apiStatusConstants.initial;

// Function to create HTML element dynamically based on provided tag name
const createElement = (tag) => {
  return document.createElement(tag);
};

// Function to create Hortizonatal rule element dynamically and append it to its parent container
const createAndAppendHrElement = (container) => {
  const horizontalRule = createElement("hr");
  container.appendChild(horizontalRule);
};

// Function to fetch data asynchronously from the API
async function fetchData() {
  try {
    apiStatus = apiStatusConstants.inProgress;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(ProductDataAPI, options);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const jsonData = await response.json();
    const fetchedData = jsonData.product;
    const formattedData = {
      vendor: fetchedData.vendor,
      compareAtPrice: fetchedData.compare_at_price,
      description: fetchedData.description,
      id: fetchedData.id,
      images: fetchedData.images,
      options: fetchedData.options,
      price: fetchedData.price,
      productType: fetchedData.product_type,
      title: fetchedData.title,
    };
    apiStatus = apiStatusConstants.success;
    productData = formattedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    apiStatus = apiStatusConstants.failure;
  }
}

//-------------------------------------------------RENDER VIEWS-------------------------------------------------

// --------------------Render loading view--------------------

const renderLoadingView = () => {
  console.log("loading");
};

// --------------------Render success view--------------------

// Product images section

const createAndAppendThumbnailImages = (thumbnailContainerEl, imgSrc) => {
  const thumbnailImgElement1 = createElement("img");
  thumbnailImgElement1.src = imgSrc;
  thumbnailContainerEl.appendChild(thumbnailImgElement1);
};

const renderProductImageSection = () => {
  const productImageSectionEl = document.getElementById("productImageSection");

  let imgElement = createElement("img");
  imgElement.src = "./assets/Rectangle 4.png";
  imgElement.classList.add("product-image");
  productImageSectionEl.appendChild(imgElement);

  const thumbnailContainerEl = createElement("section");
  thumbnailContainerEl.classList.add("thumbnail-images-container");
  productImageSectionEl.appendChild(thumbnailContainerEl);

  const thumbnailImgList = [
    "./assets/Rectangle 5.png",
    "./assets/Rectangle 6.png",
    "./assets/Rectangle 7.png",
    "./assets/Rectangle 8.png",
  ];

  for (let imgSrc of thumbnailImgList) {
    createAndAppendThumbnailImages(thumbnailContainerEl, imgSrc);
  }
};

// Product details section

const renderProductDetailsSection = () => {
  const productDetailSectionEl = document.getElementById(
    "productDetailsSection"
  );

  //   console.log(productData);
  // Vendor element
  const vendor = createElement("h1");
  vendor.textContent = productData.vendor;
  productDetailSectionEl.appendChild(vendor);

  createAndAppendHrElement(productDetailSectionEl);

  // Title element
  const title = createElement("h2");
  title.textContent = productData.title;
  productDetailSectionEl.appendChild(title);

  createAndAppendHrElement(productDetailSectionEl);

  // Price, original price and discount section

  const priceAndDiscountContainer = createElement("section");
  priceAndDiscountContainer.classList.add("d-flex");
  productDetailSectionEl.appendChild(priceAndDiscountContainer);

  const price = createElement("p");
  price.textContent = productData.price;
  price.classList.add("price");
  priceAndDiscountContainer.appendChild(price);

  const discount = createElement("p");
  const originalPrice = parseInt(productData.compareAtPrice.slice(1));
  const salePrice = parseInt(productData.price.slice(1));
  // Calculate discount
  const calculateDiscount = Math.floor(
    ((originalPrice - salePrice) / originalPrice) * 100
  );
  discount.textContent = `${calculateDiscount}% Off`;
  discount.classList.add("discount-price");
  priceAndDiscountContainer.appendChild(discount);

  const compareAtPrice = createElement("p");
  compareAtPrice.textContent = productData.compareAtPrice;
  compareAtPrice.classList.add("original-price");
  productDetailSectionEl.appendChild(compareAtPrice);

  createAndAppendHrElement(productDetailSectionEl);

  // Color varients section
  const ChooseAColor = createElement("p");
  ChooseAColor.textContent = "Choose a Color";
  ChooseAColor.classList.add("varient-heading", "mb");
  productDetailSectionEl.appendChild(ChooseAColor);

  const colorVarientsContainer = createElement("section");
  colorVarientsContainer.classList.add("d-flex");
  productDetailSectionEl.appendChild(colorVarientsContainer);

  console.log(productData);

  const colorValues = productData.options[0].values;

  const createAndAppendColorVarients = (colorVarientsContainer, bgColor) => {
    const colorVarient = createElement("div");
    colorVarient.style.backgroundColor = bgColor;
    colorVarient.style.height = "50px";
    colorVarient.style.width = "50px";
    colorVarientsContainer.appendChild(colorVarient);
  };

  for (let obj of colorValues) {
    for (key in obj) {
      createAndAppendColorVarients(colorVarientsContainer, obj[key]);
    }
  }

  createAndAppendHrElement(productDetailSectionEl);

  // Size varients section
  const ChooseASize = createElement("p");
  ChooseASize.textContent = "Choose a Size";
  ChooseASize.classList.add("varient-heading", "mb");
  productDetailSectionEl.appendChild(ChooseASize);

  const sizeValues = productData.options[1].values;

  const sizeVarientsContainer = createElement("section");
  sizeVarientsContainer.classList.add(
    "d-flex",
    "size-varients-container",
    "mb"
  );
  productDetailSectionEl.appendChild(sizeVarientsContainer);

  const createAndAppendSizeVarients = (sizeVarientsContainer, size) => {
    const sizeVarient = createElement("div");
    sizeVarient.classList.add("size-varient-container");

    const radioElement = createElement("input");
    radioElement.type = "radio";
    radioElement.name = "size";
    radioElement.id = size;
    sizeVarient.appendChild(radioElement);

    const labelEl = createElement("label");
    labelEl.htmlFor = size;
    labelEl.textContent = size;
    labelEl.classList.add("size-labels");
    sizeVarient.appendChild(labelEl);

    sizeVarientsContainer.appendChild(sizeVarient);
  };

  for (let size of sizeValues) {
    createAndAppendSizeVarients(sizeVarientsContainer, size);
  }
  // Quanity and Add to cart button
  const quantityAndAddToCartButtonContainer = createElement("section");
  quantityAndAddToCartButtonContainer.classList.add(
    "quantity-cart-btn-contianer",
    "mb"
  );
  productDetailSectionEl.appendChild(quantityAndAddToCartButtonContainer);

  const quantityContainer = createElement("div");
  quantityContainer.classList.add("quantity-container");
  const subBtn = createElement("button");
  subBtn.textContent = "-";
  const addBtn = createElement("button");
  addBtn.textContent = "+";
  const quantity = createElement("p");
  quantity.textContent = 1;
  quantityContainer.appendChild(subBtn);
  quantityContainer.appendChild(quantity);
  quantityContainer.appendChild(addBtn);
  quantityAndAddToCartButtonContainer.appendChild(quantityContainer);

  const addToCartBtn = createElement("button");
  addToCartBtn.classList.add("btn-add-to-cart");

  const cartImg = createElement("img");
  cartImg.src = "./assets/cart.png";
  addToCartBtn.appendChild(cartImg);

  const AddtoCartText = createElement("p");
  AddtoCartText.textContent = "Add to Cart";
  addToCartBtn.appendChild(AddtoCartText);

  quantityAndAddToCartButtonContainer.appendChild(addToCartBtn);

  // Cart message
  const addToCartMessage = createElement("div");
  addToCartMessage.classList.add("add-to-cart-message", "mb");
  addToCartMessage.textContent = "ADDED TO CART";
  productDetailSectionEl.appendChild(addToCartMessage);

  createAndAppendHrElement(productDetailSectionEl);

  const description = createElement("div");
  description.innerHTML = productData.description;
  description.classList.add("description");
  productDetailSectionEl.appendChild(description);
};

const renderSuccessView = () => {
  renderProductImageSection();
  renderProductDetailsSection();
};

// --------------------Render Failure view--------------------

const renderFailureView = () => {
  console.log("fail");
};

// --------------------Conditional rendering based on Api status--------------------
fetchData().then(() => {
  switch (apiStatus) {
    case apiStatusConstants.inProgress:
      return renderLoadingView();
    case apiStatusConstants.success:
      return renderSuccessView();
    case apiStatusConstants.failure:
      return renderFailureView();
    default:
      console.log("Unknown status");
  }
});
