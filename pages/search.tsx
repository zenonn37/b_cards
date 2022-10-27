import React from 'react'
import { gql,useQuery } from "@apollo/client";

type Props = {}


const GET_CARDS = gql`
 query GetCard{
    getCards {
    id
    name
    email
    phone
    bio
  }
 }
`

export default function search({}: Props) {
    const { loading, error, data } = useQuery(GET_CARDS)
  
    if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
    console.log(data.getCards);
    
    return (
    <div>
        <ul>
        {data.getCards.map((card:any) =>(
           <li key={card.id}>{card.name}</li> 
        ))}
        </ul>
    </div>
  )
}





