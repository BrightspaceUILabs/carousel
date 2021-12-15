import '@brightspace-ui/core/components/button/button-icon.js';
import { css, html, LitElement } from 'lit-element';

class Carousel extends LitElement {

	static get properties() {
		return {
			carouselSize: { type: Number, attribute: 'carousel-size' },
			itemsPerSet: { type: Number, attribute: 'items-per-set' },
			itemIndex: { type: Number, attribute: 'item-index' }
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			.d2l-button-left {
				margin: auto 0;
				left: -42px;
			}
			.d2l-button-right {
				margin: auto 0;
				right: -42px;
			}
			.d2l-card-carousel {
				justify-content: space-around;
				width: 100%;
			}
			.d2l-carousel {
				display: flex;
				justify-content: space-between;
				position: relative;
			}
			.d2l-button-container {
				position: absolute;
				top: 50%;
				width: 42px;
				transform: translateY(-50%);
			}
			.d2l-header-container {
				display: flex;
				justify-content: space-between;
			}
		`;
	}

	constructor() {
		super();
		this.itemIndex = 0;
		this.itemsPerSet = 0;
		this.carouselSize = 0;
	}

	render() {
		return html`
			<div class="d2l-carousel">
				<div class="d2l-button-left d2l-button-container">
				<d2l-button-icon icon="tier1:chevron-left" @click="${this._onPreviousClick}" ?disabled=${this._isFirstCard()}></d2l-button-icon>
				</div>

				<div class="d2l-card-carousel">
					<slot name="carousel"></slot>
				</div>

				<div class="d2l-button-right d2l-button-container">
				<d2l-button-icon icon="tier1:chevron-right" @click="${this._onNextClick}" ?disabled=${this._isLastCard()}></d2l-button-icon>
				</div>
			</div>
		`;
	}

	_isFirstCard() {
		return this.itemIndex === 0;
	}

	_isLastCard() {
		return this.itemIndex + this.itemsPerSet >= this.carouselSize;
	}

	_onNextClick() {
		this.dispatchEvent(new CustomEvent('d2l-carousel-next', {
			bubbles: true,
			composed: true
		}));
	}

	_onPreviousClick() {
		this.dispatchEvent(new CustomEvent('d2l-carousel-previous', {
			bubbles: true,
			composed: true
		}));
	}
}
customElements.define('d2l-labs-carousel', Carousel);
