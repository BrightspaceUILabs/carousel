import { css, html, LitElement } from 'lit-element';

class Carousel extends LitElement {

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
				left: calc(-42px - 3px);
			}
			.d2l-button-right {
				margin: auto 0;
				right: calc(-42px - 3px);
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

	render() {
		return html`
			<div class="d2l-header-container">
				<slot name="header"></slot>
				<slot name="link"></slot>
			</div>
			<div class="d2l-carousel">
				<div class="d2l-button-left d2l-button-container">
					<slot name="left"></slot>
				</div>

				<div class="d2l-card-carousel">
					<slot name="carousel"></slot>
				</div>

				<div class="d2l-button-right d2l-button-container">
					<slot name="right"></slot>
				</div>
			</div>
		`;
	}

}
customElements.define('d2l-labs-carousel', Carousel);
