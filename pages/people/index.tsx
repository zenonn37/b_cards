import React from 'react'
import {gql} from '@apollo/client'
import client from '../../apollo'

type Props = {}

const READ_PEOPLE = gql`

    query GetCards{
        getCards{
            id
            name
        }
    }


`
const {Card} = client.readQuery({
    query: READ_PEOPLE,

        
})

function People({}: Props) {

   console.log(Card);
   
  return (
    <div>People</div>
  )
}

export default People