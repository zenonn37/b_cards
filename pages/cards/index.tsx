import React from 'react'
import { gql,useQuery,useMutation } from "@apollo/client";
import Link from 'next/link';

type Props = {}


const GET_CARDS = gql`
 query GetCards{
    getCards {
    id
    name
    email
    phone
    bio
  }
 }
`
const DELETE_CARD = gql`
 mutation DeleteCard($id: Int!){
  deleteCard(id: $id){
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
    const [deleteCard,{}] = useMutation(DELETE_CARD,{
     
      onError: (error) => alert(error.message),
      update:(cache,{ data }) => {
        console.log(cache,data);

        const { getCards } = cache.readQuery({
          query: GET_CARDS
        });

        cache.writeQuery({
          query: GET_CARDS,
          data:{
           getCards: getCards.filter(card => card.id !== data.deleteCard.id)
          }
        })
      }
      // refetchQueries:[
      //   {
      //     query: GET_CARDS
      //   }
      // ]
      // update:(cache, {data}) =>{
      //   const cacheId = cache.identify(data.name)
      //   cache.modify({
      //     fields:{
      //       name:(existingFieldData,{toReference})
      //     }
      //   })

      // }
 
    })
  
    if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
    console.log(data.getCards);

    // function onDelete(id:Int) {
    //   console.log(id);
      
    // }

    const onDelete = (id:String) => {
          
        deleteCard({
          variables:{
            id:Number(id)
          }
        })
      
           console.log(id);
           
    }
    
    return (
    <div className=' mt-5 px-10 bg-slate-400 w-1/2 rounded'>
      
        {data.getCards.map((card:any) =>(
            <div className=' p-2 cursor-pointer'  key={card.id}>
           <Link href={'/cards/' +  card.id} key={card.id}>{card.name}</Link> 
           <div onClick={() => onDelete(card.id)} className='text-center bg-red-600 py-3 px-3 w-1/3 rounded
            text-white hover:bg-red-300'
         
            >Delete</div>
           </div>
        ))}
       
    </div>
  )
}






