/* ===============================
   CARD TOGGLE (OPEN / CLOSE)
================================ */
document.querySelectorAll(".product-card").forEach(card => {
  card.addEventListener("click", () => {
    const content = card.querySelector(".card-content");
    if (!content) return;

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});


/* ===============================
   PRACTICAL 1 DATA (Refactored for efficiency)
================================ */
fetch("data/practical1.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("practical1");
    if (!container) return;

    // 1. Build the full HTML string for all items
    const htmlContent = data.map(item => `
      <div class="card-item">
        <img src="${item.image}" alt="${item.commonName}">
        <div>
          <p><strong>Common Name:</strong> ${item.commonName}</p>
          <p><strong>Scientific Name:</strong>
            <i>${item.scientificName.join(", ")}</i>
          </p>
          <p><strong>Ingredients:</strong> ${item.ingredients}</p>
          <p><strong>Producer:</strong> ${item.producer}</p>
          <p><strong>Purpose / Benefits:</strong></p>
          <ul>
            ${item.benefits.map(b => `<li>${b}</li>`).join("")}
          </ul>
        </div>
      </div>
    `).join(""); // Join all mapped strings together

    // 2. Insert the entire string into the DOM in one go
    container.innerHTML += htmlContent; // Use += to keep existing "Note" from HTML
  })
  .catch(err => console.error("Failed to load practical1.json:", err));


/* ===============================
   TAXONOMY DATA
================================ */
fetch("data/taxonomy.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("taxonomy");
    if (!container) return;

    data.forEach(item => {
      container.innerHTML += `
        <div class="card-item" style="display:flex; gap:20px; align-items:flex-start; margin-bottom:20px;">
          
          <div style="display:flex; gap:10px;">
            ${item.images.map(img => `
              <img src="${img}"
                   alt="Taxonomy image"
                   style="width:150px; height:auto; border-radius:10px;">
            `).join("")}
          </div>

          <div>
            <p><strong>Taxonomy:</strong> <i>${item.taxonomy}</i></p>

            <p><strong>Key Features:</strong></p>
            <ul>
              ${item.features.map(f => `<li>${f}</li>`).join("")}
            </ul>

            <p><strong>Habitat:</strong> ${item.habitat}</p>
          </div>

        </div>
      `;
    });
  })
  .catch(err => console.error("Failed to load taxonomy.json:", err));

fetch("data/fieldtrip.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("fieldtrip-houses");
    if (!container) return;

    data.forEach(house => {
      container.innerHTML += `
        <div class="card-item" style="display:flex; gap:20px; align-items:flex-start; margin-bottom:30px;">
          
          <img src="${house.image}"
               alt="${house.house}"
               style="width:180px; border-radius:10px; object-fit:cover;">

          <div>
            <p><strong>House ID:</strong> ${house.house}</p>

            <table border="1" cellpadding="5" cellspacing="0">
              <thead>
                <tr>
                  <th>Scientific Name</th>
                  <th>Common Name</th>
                  <th>Number of Individuals</th>
                </tr>
              </thead>
              <tbody>
                ${house.species.map(s => `
                  <tr>
                    <td><i>${s.scientific}</i></td>
                    <td>${s.common}</td>
                    <td>${s.count}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>

        </div>
      `;
    });
  })
  .catch(err => console.error("Failed to load field trip data:", err));
