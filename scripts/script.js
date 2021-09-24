const $main = document.querySelector('main');
const $filterZone = document.querySelector('.header__filters__list');
const $filterContainer = document.querySelector('.header__filters');

//The initial State
let allExistentData = [];
//Variable information observed by applyFilter and render data
let filters = [];
let filteredData = [];

//Shows the complete data or the filtered data
const renderData = data => {
	//sets initial state with  data in the "DomContentLoaded" event
	if (data) {
		allExistentData = data;
	}
	let template = '';

	for (const item of filteredData.length === 0
		? allExistentData
		: filteredData) {
		let filters = '';
		// Creates the filter section of the complete template
		for (const language of item.languages) {
			filters += `<p class="job__filters__item">${language}</p>\n`;
		}
		for (const tool of item.tools) {
			filters += `<p class="job__filters__item">${tool}</p>\n`;
		}
		filters += `<p class="job__filters__item">${item.level}</p>\n`;
		filters += `<p class="job__filters__item">${item.role}</p>\n`;
		// Create the entire job item template
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

// Filters the data and shows every filter inside array filters
const applyFilter = () => {
	filters = [...new Set(filters)];
	//Filters the data and save it in filteredData
	let appliedFiltersData = [];
	const filterFunction = (element, filterName) =>
		element.level === filterName ||
		element.role === filterName ||
		element.tools.filter(subElement => subElement === filterName).length > 0 ||
		element.languages.filter(subElement => subElement === filterName).length >
			0;

	let firstIteration = true;
	for (const filterName of filters) {
		if (firstIteration) {
			appliedFiltersData = allExistentData.filter(element =>
				filterFunction(element, filterName),
			);
			firstIteration = false;
		} else {
			appliedFiltersData = appliedFiltersData.filter(element =>
				filterFunction(element, filterName),
			);
		}
	}
	filteredData = appliedFiltersData;

	// Renders the filter list in the UI
	if (filters.length !== 0) $filterContainer.classList.add('active');
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
		if (filters.length === 0) $filterContainer.classList.remove('active');
		applyFilter();
	}
	//Removes all filters
	if (event.target.matches('.header__filters__clear__button')) {
		filters = [];
		$filterContainer.classList.remove('active');
		applyFilter();
	}
});
