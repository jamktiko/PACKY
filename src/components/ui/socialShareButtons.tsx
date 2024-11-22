'use client';

import { InstagramIcon, GithubIcon } from 'next-share';

export default function SocialShareButtons() {
  return (
    <div className='flex gap-2 absolute left-0 mt-6 w-screen justify-evenly'>
      <a
        className='hover:text-white rounded-full hover:bg-white bg-none'
        href='https://www.instagram.com/packy_ticorporate/'
        target='_blank'
      >
        <InstagramIcon size='5rem' round={true} />
      </a>
      <a
        className='hover:text-white rounded-full hover:bg-white bg-none'
        href='https://github.com/jamktiko/PACKY'
        target='_blank'
      >
        <GithubIcon size='5rem' round={true} />
      </a>
    </div>
  );
}
