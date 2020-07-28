var x = document.getElementById("navbarMobile");

function openMenu() {
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function closeMenu() {
  x.style.display = "none";
}