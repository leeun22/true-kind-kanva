import { memo } from 'react'
import { DribbbleIcon } from '@/assets/dribbble-icon'
import { FacebookIcon } from '@/assets/facebook-icon'
import { InstagramIcon } from '@/assets/instagram-icon'

const NavbarMenuSocial = () => {
  return (
    <li className="navbar-menu-social flex min-[769px]:hidden mt-[24px]">
      <ul className="flex flex-wrap gap-[14px] list-none text-[#3b3b3b]">
        <li className="navbar-menu-social-item flex items-center justify-center w-[42px] h-[42px] rounded-full p-[18px] border border-solid border-[#c8c8c8]">
          <a
            href="https://www.instagram.com/truekind.skin/"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
        </li>

        <li className="navbar-menu-social-item flex items-center justify-center w-[42px] h-[42px] rounded-full p-[18px] border border-solid border-[#c8c8c8]">
          <a href="https://dribbble.com/leeun22" rel="noopener noreferrer" target="_blank" aria-label="Dribble">
            <DribbbleIcon />
          </a>
        </li>

        <li className="navbar-menu-social-item flex items-center justify-center w-[42px] h-[42px] rounded-full p-[18px] border border-solid border-[#c8c8c8]">
          <a
            href="https://www.facebook.com/truekind.skin/"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="Facebook"
          >
            <FacebookIcon />
          </a>
        </li>
      </ul>
    </li>
  )
}

export default memo(NavbarMenuSocial)
