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
    employerId: Int
  }

  type Company{
    id:Int!
    name: String!
    employees:[Card]
    createdAt: String
    updatedAt: String

  }


  input CardInput{
    name:String!
    email:String!
    phone:String!
    bio:String!
    employerId: Int
  }

  input CardUpdate{
    name:String
    email:String
    phone:String
    bio:String
  }

  type Query {

    companies: [Company]
    getCards: [Card]
    getCard(id:Int!):Card
    getCompanys:[Company]
    getCompany(id:Int!):Company
  }

  type Mutation{
    addCard(input: CardInput!): Card
    deleteCard(id: Int!): Card
    updateCard(id:Int!,input: CardUpdate!): Card
  }


`;




const resolvers = {


  Query:{

    companies:async () => {
    
      return await prisma.company.findMany({
        take:10
      })
      
      
    },
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
  getCompanys:async () => {
    return await prisma.company.findMany({
      take:10
    })
  },

    },
    Company:{
      employees: async (parent:any) => {
        console.log(parent.id);
        const emp =  await prisma.card.findMany({
          where:{
            employerId: parent.id
          }
        })
        console.log(emp);
        
        return emp
      }
  
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

