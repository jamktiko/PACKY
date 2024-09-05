import {
  IoHome,
  IoGridOutline,
  IoLibraryOutline,
  IoGitCompareOutline,
  IoHelpCircleOutline,
  IoMailOutline,
} from 'react-icons/io5';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <IoHome className='text-2xl ml-2 mr-4' />
          Index
        </li>
        <li>
          {' '}
          <IoGridOutline className='text-2xl ml-2 mr-4' /> StackBuilder
        </li>
        <li>
          {' '}
          <IoLibraryOutline className='text-2xl ml-2 mr-4' /> Library
        </li>
        <li>
          {' '}
          <IoGitCompareOutline className='text-2xl ml-2 mr-4' /> Compare
        </li>
        <li>
          {' '}
          <IoHelpCircleOutline className='text-2xl ml-2 mr-4' /> About
        </li>
        <li>
          {' '}
          <IoMailOutline className='text-2xl ml-2 mr-4' /> Contact
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
