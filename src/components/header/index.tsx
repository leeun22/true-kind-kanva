'use client'

import Link from 'next/link'
import CartIcon from '@/assets/cart-icon'
import Logo from '@/assets/logo'
import SearchIcon from '@/assets/search-icon'
import { initialMenu } from '@/constants/initialMenu'
import { useScrollHeader } from '@/hooks/useScrollHeader'
import styles from './header.module.css'

interface HeaderProps {
  isHomePage?: boolean
}

export default function Header({ isHomePage }: HeaderProps) {
  const { isScrolled, isHidden } = useScrollHeader()

  // Create dynamic className based on scroll state
  const headerClassName = `
    ${styles.header} fixed top-0 left-0 w-full select-none z-[999] 
    ${isScrolled ? styles.headerScrolled : ''}
    ${isHidden ? styles.headerHidden : ''}
  `
    // Remove whitespace at the beginning, end, and between the segments created by the template literal when using.
    .trim()
    .replace(/\s+/g, ' ')

  return (
    <header id="header" className={headerClassName}>
      <div className="container w-full max-w-[1400px] m-auto px-[calc(8px*5)]">
        <nav className="navbar relative flex items-center justify-between py-[12px]">
          {/* Toggle icon menu mobile */}
          {/* <ToggleMenu /> */}

          <Link className="flex" href="/" aria-current="page" aria-label="Truekindkanva">
            <Logo
              className={`w-full max-w-[102px] h-auto min-w-[12px] min-h-[12px] ${
                isHomePage ? (isScrolled ? 'text-[#2F2F2F]' : 'text-white') : 'text-[#2F2F2F]'
              }`}
            />
          </Link>

          <div className="navbar-menu flex">
            <ul className="navbar-menu-list flex items-stretch gap-[38px]">
              {initialMenu.map((item) => (
                <li key={item.handle} className="navbar-menu-list-item">
                  <Link
                    href={item.handle}
                    className={`${
                      styles.navbarMenuListItemLink
                    } relative font-figtree text-[10px] font-[600] tracking-[0.2px] ${
                      isHomePage ? (isScrolled ? 'text-[#3b3b3b]' : 'text-white') : 'text-[#2F2F2F]'
                    } w-fit`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              {/* Menu mobile */}
              {/* <MenuMobile/> */}
            </ul>
          </div>

          <div
            className={`navbar-cta rounded-[64px] px-[24px] py-[12px] ${
              isHomePage ? (isScrolled ? 'bg-[#333]' : 'bg-white') : 'bg-[#3b3b3b]'
            }`}
          >
            <ul className="navbar-cta-list flex items-stretch gap-[6px]">
              <li className="navbar-cta-list-item group flex items-center m-0">
                <button
                  id="search-nav"
                  className="navbar-cta-list-item-btn-search cursor-pointer group-hover:scale-[1.05] duration-300 transition-transform"
                  aria-label="Search"
                >
                  <SearchIcon
                    className={`block min-w-[18px] min-h-[18px] ${
                      isHomePage ? (isScrolled ? 'text-white' : 'text-[#3b3b3b]') : 'text-white'
                    }`}
                  />
                </button>
              </li>

              <div
                className={`border-vertical block w-[1px] mx-[10px] h-auto opacity-50 ${
                  isHomePage ? (isScrolled ? 'bg-white opacity-50' : 'bg-[#3b3b3b]') : 'bg-white opacity-50'
                }`}
              />

              <li className="navbar-cta-list-item group flex items-center m-0">
                <button
                  id="cart-nav"
                  className="navbar-cta-list-item-btn-cart cursor-pointer group-hover:scale-[1.05] duration-300 transition-transform"
                  aria-label="Cart"
                >
                  <CartIcon
                    className={`block min-w-[14px] min-h-[14px] ${
                      isHomePage ? (isScrolled ? 'text-white' : 'text-[#3b3b3b]') : 'text-white'
                    }`}
                  />
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  )
}
