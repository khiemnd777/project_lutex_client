import { gql, useMutation, useQuery } from '@apollo/client';
import {
  RegisterNewSubscriptionGraphResult,
  ResubscriptionGraphResult,
  SubscriptionGraphResult,
  UnsubscriptionGraphResult,
} from './subscription-types';

export const RegisterNewSubscription = () =>
  useMutation<RegisterNewSubscriptionGraphResult>(gql`
    mutation registerNewSubscriber($email: String!) {
      createSubscriber(input: { data: { Email: $email } }) {
        subscriber {
          id
          Email
        }
      }
    }
  `);

export const Unsubscription = () =>
  useMutation<UnsubscriptionGraphResult>(gql`
    mutation unsubcription($id: ID!) {
      updateSubscriber(input: { where: { id: $id }, data: { published_at: null } }) {
        subscriber {
          id
          Email
        }
      }
    }
  `);

export const Resubscription = () =>
  useMutation<ResubscriptionGraphResult>(gql`
    mutation unsubcription($id: ID!, $publishedAt: DateTime) {
      updateSubscriber(input: { where: { id: $id }, data: { published_at: $publishedAt } }) {
        subscriber {
          id
          Email
        }
      }
    }
  `);

export const GraphSubscription = (email: string) =>
  useQuery<SubscriptionGraphResult>(
    gql`
      query getSubscription($email: String) {
        subscribers(where: { Email: $email, _publicationState: "preview" }) {
          id
          Email
        }
      }
    `,
    {
      variables: {
        email,
      },
    }
  );
