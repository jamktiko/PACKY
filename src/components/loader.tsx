import { BounceLoader } from 'react-spinners';
export default function Loader() {
  return (
    <div className='w-full h-screen min-h-96 absolute top-0 flex items-center justify-center'>
      <BounceLoader size={200} color='#36d7b7' className='my-auto' />
      <p className='absolute font-bold'>Loading...</p>
    </div>
  );
}
