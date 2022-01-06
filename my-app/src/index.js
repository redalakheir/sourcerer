import React from 'react';
import { render } from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
    headers :{
        Authorization :" Bearer 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"

    }
});

client
    .query({
        query: gql`
            query {
                  viewer {
                    login
                    following {
                      totalCount
                    }
                    followers {
                      totalCount
                    }
                  }
        `
    })
  .then(result => console.log(result));

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;



function ExchangeRates() {

  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <p>
        {data.user.repositories.totalCount}
      </p>
    </div>
  );
}


function App() {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
    </div>
  );
}

render(
  <ApolloProvider client={client}>    <App />  </ApolloProvider>,  document.getElementById('root'),
);






