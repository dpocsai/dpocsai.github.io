const autoCompleteConfig = {
	renderOption(movie) {
		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
		return `
		<img src="${imgSrc}"/>
		${movie.Title} (${movie.Year})
		`;
	},

	inputValue(movie) {
		return movie.Title;
	},
	async fetchData(searchTerm) {
		const response = await axios.get('http://www.omdbapi.com/', {
			params : {
				apikey : 'e91ff458',
				s      : searchTerm
			}
		}); //'http://www.omdbapi.com/?apikey=e91ff458&s=avengers'
		return response.data.Error ? [] : response.data.Search;
	}
};

createAutoComplete({
	...autoCompleteConfig,
	root           : document.querySelector('#left-autocomplete'),
	onOptionSelect(movie) {
		document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
	}
});
createAutoComplete({
	...autoCompleteConfig,
	root           : document.querySelector('#right-autocomplete'),
	onOptionSelect(movie) {
		document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
	}
});
let leftMovie;
let rightMovie;
const onMovieSelect = async (movie, summaryElement, side) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params : {
			apikey : 'e91ff458',
			i      : movie.imdbID
		}
	});

	summaryElement.innerHTML = movieTemplate(response.data);

	side === 'left' ? (leftMovie = response.data) : (rightMovie = response.data);
	if (leftMovie && rightMovie) {
		runComparison();
	}
};
const runComparison = () => {
	const leftStats = document.querySelectorAll('#left-summary .notification');
	const rightStats = document.querySelectorAll('#right-summary .notification');

	leftStats.forEach((leftStat, i) => {
		const rightStat = rightStats[i];
		const leftValue = +leftStat.dataset.value;
		const rightValue = +rightStat.dataset.value;

		if (rightValue > leftValue) {
			leftStat.classList.remove('is-primary');
			leftStat.classList.add('is-warning');
		} else if (rightValue < leftValue) {
			rightStat.classList.remove('is-primary');
			rightStat.classList.add('is-warning');
		} else {
			rightStat.classList.remove('is-primary');
			rightStat.classList.add('is-warning');
			leftStat.classList.remove('is-primary');
			leftStat.classList.add('is-warning');
		}
	});
};
const movieTemplate = (movieDetail) => {
	const boxOffice = +movieDetail.BoxOffice.replace(/[\$\,]/g, '');

	const metascore = +movieDetail.Metascore;

	const imdbRating = +movieDetail.imdbRating;

	const imdbVotes = +movieDetail.imdbVotes.replace(/\,/g, '');

	const awards = movieDetail.Awards.split(' ').reduce((a, b) => (a += +b > 0 ? +b : 0), 0);

	return `
	<article class="media">
		<figure class="media-left">
		<p class="image">
			<img src="${movieDetail.Poster}"/>
		</p>
		</figure>
		<div class="media-content">
			<div class="content">
			<h1>${movieDetail.Title}</h1>
			<h4>${movieDetail.Genre}</h4>
			<p>${movieDetail.Plot}</p>
			</div>
		</div>
	</article>
	<article data-value=${awards} class="notification is-primary">
		<p class="title">${movieDetail.Awards}</p>
		<p class="subtitle">Awards</p>
	</article>
	<article data-value=${boxOffice} class="notification is-primary">
		<p class="title">${movieDetail.BoxOffice}</p>
		<p class="subtitle">Box Office</p>
	</article>
	<article data-value=${metascore} class="notification is-primary">
		<p class="title">${movieDetail.Metascore}</p>
		<p class="subtitle">Metascore</p>
	</article>
	<article data-value=${imdbRating} class="notification is-primary">
		<p class="title">${movieDetail.imdbRating}</p>
		<p class="subtitle">IMDB Rating</p>
	</article>
	<article data-value=${imdbVotes} class="notification is-primary">
		<p class="title">${movieDetail.imdbVotes}</p>
		<p class="subtitle">IMDB Votes</p>
	</article>
	
	`;
};
