import { LitElement } from "lit-element";
import { html } from "lit-element";
import { MWCButton } from "@material/mwc-button";
import { chiSquared } from "../../bias";

import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

// This element is connected to the Redux store.
import { store } from '../../store';

// These are the actions needed by this element.
import {
  navigate,
  updateOffline,
  updateDrawerState
} from '../../actions/app.js';

import {
    addSample,
    undoSample
} from '../../actions/dice';

class AppElement extends connect(store)(LitElement) {
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
            @click=${e => {
              this.numberClicked(i);
            }}
            >${i}</mwc-button
          >
        `
      );
    }
    buttons.push(
      html`
        <mwc-button raised class="light" @click=${() => store.dispatch(undoSample())}>
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

  undoClicked() {
    store.dispatch(undoSample())
  }

  numberClicked(n) {
    store.dispatch(addSample(n));
  }

  stateChanged(state) {
    this.rolls = state.dice.samples;
  }
}
customElements.define("db-app", AppElement);
