import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient,InMemoryCache,gql,ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

function MyApp({ Component, pageProps }: AppProps) {
  return(
   <ApolloProvider client={client}>
    <Component {...pageProps} />
    </ApolloProvider>
  ) 
}

export default MyApp
