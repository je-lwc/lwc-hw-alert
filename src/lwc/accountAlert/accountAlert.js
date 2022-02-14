import { LightningElement, api } from 'lwc';
import getAlerts from '@salesforce/apex/AccountAlertController.getAlerts';

export default class AccountAlert extends LightningElement {
  _accountId;
  @api
  set recordId(id) {
    this._accountId = id;
    this.loading = true;
    getAlerts({ accountId: this._accountId })
      .then((res) => res.sort((a, b) => a.rank - b.rank))
      .then((res) => (this.alerts = res))
      .finally(() => (this.loading = false));
  }
  get recordId() {
    return this._accountId;
  }

  alerts = [];

  renderedCallback() {
    this.template.querySelectorAll('.alert-board>div').forEach((el) => {
      el.style.color = el.dataset.color;
      el.style.backgroundColor = el.dataset.bg;
    });
  }
}
