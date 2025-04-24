const buttonsMenu = document.querySelectorAll(".menu-filters button");
const itemsMenu = Array.from(document.querySelectorAll(".menu-card"));
console.log(buttonsMenu);
buttonsMenu.forEach((button) => {
  button.addEventListener("click", () => {
    buttonsMenu.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    const filter = button.getAttribute("data-filter");
    let filteredItems = [];

    if (filter === "all" || filter === null) {
      filteredItems = [...itemsMenu];
    } else {
      filteredItems = itemsMenu.filter(
        (item) => item.getAttribute("data-category") === filter
      );
    }

    // Sort ascending by name (or you can use data-id if needed)
    filteredItems.sort((a, b) => {
      const nameData = a.getAttribute("data-name") || "";
      a.setAttribute("data-name", nameData);
      return a
        .getAttribute("data-name")
        .localeCompare(b.getAttribute("data-name"));
    });

    const grid = document.querySelector(".menu-cards-container");
    grid.innerHTML = ""; // Clear
    filteredItems.forEach((item) => grid.appendChild(item)); // Reinsert
  });
});
