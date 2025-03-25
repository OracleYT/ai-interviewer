import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <h2 className='text-4xl'>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" className='underline text-black'>Return Home</Link>
    </div>
  )
}