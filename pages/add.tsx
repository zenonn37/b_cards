import React from 'react'
import { useForm } from "react-hook-form"
import { gql,useMutation } from "@apollo/client";
import { useRouter } from 'next/router';

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



const ADD_CARD = gql`

  mutation AddCard($input: CardInput!) {
    addCard(input: $input) {
    name
    phone
    email
    bio
  }
    
  }

`
  
const Add = (props: Props) => {

  const router =  useRouter()



  
    const [addCard, {data,loading,error}] = useMutation(ADD_CARD,{
      update: (cache, { data }) => {
        console.log(cache, data);
        const { getCards } = cache.readQuery({
          query: GET_CARDS
        });

        console.log(getCards);

        
        

        cache.writeQuery({
          query: GET_CARDS,
          data:{
            getCards:[
              data.addCard,
              ...getCards
            ]

          }
       
        })
        console.log(cache, data);
        
      }
    })
    const {register, handleSubmit, watch, formState: {errors} } =  useForm();

    if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;
  
   

     const onSubmit = (values:any) => {
        console.log(values);
        console.log('test');
        
        addCard({
            variables:{
                input:values
            }
        })

      router.push('/cards')

        console.log(data);
        
        
     }

     console.log(watch("example"));
     


  return (
    <div className='flex justify-center items-center h-full w-full mt-32'>
        <div className=' w-1/2 bg-white flex justify-center items-center rounded-full'>

            <div className=''>
            <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
              <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
          <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input className=' bg-slate-100 mb-3'  {...register("name")} />
      {errors.name && <span>This field is required</span>}
      
      {/* include validation with required or other standard HTML validation rules */}
      <input  className=' bg-slate-100 mb-3' {...register("email", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

        {/* include validation with required or other standard HTML validation rules */}
        <input  className=' bg-slate-100 mb-3' {...register("phone", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.phone && <span>This field is required</span>}


        {/* include validation with required or other standard HTML validation rules */}
        <input  className=' bg-slate-100 mb-3' {...register("bio", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.bio && <span>This field is required</span>}
      
      <input className=' bg-blue-600 text-white py-3 px-6' type="submit" />
    </form>
          </div>
        </div>
      </div>
            </div>
        </div>
    </div>
  )
}

export default Add