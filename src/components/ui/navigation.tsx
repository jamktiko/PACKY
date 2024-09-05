import {
  IoHome,
  IoGridOutline,
  IoLibraryOutline,
  IoGitCompareOutline,
  IoHelpCircleOutline,
  IoMailOutline,
} from 'react-icons/io5';

import Link from 'next/link';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href='/'>
            {' '}
            <IoHome className='text-2xl ml-2 mr-4' />
            <span>Index</span>
          </Link>
        </li>
        <li>
          {' '}
          <IoGridOutline className='text-2xl ml-2 mr-4' />{' '}
          <span>StackBuilder</span>
        </li>
        <li>
          {' '}
          <IoLibraryOutline className='text-2xl ml-2 mr-4' />{' '}
          <span>Library</span>
        </li>
        <li>
          {' '}
          <IoGitCompareOutline className='text-2xl ml-2 mr-4' />{' '}
          <span>Compare</span>
        </li>
        <li>
          {' '}
          <IoHelpCircleOutline className='text-2xl ml-2 mr-4' />{' '}
          <span>About</span>
        </li>
        <li>
          {' '}
          <IoMailOutline className='text-2xl ml-2 mr-4' /> <span>Contact</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
