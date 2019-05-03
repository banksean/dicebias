import { LitElement } from "lit-element";
import { html } from "lit-element";
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';
import { installRouter } from 'pwa-helpers/router.js';

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
        this.page = 'foo';
    }

    static get properties() {
        return {
            page: { type: String },
        }
    }

    render() {
        return html`<h1>app: ${this.page}</h1><roll-sampler></roll-sampler>`;
    }

    firstUpdated() {
        installRouter((location) => this._locationChanged(location));
  
        // The argument passed to installRouter is a callback. If you don't
        // have any other work to do other than dispatching an action, you
        // can also write something like:
        // installRouter((location) => store.dispatch(navigate(location.pathname)));
    }
  
    _locationChanged(location) {
        // What action creator you dispatch and what part of the location
        // will depend on your app.
        store.dispatch(navigate(location.pathname));
  
        // Do other work, if needed, like closing drawers, etc.
    }
}

customElements.define("db-app", DiceBiasApp);
