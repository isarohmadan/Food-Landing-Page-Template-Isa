const images = [...document.querySelectorAll(".gallery-item")].map(
  (img) => img.querySelector("img").src
);
let currentIndex = 0;

const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");

let isSliding = false;
function fadeTo(index) {
  if (isSliding) return;
  isSliding = true;

  modalImg.style.transition = "opacity 0.3s ease";
  modalImg.style.opacity = 0;

  setTimeout(() => {
    modalImg.src = images[index];

    // Setelah src diganti, fade in
    modalImg.onload = () => {
      modalImg.style.opacity = 1;

      // Setelah animasi selesai
      setTimeout(() => {
        isSliding = false;
      }, 300);
    };
  }, 300); // waktu fade out
}

document.querySelectorAll(".gallery-item").forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    modalImg.src = images[currentIndex];
    modal.classList.remove("hidden", "hide");
    modal.classList.add("show");
    modalImg.style.opacity = 1;
  });
});

document.getElementById("prev-img").addEventListener("click", () => {
  const prevIndex = (currentIndex - 1 + images.length) % images.length;
  fadeTo(prevIndex);
  currentIndex = prevIndex;
});

document.getElementById("next-img").addEventListener("click", () => {
  const nextIndex = (currentIndex + 1) % images.length;
  fadeTo(nextIndex);
  currentIndex = nextIndex;
});

document.getElementById("close").addEventListener("click", () => {
  modal.classList.remove("show");
  modal.classList.add("hide");

  // Setelah animasi selesai, baru sembunyikan element
  setTimeout(() => {
    modal.classList.add("hidden");
  }, 300); // match durasi fadeOut
});

const buttons = document.querySelectorAll(".gallery-filters button");
const items = Array.from(document.querySelectorAll(".gallery-item"));

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");
    let filteredItems = [];

    if (filter === "all" || filter === null) {
      filteredItems = [...items];
    } else {
      filteredItems = items.filter(
        (item) => item.getAttribute("data-category") === filter
      );
    }

    // Sort ascending by name (or you can use data-id if needed)
    filteredItems.sort((a, b) => {
      return a
        .getAttribute("data-name")
        .localeCompare(b.getAttribute("data-name"));
    });

    const grid = document.querySelector(".gallery-grid");
    grid.innerHTML = ""; // Clear
    filteredItems.forEach((item) => grid.appendChild(item)); // Reinsert
  });
});
