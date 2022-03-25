import { css, html, LitElement } from 'lit-element/lit-element.js';

class Carousel extends LitElement {

	static get properties() {
		return {
			prop1: { type: String },
		};
	}

	static get styles() {
		return css`
			:host {
				display: inline-block;
			}
			:host([hidden]) {
				display: none;
			}
		`;
	}

	constructor() {
		super();

		this.prop1 = 'carousel';
	}

	render() {
		return html`
			<h2>${this.prop1}!</h2>
		`;
	}

}
customElements.define('d2l-labs-carousel', Carousel);
