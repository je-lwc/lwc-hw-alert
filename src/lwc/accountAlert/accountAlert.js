import { LightningElement, api } from 'lwc';
import getAlerts from '@salesforce/apex/AccountAlertController.getAlerts';

export default class AccountAlert extends LightningElement {
  _accountId;
  loading = false;
  alerts = [];

  @api
  set recordId(id) {
    this._accountId = id;
    this.getAlerts();
  }
  get recordId() {
    return this._accountId;
  }

  getAlerts() {
    this.loading = true;
    getAlerts({ accountId: this._accountId })
      .then((res) => res.sort((a, b) => a.rank - b.rank))
      .then((res) => (this.alerts = res))
      .finally(() => (this.loading = false));
  }

  renderedCallback() {
    this.template.querySelectorAll('.alert-board>div').forEach((el) => {
      el.style.color = el.dataset.color;
      el.style.backgroundColor = el.dataset.bg;
    });
  }
}
