import React from 'react'
import { gql,useMutation } from "@apollo/client";


const DELETE_CARD = gql`
 mutation DeleteCard($id: Int!){
  deleteCard(id: $id){
    id
    name
  }
 }
`

type Props = {
    id:any
}

function DeleteBtn({id}: Props) {

    const [deleteCard,{error,loading}] = useMutation(DELETE_CARD,{
        variables:{id},
        onError: (error) => alert(error.message),
        // refetchQueries:[
        //   {
        //     query: GET_CARDS
        //   }
        // ]
        update(cache,{data}){
          const { cards:any } = cache.readQuery({
            query: GetCards
          });
  
          cache.writeQuery({
            query: GetCards,
            data:{
             cards: cards.filter(card => card.id !== data.deleteCard.id)
            }
          })
        }
      })
  return (
    <div>DeleteBtn</div>
  )
}

export default DeleteBtn