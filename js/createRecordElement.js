export function createRecordElement(record) {
	const vinylCard = document.createElement('div');
        vinylCard.classList.add('vinyl-card');

        const vinylImage = document.createElement('img');
        vinylImage.src = record.image;
        vinylImage.srcset = `${record.image} 1x, ${record.image2x} 2x`;
        vinylImage.alt = record.title;

        const title = document.createElement('h2');
        title.textContent = record.title.length < 21 ? record.title : (record.title.slice(0, 18) + '...');

        const artist = document.createElement('h3');
        artist.textContent = record.artist;

        const year = document.createElement('p');
        year.innerHTML = `<span>Year :</span> ${record.year}`;

        const style = document.createElement('p');
        style.innerHTML = `<span>Style :</span> ${record.style.length < 15 ? record.style : (record.style.slice(0, 12) + '...')}`;

        const country = document.createElement('p');
        country.innerHTML = `<span>Country :</span> ${record.country.length < 15 ? record.country : (record.country.slice(0, 12) + '...')}`;

        const addButton = document.createElement('button');
        addButton.classList.add('vinyl-card__btn');
		addButton.textContent = `Add `;

		const like = document.createElement('div');
		like.classList.add('vinyl-card__like');

        vinylCard.appendChild(vinylImage);
        vinylCard.appendChild(title);
        vinylCard.appendChild(artist);
        vinylCard.appendChild(year);
        vinylCard.appendChild(style);
        vinylCard.appendChild(country);
        vinylCard.appendChild(addButton);
        vinylCard.appendChild(like);

        return vinylCard
}