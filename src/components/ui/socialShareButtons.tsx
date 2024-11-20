'use client';

import { InstagramIcon, GithubIcon } from 'next-share';

export default function SocialShareButtons() {
  return (
    <div className="flex gap-2">
      <a href="https://www.instagram.com/packy_ticorporate/">
        <InstagramIcon size="5rem" round={true} />
      </a>
      <a href="https://github.com/jamktiko/PACKY">
        <GithubIcon size="5rem" round={true} />
      </a>
    </div>
  );
}
