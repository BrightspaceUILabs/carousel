import './carousel.js';
import '@brightspace-ui/core/components/card/card.js';
import '@brightspace-ui/core/components/card/card-content-title.js';
import '@brightspace-ui/core/components/card/card-footer-link.js';
import { css, html, LitElement } from 'lit-element';

class CarouselDemo extends LitElement {

	static get properties() {
		return {
			courses: { type: Array },
			_cardLimit: { type: Number },
			_cardsPerPage: { type: Number },
			_courseIndex: { type: Number }
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
				padding: 1rem;
			}
			:host([hidden]) {
				display: none;
			}
			.card-carousel {
				display: flex;
				justify-content: space-between;
			}
			.d2l-card-image {
				display: block;
				width: 100%;
				height: 120px;
			}
			d2l-card {
				margin: 0.25rem;
				max-width: 230px;
				min-width: 180px;
			}
			.d2l-header {
				margin-left: 0.25rem;
			}
			d2l-link {
				margin-right: 0.25rem;
			}

			@media (max-width: 767px) {
				d2l-card {
					max-width: 200px;
					min-width: 130px;
				}
				.d2l-card-image {
					display: block;
					width: 100%;
					height: 60px;
				}
			}
		`;
	}

	constructor() {
		super();
		this.courses = ['Biology', 'Chemistry', 'Physics', 'Math', 'History', 'Geography', 'Economics'];
		this._onWindowResize = this._onWindowResize.bind(this);
		this._courseIndex = 0;
		this._cardsPerPage = 0;
		this._cardLimit = 4; // Default limit is 4 cards per page
	}

	connectedCallback() {
		super.connectedCallback();
		window.addEventListener('resize', this._onWindowResize);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		window.removeEventListener('resize', this._onWindowResize);
	}

	render() {
		const showCourses = this.courses.slice(this._courseIndex, this._courseIndex + this._cardsPerPage);
		return html`
			<d2l-labs-carousel .carouselSize="${this.courses.length}" .itemsPerSet="${this._cardsPerPage}" .itemIndex="${this._courseIndex}"
				@d2l-carousel-previous=${this._onPreviousSet} @d2l-carousel-next=${this._onNextSet}>
				<div class="card-carousel" slot="carousel">
					${showCourses.map(course => html`
						<d2l-card align-center text="${course}">
							<img slot="header" alt="" class="d2l-card-image" src="https://s.brightspace.com/course-images/images/7905e442-f009-46f6-8586-2c273a7c0158/banner-narrow-low-density-max-size.jpg">
							<div slot="content">
								<d2l-card-content-title>${course}</d2l-card-content-title>
							</div>
							<div slot="footer">
								<d2l-card-footer-link id="discussionsLink1" icon="tier1:outcomes" text="Outcomes" secondary-text="2"></d2l-card-footer-link>
								<d2l-card-footer-link id="assignmentsLink1" icon="tier1:assignments" text="Assignments" secondary-text="1"></d2l-card-footer-link>
							</div>
						</d2l-card>
					`)}
				</div>
			</d2l-labs-carousel>
		`;
	}

	updated(changedProperties) {
		super.updated(changedProperties);

		if (changedProperties.has('courses')) {
			this._setCardCount();
		}

		if (changedProperties.has('_cardsPerPage')) {
			this.requestUpdate();
		}
	}

	_onNextSet() {
		this._courseIndex = Math.min(this._courseIndex + this._cardsPerPage, this.courses.length - 1);
		this.requestUpdate();
	}

	_onPreviousSet() {
		this._courseIndex = Math.max(this._courseIndex - this._cardsPerPage, 0);
		this.requestUpdate();
	}

	_onWindowResize() {
		this._setCardCount();
	}

	_setCardCount() {
		const width = window.innerWidth;
		const carousel = this.shadowRoot.querySelector('d2l-labs-carousel');
		let cardsAmount = 0;

		if (width <= 767) {
			cardsAmount = Math.max(1, Math.floor(carousel.clientWidth / 140));
		} else {
			cardsAmount = Math.max(1, Math.floor(carousel.clientWidth / 190));
		}

		this._cardsPerPage = Math.min(cardsAmount, this._cardLimit);
	}
}
customElements.define('d2l-labs-carousel-demo', CarouselDemo);
