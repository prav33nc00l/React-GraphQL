import gql from 'graphql-tag';

export const FETCH_JOBS_LIST = gql`
  query jobs($type: String!, $slug: String!){
      jobs(input: {type: type, slug: $slug}){
      title
      id
      description
      cities{
        name
      }
      applyUrl
      commitment {
        title
      }
      company {
        name
      }
    }
    cities{
      name
      slug
    }
  }
`

export const CREATE_POST_JOB = gql`
mutation postJob ($title: String!, $commitmentId : ID!, $companyName : String!, $locationNames: String!, $userEmail : String!, $description: String!, $applyUrl: String! ) {
  postJob(input: {title: $title, commitmentId: $commitmentId, companyName: $companyName, locationNames: $locationNames, userEmail: $userEmail, description: $description, applyUrl: $applyUrl }) {
    id
    title
    userEmail
    locationNames
    company {
      name
    }
    applyUrl
  }
}`