const $main = document.querySelector('main');

let allExistentData = [];
let filters = ['Javascript', 'HTML']
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
			filters += `<p class="job__filters__item" data-filter="${language}">${language}</p>\n`;
		}
		for (const tool of item.tools) {
			filters += `<p class="job__filters__item" data-filter="${tool}">${tool}</p>\n`;
		}
		filters += `<p class="job__filters__item" data-filter="${item}">${item.level}</p>\n`;
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

document.addEventListener('DOMContentLoaded', async event => {
	const completeData = await fetch('./data.json');
	const completeDataJson = await completeData.json();
	renderData(completeDataJson);
});

const applyFilter = filter => {
	filteredData = filteredData.filter(
		element =>
			element.level === filter ||
			element.tools.filter(subElement => subElement === filter).length > 0 ||
			element.languages.filter(subElement => subElement === filter).length > 0,
	);
	renderData();
};

document.addEventListener('click', event => {
	applyFilter('CSS');
});

