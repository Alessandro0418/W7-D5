// shop.js
const shopContainer = document.getElementById("shop-container");
async function fetchProducts() {
  try {
    const response = await fetch(
      "https://striveschool-api.herokuapp.com/api/product/",
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkNWVjMDM4MzRiZjAwMTUwMDA4YTEiLCJpYXQiOjE3NDI1NjA5NjAsImV4cCI6MTc0Mzc3MDU2MH0.KxsR8b5dGT34tgxF3jTHbPZIynIcmLPlUI-f_1hn0MA",
        },
      }
    );

    if (response.ok) {
      const products = await response.json();
      displayProducts(products);
    } else {
      console.error("Errore nel recupero dei prodotti", response.status);
    }
  } catch (error) {
    console.error("Errore di rete:", error);
  }
}

function displayProducts(products) {
  shopContainer.innerHTML = "";

  products.forEach((product) => {
    const productCard = `
          <div class="col-12 col-md-4 col-lg-3 my-3">
            <div class="card card-color-bg" id="product-card-${product._id}">
              <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}" />
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text">Price: €${product.price}</p>
                <a href="#" class="btn btn-buy">Buy Now</a>
              </div>
            </div>
    
            <!-- Modal -->
            <div class="modal fade" id="modal-${product._id}" tabindex="-1" aria-labelledby="modalLabel-${product._id}" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content bg-dark text-white">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modalLabel-${product._id}">${product.name}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <img src="${product.imageUrl}" class="img-fluid" alt="${product.name}" />
                    <p>${product.description}</p>
                    <p>Price: €${product.price}</p>
                  </div>
                  <div class="modal-footer">
  
                  <div class="d-flex align-items-center justify-content-center admin-button-div">
                    <p class="my-0 me-3">Admin commands:</p>
                    <button type="button" id="delete-button-${product._id}" class="btn btn-danger me-1"">Delete</button>
                    </div>
                    
                    <button type="button" class="btn btn-secondary ms-5" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;

    shopContainer.innerHTML += productCard;

    // MODALE
    const productCardElement = document.getElementById(
      `product-card-${product._id}`
    );
    productCardElement.addEventListener("click", () => {
      const modal = new bootstrap.Modal(
        document.getElementById(`modal-${product._id}`)
      );
      modal.show();
    });

    // DELETE CARD
    const deleteButton = document.getElementById(
      `delete-button-${product._id}`
    );
    if (deleteButton) {
      deleteButton.addEventListener("click", () => {
        deleteProduct(product._id);
      });
    }
  });
}

const deleteProduct = function (productId) {
  fetch("https://striveschool-api.herokuapp.com/api/product/" + productId, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkNWVjMDM4MzRiZjAwMTUwMDA4YTEiLCJpYXQiOjE3NDI1NjA5NjAsImV4cCI6MTc0Mzc3MDU2MH0.KxsR8b5dGT34tgxF3jTHbPZIynIcmLPlUI-f_1hn0MA",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("PRODOTTO ELIMINATO");

        document.getElementById("product-card-" + productId).remove();
      } else {
        throw new Error("Eliminazione NON andata a buon fine!");
      }
    })
    .catch((err) => {
      console.log("ERRORE NELLA CANCELLAZIONE", err);
    });
};
document.addEventListener("DOMContentLoaded", fetchProducts);
