import { LitElement } from "lit-element";
import { html } from "lit-element";
import { MWCButton } from "@material/mwc-button";
import { chiSquared } from "../../bias";

class AppElement extends LitElement {
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
          <mwc-button
            icon="add_circle"
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
        <mwc-button icon="undo" @click=${this.undoClicked}>undo</mwc-button>
      `
    );

    return html`
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
    this.rolls.pop();
    this.rolls = [...this.rolls];
  }

  numberClicked(n) {
    this.rolls.push(n);
    this.rolls = [...this.rolls];
  }
}
customElements.define("db-app", AppElement);
