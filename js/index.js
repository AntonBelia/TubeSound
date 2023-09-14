import { vinylRecords } from "./vinilRecords.js";
import { createRecordElement } from "./createRecordElement.js";

const backButton = document.getElementById("back-button");

backButton.addEventListener("click", function (e) {
  e.preventDefault();
  window.history.back();
});

function getParameterByName(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

const currentPage = parseInt(getParameterByName("page")) || 1;
const itemsPerPage = 6;

// Функція для відображення записів на сторінці
export function displayRecords(vinylRecords, page = currentPage) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const recordsToDisplay = vinylRecords.slice(startIndex, endIndex);

  const vinylList = document.querySelector(".vinyl-card__list");
  vinylList.innerHTML = "";

  if (recordsToDisplay.length === 0) {
    vinylList.innerHTML = "Sorry, but nothing was found";
  } else {
    recordsToDisplay.forEach((record) => {
      const recordElement = createRecordElement(record);
      vinylList.appendChild(recordElement);
    });
  }

  generatePagination(vinylRecords.length, page);
}

// Функція для створення посилань на сторінки
function generatePagination(totalItems, currentPage) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginationContainer = document.querySelector(".pages");
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const pageLinkContainer = document.createElement("div");
    const pageLink = document.createElement("a");
    pageLink.classList.add("page");
    pageLink.textContent = i;

    // Додайте параметр page до посилань
    pageLink.href = `?page=${i}`;

    if (i === currentPage) {
      pageLink.classList.add("active");
    }

    pageLinkContainer.appendChild(pageLink);
    paginationContainer.appendChild(pageLinkContainer);
  }
}

displayRecords(vinylRecords, currentPage);

// Додати обробник події для посилань на сторінки
const pageLinks = document.querySelectorAll(".page");

pageLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    pageLinks.forEach((pageLink) => {
      pageLink.classList.remove("active");
    });
    const pageNumber = parseInt(event.target.innerHTML);
    const newUrl = `?page=${pageNumber}`;
    history.pushState({}, "", newUrl);

    event.target.classList.add("active");

    displayRecords(vinylRecords, pageNumber);
  });
});

// Додати обробник події для добавлення карточок в колекцію
const addButton = document.querySelectorAll(".vinyl-card__btn");

addButton.forEach((card) =>
  card.addEventListener("click", (e) => {
    const vinilCard = e.target.parentElement;

    const vinylCardData = {
      id: 1,
      title: `${vinilCard.children[1].innerText}`,
      artist: `${vinilCard.children[2].innerText}`,
      year: `${vinilCard.children[3].innerText.slice(6)}`,
      style: `${vinilCard.children[4].innerText.slice(8)}`,
      country: `${vinilCard.children[5].innerText.slice(10)}`,
      image: `${vinilCard.children[0].src}`,
    };

    const existingCollection = JSON.parse(localStorage.getItem("vinylCollection")) || [];

    const inspection = existingCollection.some((item) => {
      return (
        item.title === vinylCardData.title &&
        item.artist === vinylCardData.artist &&
        item.year === vinylCardData.year
      );
    });

    if (!inspection) {
      existingCollection.push(vinylCardData);
    }

    localStorage.setItem("vinylCollection", JSON.stringify(existingCollection));
  })
);

const searchForm = document.getElementById("search-form");
const artistInput = document.getElementById("artist");
const genreSelect = document.getElementById("genre");
const decadeSelect = document.getElementById("decade");
const countrySelect = document.getElementById("country");

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const artistQuery = artistInput.value.trim();
  const genreQuery = genreSelect.value;
  const decadeQuery = decadeSelect.value;
  const countryQuery = countrySelect.value;

  const searchResults = searchVinylRecords(artistQuery, genreQuery, decadeQuery, countryQuery);
  displayRecords(searchResults);
});

function searchVinylRecords(artist, genre, decade, country) {
  return vinylRecords.filter((record) => {
    const artistMatch = !artist || record.artist.toLowerCase().includes(artist.toLowerCase());
    const genreMatch = !genre || record.style === genre;
    const decadeMatch = !decade || isYearInDecade(record.year, decade);
    const countryMatch = !country || record.country === country;

    return artistMatch && genreMatch && decadeMatch && countryMatch;
  });
}

function isYearInDecade(year, decade) {
  if (!year || !decade) {
    return true; 
  }

  const yearNumber = parseInt(year);
  const decadeStartYear = parseInt(decade.slice(0, 4));
  const decadeEndYear = parseInt(decade.slice(0, 4)) + 10; 

  return yearNumber >= decadeStartYear && yearNumber < decadeEndYear;
}