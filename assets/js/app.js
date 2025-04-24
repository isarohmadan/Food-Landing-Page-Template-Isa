window.addEventListener("load", function () {
  // Tambahkan class 'loaded' ke body
  document.body.classList.add("loaded");
});

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("open");
  document.getElementById("hamburger").classList.toggle("active");
}
