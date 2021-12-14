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
			}
			.d2l-button-right {
				margin: auto 0;
			}
			.d2l-card-carousel {
				justify-content: space-around;
				width: 100%;
			}
			.d2l-carousel {
				display: flex;
				justify-content: space-between;
			}
		`;
	}

	render() {
		return html`
			<slot name="header"></slot>
			<div class="d2l-carousel">
				<div class="d2l-button-left">
					<slot name="left"></slot>
				</div>

				<div class="d2l-card-carousel">
					<slot name="carousel"></slot>
				</div>

				<div class="d2l-button-right">
					<slot name="right"></slot>
				</div>
			</div>
		`;
	}

}
customElements.define('d2l-labs-carousel', Carousel);
