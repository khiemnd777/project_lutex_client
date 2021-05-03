import { gql, useMutation, useQuery } from '@apollo/client';
import {
  RegisterNewSubscriptionGraphResult,
  ResubscriptionGraphResult,
  SubscriptionGraphResult,
  UnsubscriptionGraphResult,
} from './subscription-types';

const subscriberProps = `
  id
  Email
  published_at
`;

const subscriberObj = `
  subscriber {
    ${subscriberProps}
  }
`;

export const RegisterNewSubscription = () =>
  useMutation<RegisterNewSubscriptionGraphResult>(gql`
    mutation registerNewSubscriber($email: String!) {
      createSubscriber(input: { data: { Email: $email } }) {
        ${subscriberObj}
      }
    }
  `);

export const Unsubscription = () =>
  useMutation<UnsubscriptionGraphResult>(gql`
    mutation unsubcription($id: ID!) {
      updateSubscriber(input: { where: { id: $id }, data: { published_at: null } }) {
        ${subscriberObj}
      }
    }
  `);

export const Resubscription = () =>
  useMutation<ResubscriptionGraphResult>(gql`
    mutation resubcription($id: ID!, $publishedAt: DateTime) {
      updateSubscriber(input: { where: { id: $id }, data: { published_at: $publishedAt } }) {
        ${subscriberObj}
      }
    }
  `);

export const GraphSubscription = (email: string) =>
  useQuery<SubscriptionGraphResult>(
    gql`
      query getSubscription_noCache($email: String) {
        subscribers(where: { Email: $email, _publicationState: "preview" }) {
          ${subscriberProps}
        }
      }
    `,
    {
      variables: {
        email,
      },
      fetchPolicy: 'no-cache',
    }
  );
