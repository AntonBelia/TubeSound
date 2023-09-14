import { displayRecords } from "./index.js";

const backButton = document.getElementById('back-button');

backButton.addEventListener('click', function (e) {
  e.preventDefault(); 
  
  window.history.back();
});

const existingCollection = JSON.parse(localStorage.getItem('vinylCollection')) || [];

function getParameterByName(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

const currentPage = parseInt(getParameterByName("page")) || 1;

displayRecords(existingCollection, currentPage);

