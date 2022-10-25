import React from 'react'
import {useRouter} from 'next/router'
import { gql,useQuery } from "@apollo/client";

type Props = {
    
}

const GET_CARD = gql`
    query GetCards($getCardId:Int!){
        getCard(id: $getCardId) {
        name
        email
        phone
        bio
  }
}
   


`



function Details({ }: Props) {
    const router = useRouter()
   const id = router.query.id

   const { loading, error, data } = useQuery(GET_CARD,{
    variables:{
        "getCardId":Number(id)
    }
   })
  
   if (loading) return 'Loading...';
 if (error) return `Error! ${error.message}`;
    console.log(data);
    
  return (
    <div>Detail{id}</div>
  )
}

export default Details