import { LitElement } from "lit-element";
import { html } from "lit-element";
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

// This element is connected to the Redux store.
import { store } from '../../store';
import { RollSampler } from '../roll-sampler/roll-sampler';

// These are the actions needed by this element.
import {
  navigate,
  updateOffline,
  updateDrawerState
} from '../../actions/app.js';

class DiceBiasApp extends connect(store)(LitElement) {
    constructor() {
        super();
    }
    render() {
        return html`<h1>app</h1><roll-sampler></roll-sampler>`;
    }
}

customElements.define("db-app", DiceBiasApp);
