public class AccountAlertController {
  @AuraEnabled(cachable=true)
  public static List<AccountAlert> getAlerts(Id accountId) {
    Map<String, String> params = new Map<String, String>();
    params.put('recordId', accountId);
    Flow.Interview.Homewater_Create_Account_Alert_Master_Flow flow1 = new Flow.Interview.Homewater_Create_Account_Alert_Master_Flow(
      params
    );
    flow1.start();
    List<Account_Alert__c> alertObjects = [
      SELECT Id, notification__c, color__c, background_color__c, rank__c
      FROM Account_Alert__c
      WHERE account_id__c = :accountId AND Active__c = TRUE
    ];
    List<AccountAlert> alerts = new List<AccountAlert>();
    for (Account_Alert__c ao : alertObjects) {
      AccountAlert aa = new AccountAlert();
      aa.id = ao.Id;
      aa.content = ao.notification__c;
      aa.color = String.isEmpty(ao.color__c) ? 'black' : ao.color__c;
      aa.background = String.isEmpty(ao.background_color__c) ? 'white' : ao.background_color__c;
      aa.rank = ao.rank__c == null ? 10000 : ao.rank__c;
      alerts.add(aa);
    }
    return alerts;
  }

  class AccountAlert {
    @AuraEnabled
    public String id;
    @AuraEnabled
    public String content;
    @AuraEnabled
    public String color;
    @AuraEnabled
    public Stirng background;
    @AuraEnabled
    public Decimal rank;
  }
}
