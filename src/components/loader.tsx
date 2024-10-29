import { BounceLoader } from 'react-spinners';
import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <motion.div
      initial={{ rotate: 0, scale: 0 }}
      animate={{ rotate: 360, scale: 1 }}
      transition={{ duration: 0.5 }}
      className='w-full h-screen min-h-96 absolute top-0 flex items-center justify-center'
    >
      <BounceLoader size={200} color='#36d7b7' className='my-auto' />
      <p className='absolute font-bold'>Loading...</p>
    </motion.div>
  );
}
