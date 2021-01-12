/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNewsletter = /* GraphQL */ `
  query GetNewsletter($id: ID!) {
    getNewsletter(id: $id) {
      id
      email
      first_name
      last_name
      createdAt
      updatedAt
    }
  }
`;
export const listNewsletters = /* GraphQL */ `
  query ListNewsletters(
    $filter: ModelNewsletterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNewsletters(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        first_name
        last_name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUnsubscribe = /* GraphQL */ `
  query GetUnsubscribe($id: ID!) {
    getUnsubscribe(id: $id) {
      id
      email
      first_name
      last_name
      createdAt
      updatedAt
    }
  }
`;
export const listUnsubscribes = /* GraphQL */ `
  query ListUnsubscribes(
    $filter: ModelUnsubscribeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUnsubscribes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        first_name
        last_name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getResubscribe = /* GraphQL */ `
  query GetResubscribe($id: ID!) {
    getResubscribe(id: $id) {
      id
      email
      first_name
      last_name
      createdAt
      updatedAt
    }
  }
`;
export const listResubscribes = /* GraphQL */ `
  query ListResubscribes(
    $filter: ModelResubscribeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResubscribes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        first_name
        last_name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
