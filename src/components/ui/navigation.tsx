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
          <Link href='/stackbuilder'>
            <IoGridOutline className='text-2xl ml-2 mr-4' />
            <span>Stack Builder</span>
          </Link>
        </li>
        <li>
          {' '}
          <Link href='/library'>
            <IoLibraryOutline className='text-2xl ml-2 mr-4' />
            <span>Library</span>
          </Link>
        </li>
        <li>
          {' '}
          <Link href='/compare'>
            <IoGitCompareOutline className='text-2xl ml-2 mr-4' />
            <span>Compare</span>
          </Link>
        </li>
        <li>
          {' '}
          <Link href='/about'>
            <IoHelpCircleOutline className='text-2xl ml-2 mr-4' />
            <span>About</span>
          </Link>
        </li>
        <li>
          {' '}
          <Link href='/contact'>
            <IoMailOutline className='text-2xl ml-2 mr-4' />
            <span>Contact</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
