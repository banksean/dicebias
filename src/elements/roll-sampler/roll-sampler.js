import { LitElement } from "lit-element";
import { html } from "lit-element";
import { MWCButton } from "@material/mwc-button";
import { chiSquared } from "../../bias";

import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../../store';

import {
    addSample,
    undoSample
} from '../../actions/dice';

class RollSampler extends connect(store)(LitElement) {
  static get properties() {
    return {
      rolls: { type: Array, value: [] },
      pearsonScore: { type: Number },
      sides: { type: Number }
    };
  }

  constructor() {
    super();
    this.rolls = [];
    this.pearsonScore = 0;
    this.sides = 10;
  }

  render() {
    const score = chiSquared(this.rolls, this.sides);

    const buttons = [];
    for (let i = 0; i < this.sides; i++) {
      buttons.push(
        html`
          <mwc-button raised class="light"
                @click=${e => store.dispatch(addSample(i))}
            >${i}</mwc-button
          >
        `
      );
    }
    buttons.push(
      html`
        <mwc-button raised class="light" 
            @click=${() => store.dispatch(undoSample())}>
        undo
        </mwc-button>
      `
    );

    return html`
      <style>
      .light {
        --mdc-theme-on-primary: black;
        --mdc-theme-primary: white;
        --mdc-theme-on-secondary: black;
        --mdc-theme-secondary: white;
      }
      </style>  
      <div>
        ${buttons}
      </div>
      <div><h3>${score}</h3></div>
      <div>
        ${this.rolls}
      </div>
    `;
  }

  numberClicked(n) {
    store.dispatch(addSample(n));
  }

  stateChanged(state) {
    this.rolls = state.dice.samples;
  }
}
customElements.define("roll-sampler", RollSampler);
