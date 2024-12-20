import { IoHome, IoGridOutline, IoHelpCircleOutline } from 'react-icons/io5';

import { motion } from 'framer-motion';

import Link from 'next/link';

interface NavigationProps {
  onLinkClick: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onLinkClick }) => {
  return (
    <motion.nav
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
    >
      <ul>
        <li>
          <Link href="/" onClick={onLinkClick}>
            <IoHome className="text-2xl ml-2 mr-4" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link href="/stackbuilder" onClick={onLinkClick}>
            <IoGridOutline className="text-2xl ml-2 mr-4" />
            <span>Stack Builder</span>
          </Link>
        </li>

        <li>
          <Link href="/about" onClick={onLinkClick}>
            <IoHelpCircleOutline className="text-2xl ml-2 mr-4" />
            <span>About</span>
          </Link>
        </li>
      </ul>
      <p className=" select-none text-sm absolute bottom-0 opacity-40 w-full">
        © 2024 - PACKY | JAMK Ticorporate
      </p>
    </motion.nav>
  );
};

export default Navigation;
