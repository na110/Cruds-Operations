let productName = document.getElementById("product-name");
let productPrice = document.getElementById("product-price");
let productCategory = document.getElementById("product-category");
let productDescription = document.getElementById("product-description");
let btnAddProduct = document.getElementById("add-product");
let btnClear = document.getElementById("clear");
let search = document.getElementById("search");
let form = document.getElementById("form");
let tbody = document.getElementById("tbody");
let globalIndex = "";

let productList = [];

/**
 * Check If Found Data In LocalStorage ********************************************************************
 **/
if (localStorage.getItem("product") != null) {
  productList = JSON.parse(localStorage.getItem("product"));
  displayProducts();
} else {
  productList = [];
}

/**
 * Get Product ********************************************************************************************
 **/
function getDetailsProduct() {
  const product = {
    name: productName.value.toLowerCase(),
    price: productPrice.value,
    category: productCategory.value.toLowerCase(),
    description: productDescription.value.toLowerCase(),
  };

  productList.push(product);
  localStorage.setItem("product", JSON.stringify(productList));
  displayProducts();
  clearForm();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (btnAddProduct.innerHTML == "Update Product") {
    updateProduct(globalIndex);
    clearForm();
    btnAddProduct.innerHTML = "Add Product";
  } else {
    getDetailsProduct();
  }
});

/**
 * Display ********************************************************************************************
 **/
function displayProducts() {
  let cartona = "";
  productList.map((product, index) => {
    cartona += `
            <tr>
              <td>${index + 1}</td>
              <td>${product.name}</td>
              <td>${product.price}</td>
              <td>${product.category}</td>
              <td>${product.description}</td>
              <td class="row gap-3 justify-content-center">
                <button
                  class="btn btn-warning btn-md col-12 col-md-5"
                  id="update"
                  onclick="getDataInForm(${index})"
                >
                  Update
                </button>
                <button
                  class="btn btn-danger btn-md col-12 col-md-5"
                  id="delete"
                  onclick="deleteProduct(${index})"
                >
                  Delete
                </button>
              </td>
          </tr>
    `;
    tbody.innerHTML = cartona;
  });
}

/**
 * Clear Input ****************************************************************************************
 **/
function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDescription.value = "";
  btnAddProduct.value = "";
}

btnClear.addEventListener("click", clearForm);

/**
 * Delete ********************************************************************************************
 **/
function deleteProduct(deleteIndex) {
  productList.splice(deleteIndex, 1);
  localStorage.setItem("product", JSON.stringify(productList));
  displayProducts();
}

/**
 * Update ********************************************************************************************
 **/
function getDataInForm(updateIndex) {
  productName.value = productList[updateIndex].name;
  productPrice.value = productList[updateIndex].price;
  productCategory.value = productList[updateIndex].category;
  productDescription.value = productList[updateIndex].description;
  btnAddProduct.innerHTML = "Update Product";
  globalIndex = updateIndex;
}

function updateProduct(updateIndex) {
  productList.splice(updateIndex, 1, {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    description: productDescription.value,
  });
  console.log(updateIndex);
  localStorage.setItem("product", JSON.stringify(productList));
  displayProducts();
}

/**
 * Search *******************************************************************************************
 **/
let searchMode = "name";

function getSearchMode(id) {
  if (id == "search-by-name") {
    search.placeholder = "Search By Name..";
    searchMode = "name";
  } else {
    search.placeholder = "Search By Category..";
    searchMode = "category";
  }
  search.focus();
}

search.addEventListener("keyup", () => {
  let cartona = "";

  if (searchMode == "name") {
    productList.filter((product, index) => {
      if (product.name.startsWith(search.value.toLowerCase())) {
        cartona += `
            <tr>
              <td>${index + 1}</td>
              <td>${product.name}</td>
              <td>${product.price}</td>
              <td>${product.category}</td>
              <td>${product.description}</td>
              <td class="row gap-3 justify-content-center">
                <button
                  class="btn btn-warning btn-md col-12 col-md-5"
                  id="update"
                  onclick="getDataInForm(${index})"
                >
                  Update
                </button>
                <button
                  class="btn btn-danger btn-md col-12 col-md-5"
                  id="delete"
                  onclick="deleteProduct(${index})"
                >
                  Delete
                </button>
              </td>
          </tr>
    `;
      }
    });
  } else {
    productList.filter((product, index) => {
      if (product.category.startsWith(search.value.toLowerCase())) {
        cartona += `
              <tr>
                <td>${index + 1}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.category}</td>
                <td>${product.description}</td>
                <td class="row gap-3 justify-content-center">
                  <button
                    class="btn btn-warning btn-md col-12 col-md-5"
                    id="update"
                    onclick="getDataInForm(${index})"
                  >
                    Update
                  </button>
                  <button
                    class="btn btn-danger btn-md col-12 col-md-5"
                    id="delete"
                    onclick="deleteProduct(${index})"
                  >
                    Delete
                  </button>
                </td>
            </tr>
          `;
      }
    });
  }
  tbody.innerHTML = cartona;
});
