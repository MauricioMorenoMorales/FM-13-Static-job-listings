const $main = document.querySelector('main');
const $filterZone = document.querySelector('.header__filters__list');

let allExistentData = [];
let filters = [];
let filteredData = [];

const renderData = data => {
	if (data) {
		allExistentData = data;
		filteredData = allExistentData;
	}
	let template = '';
	for (const item of filteredData) {
		let filters = '';
		// Creates the filter section
		for (const language of item.languages) {
			filters += `<p class="job__filters__item">${language}</p>\n`;
		}
		for (const tool of item.tools) {
			filters += `<p class="job__filters__item">${tool}</p>\n`;
		}
		filters += `<p class="job__filters__item">${item.level}</p>\n`;
		filters += `<p class="job__filters__item">${item.role}</p>\n`;
		// Create the entire job item
		template += `
		<article class="job">
		<section class="job__description">
			<img src="${item.logo}" alt="" class="job__description__image">
			<div class="job__description__content">
				<div class="job__description__content__title">
					<p class="job__description__content__title__text">${item.company}</p>
					${item.new ? '<p class="job__description__content__title__new">New!</p>' : ''}
					${
						item.featured
							? '<p class="job__description__content__title__featured">Featured</p>'
							: ''
					}
				</div>
				<p class="job__description__content__charge">${item.position}</p>
				<div class="job__description__content__data">
					<span>${item.postedAt}</span> · <span>${item.contract}</span> · <span>${
			item.location
		}</span>
				</div>
			</div>
		</section>
		<div class="job__filters">
			${filters}
		</div>
	</article>
		`;
	}
	$main.innerHTML = template;
};

const applyFilter = () => {
	//Filters the data to display
	let firstIteration = true;
	let appliedFiltersArray = [];
	for (const filterName of filters) {
		if (firstIteration) {
			appliedFiltersArray = allExistentData.filter(
				element =>
					element.level === filterName ||
					element.role === filterName ||
					element.tools.filter(subElement => subElement === filterName).length >
						0 ||
					element.languages.filter(subElement => subElement === filterName)
						.length > 0,
			);
			appliedFiltersArray = allExistentData.filter(
				element =>
					element.languages.filter(subElement => subElement === filterName)
						.length > 0,
			);
			firstIteration = false;
		} else {
			appliedFiltersArray = appliedFiltersArray.filter(
				element =>
					element.level === filterName ||
					element.role === filterName ||
					element.tools.filter(subElement => subElement === filterName).length >
						0 ||
					element.languages.filter(subElement => subElement === filterName)
						.length > 0,
			);
		}
	}
	filteredData = appliedFiltersArray;
	//renders the filter view
	let template = '';
	for (const filterName of filters) {
		template += `
			<div class="header__filters__list__item" data-filter="${filterName}">
				<p class="header__filters__list__item__name">${filterName}</p>
				<div class="header__filters__list__item__close">
					<img src="./images/icon-remove.svg" alt="">
				</div>
			</div>
		`;
	}
	$filterZone.innerHTML = template;
	renderData();
};

document.addEventListener('DOMContentLoaded', async event => {
	const completeData = await fetch('./data.json');
	const completeDataJson = await completeData.json();
	renderData(completeDataJson);
});

document.addEventListener('click', event => {
	//Adds a filter
	if (event.target.matches('.job__filters__item')) {
		filters.push(String(event.target.innerHTML));
		applyFilter();
	}
	//Removes a filter
	if (
		event.target.matches('.header__filters__list__item') ||
		event.target.matches('.header__filters__list__item *')
	) {
		const filterName = event.target
			.closest('.header__filters__list__item')
			.getAttribute('data-filter');

		filters = filters.filter(element => element !== filterName);
		applyFilter();
	}
});
