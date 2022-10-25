import React from 'react'
import { gql,useQuery } from "@apollo/client";
import Link from 'next/link';

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

export default function Cards({}: Props) {
    const { loading, error, data } = useQuery(GET_CARDS)
  
    if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
    console.log(data.getCards);
    
    return (
    <div>
      
        {data.getCards.map((card:any) =>(
            <div className=' p-2 cursor-pointer'>
           <Link href={'/cards/' +  card.id} key={card.id}>{card.name}</Link> 
           </div>
        ))}
       
    </div>
  )
}






