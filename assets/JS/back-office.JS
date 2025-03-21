const form = document.getElementById("event-form");
async function createProduct(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const imageUrl = prompt("Enter the image URL for the car");

  const productData = {
    name: name,
    description: description,
    price: price,
    imageUrl: imageUrl,
    brand: "Unknown",
  };

  try {
    const response = await fetch(
      "https://striveschool-api.herokuapp.com/api/product/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkNWVjMDM4MzRiZjAwMTUwMDA4YTEiLCJpYXQiOjE3NDI1NjA5NjAsImV4cCI6MTc0Mzc3MDU2MH0.KxsR8b5dGT34tgxF3jTHbPZIynIcmLPlUI-f_1hn0MA",
        },
        body: JSON.stringify(productData),
      }
    );

    if (response.ok) {
      alert("Product added successfully!");
      form.reset();
    } else {
      console.error("Errore nel creare il prodotto", response.status);
    }
  } catch (error) {
    console.error("Errore di rete:", error);
  }
}

form.addEventListener("submit", createProduct);
