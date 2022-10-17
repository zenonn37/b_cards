import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
 <main className='flex justify-center w-full min-h-screen bg-gray-50 items-center'>
  <div className='h-96 w-1/2 bg-white flex justify-center items-center'>
  <div className=' bg-gray-900 text-white text-lg font-semibold rounded-md
   hover:bg-gray-800 px-6 py-3'>
  <Link href='/add'>
      <a>Add Card</a>
    </Link>
  </div>
  <div className=' bg-gray-900 text-white text-3xl font-semibold 
  rounded-md px-6 py-3
   hover:bg-gray-800 ml-4'>
  <Link href='/search'>
      <a>Find People</a>
    </Link>
  </div>
   

  </div>
 
 </main>
  )
}

export default Home
