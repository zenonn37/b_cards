import { ApolloServer,gql } from "apollo-server-micro";
import Cors from 'micro-cors';
import { PrismaClient } from "@prisma/client"


const cors = Cors()

const prisma = new PrismaClient()

const typeDefs = gql`
  type Card{
    id:Int!
    name:String!
    email:String!
    phone:String!
    bio:String!
  }


  input CardInput{
    name:String!
    email:String!
    phone:String!
    bio:String!
  }

  type Query {
    getCards: [Card]
    getCard(id:Int!):Card
  }

  type Mutation{
    addCard(input: CardInput!): Card
    deleteCard(id: Int!): Card
    updateCard(id:Int!,input: CardInput!): Card
  }


`;




const resolvers = {
  Query:{
  getCards: async () => {
    return await prisma.card.findMany({
      take:10,
    })
  },
  getCard:async (_parent:any, _args:any) => {
    return await prisma.card.findUnique({
      where:{
        id: Number(_args.id)
      }
    })
  },
    },
    Mutation:{
      addCard:async (_parent:any, _args:any) => {

        return await prisma.card.create({
          data: _args.input
        })
     
      },
      deleteCard:async (_parent:any, _args:any) => {
        return await prisma.card.delete({
          where:{
            id: Number(_args.id)
          }
        })
      },
      updateCard:async (_parent:any,_args:any) => {
          return await prisma.card.update({
            where:{id:_args.id},
            data:_args.input
          })
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

