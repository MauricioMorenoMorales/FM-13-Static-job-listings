const $main = document.querySelector('main');

let allExistentData = [];
let filteredData = [];

const renderData = data => {
	if (allExistentData.length === 0) {
		allExistentData = data;
		filteredData = allExistentData;
	}
	let template = '';
	for (const item of filteredData) {
		let filters = '';
		for (const language of item.languages) {
			filters += `<p class="job__filters__item" data-filter="${language.toLowerCase()}">${language}</p>\n`;
		}
		for (const tool of item.tools) {
			filters += `<p class="job__filters__item" data-filter="${tool.toLowerCase()}">${tool}</p>\n`;
		}
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
				<p class="job__description__content__charge">Senior Frontend Developer</p>
				<div class="job__description__content__data">
					<span>1d ago</span> · <span>Part Time</span> · <span>USA only</span>
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
