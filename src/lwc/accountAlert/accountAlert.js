import { LightningElement, api } from 'lwc';
import getAlerts from '@salesforce/apex/AccountAlertController.getAlerts';

export default class AccountAlert extends LightningElement {
  _accountId;
  @api
  set recordId(id) {
    this._accountId = id;
    getAlerts({ accountId: this._accountId })
      .then((res) => res.sort((a, b) => a.rank - b.rank))
      .then((res) => (this.alerts = res));
  }
  get recordId() {
    return this._accountId;
  }

  alerts = [];
}
