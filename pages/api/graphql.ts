import { ApolloServer,gql } from "apollo-server-micro";
import Cors from 'micro-cors';


const cors = Cors()

const typeDefs = gql`
  type Card{
    id:Int!
    name:String!
    email:String!
    phone:String!
    bio:String!
  }

  type Query {
    getCards: [Card]
  }


`;




const resolvers = {
  Query:{
    sayHello(_parent, _args, _context){
      return 'Hello World';
    }
  }
}

export const config = {
  api:{
    bodyParser: false
  }
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
})

const startServer = apolloServer.start()


export default cors(async function handler(req,res) {
    if (req.method === 'OPTIONS') {
        res.end();
        return false;
    }
    await startServer;

    await apolloServer.createHandler({
        path:'/api/graphql'
    })(req,res)
    
});

// const handler = apolloServer.createHandler({
//   path: "/api/graphql"
// })

