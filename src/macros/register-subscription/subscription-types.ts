import { SubscriberType } from '_stdio/shared/types/subscriber-types';

export type RegisterNewSubscriptionGraphResult = {
  createSubscriber: {
    subscriber: SubscriberType;
  };
};

export type UnsubscriptionGraphResult = {
  updateSubscriber: {
    subscriber: SubscriberType;
  };
};

export type ResubscriptionGraphResult = {
  updateSubscriber: {
    subscriber: SubscriberType;
  };
};

export type SubscriptionGraphResult = {
  subscribers: SubscriberType[];
};
