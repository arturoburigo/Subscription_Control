export interface EditSubscriptionRequest {
  name: string;
  price: number;
  renewal_dayOf_Month: number;
  subscription_id: string;
  user_id: string;
}
