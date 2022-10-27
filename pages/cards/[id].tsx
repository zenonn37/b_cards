import React from 'react'
import {useRouter} from 'next/router'
import { gql,useQuery,useMutation } from "@apollo/client";
import { useForm } from "react-hook-form"

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

const DELETE_CARD = gql`
 mutation DeleteCard($id: Int!){
  deleteCard(id: $deleteCardId){
    id
    name
  }
 }
`

const UPDATE_CARD = gql`

  mutation UpdateCard($id:Int!,$input: CardUpdate!) {
    updateCard(id:$id,input: $input) {
    name
    phone
    email
    bio
  }
    
  }

`



function Details({ }: Props) {
    const router = useRouter()
    const {register, handleSubmit, watch, formState: {errors} } =  useForm();
   const id = router.query.id

   const [updateCard] = useMutation(UPDATE_CARD)
   const [deleteCard] = useMutation(DELETE_CARD)

   const { loading, error, data } = useQuery(GET_CARD,{
    variables:{
        "getCardId":Number(id)
    }
   })
  
   if (loading) return 'Loading...';
 if (error) return `Error! ${error.message}`;
    console.log(data);
    
    const {name,email,phone,bio} = data.getCard

    const onSubmit = (values:any) => {
        console.log(values);
        console.log('test');
        
        updateCard({
            variables:{
                id:Number(id),
                input:values
            }
        })

        console.log(data);
        
        
     }
  return (
    <div className=' flex justify-center items-center'>
      
      
      <div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <div>
      <input defaultValue={name} className=' bg-slate-100 mb-3'  {...register("name")} />
      {errors.name && <span>This field is required</span>}
      </div>
      <div>
      {/* include validation with required or other standard HTML validation rules */}
      <input defaultValue={email} className=' bg-slate-100 mb-3' {...register("email", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}
      </div>
      <div>
        {/* include validation with required or other standard HTML validation rules */}
        <input defaultValue={phone}  className=' bg-slate-100 mb-3' {...register("phone", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.phone && <span>This field is required</span>}
      </div>
       <div>
        {/* include validation with required or other standard HTML validation rules */}
        <input  defaultValue={bio}  className=' bg-slate-100 mb-3' {...register("bio", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.bio && <span>This field is required</span>}
      </div>
      <input className=' bg-blue-600 text-white py-3 px-6' type="submit" />
    </form>
        </div>
      </div>
     
    </div>
  )
}

export default Details