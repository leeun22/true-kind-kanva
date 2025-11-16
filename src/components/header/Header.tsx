'use client'

import Link from 'next/link'
import clsx from 'clsx'
import { toast } from 'sonner'
import CartIcon from '@/assets/cart-icon'
import Logo from '@/assets/logo'
import SearchIcon from '@/assets/search-icon'
import { initialMenu } from '@/constants/initialMenu'
import { useScrollHeader } from '@/hooks/useScrollHeader'
import { selectCartState, setCartOpen } from '@/redux/features/products/cartSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import styles from './header.module.css'
import NavbarMenuSocial from './NavbarMenuSocial'
import { useCallback, useState } from 'react'
import { useIsTablet } from '@/hooks/useIsTablet'
import { useScrollLock } from '@/hooks/useScrollLock'
import InfoIcon from '@/assets/info-icon'
import CloseButton from '../ui/CloseButton'

interface HeaderProps {
  isStylesHome?: boolean
}

export default function Header({ isStylesHome }: HeaderProps) {
  const dispatch = useAppDispatch()

  // Get the number of items
  const { itemCount } = useAppSelector(selectCartState)

  const { isScrolled, isHidden } = useScrollHeader()

  // Open cart popup
  const handleOpenCart = () => {
    dispatch(setCartOpen(true))
  }

  // Declare state to track menu state (default is closed/false)
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  // Get screen tablet status
  const isTablet = useIsTablet()
  const shouldLockScroll = isOpenMenu && isTablet
  useScrollLock({ isLocked: shouldLockScroll })

  // Function to handle when clicking on the mobile menu toggle button
  const handleToggleMenu = useCallback(() => {
    setIsOpenMenu(!isOpenMenu)
  }, [isOpenMenu])

  const handleSearch = () => {
    toast.info('Coming Soon', {
      className: 'toast__coming-soon font-figtree text-[1.4rem] text-[#fff]',
      position: 'top-center',
      icon: <InfoIcon className="w-[16px] h-[16px]" />,
      style: {
        background: '#000000e6',
        color: '#fff',
        borderColor: '#929292'
      },
      duration: 1500,
      cancel: (
        <CloseButton className="text-white ml-auto" iconWidth={16} iconHeight={16} onClose={() => toast.dismiss()} />
      )
    })
  }

  return (
    <header
      id="header"
      className={clsx(
        styles.header,
        'fixed top-0 left-0 w-full select-none z-[999]',
        isScrolled && styles.headerScrolled,
        isHidden && styles.headerHidden
      )}
      data-state={isScrolled}
    >
      <div className="header__container max-w-container">
        <nav className={`navbar relative flex items-center justify-between py-[15px]`}>
          <button
            className={`navbarHamburger block w-[35px] h-[32px] min-[769px]:hidden max-[769px]:order-1 cursor-pointer relative z-[2]`}
            aria-controls="navbar-menu-toggle"
            aria-expanded={isOpenMenu}
            onClick={handleToggleMenu}
          >
            <div
              className={`${styles.navbarHamburgerLine} ${styles.navbarHamburgerLine2} w-[35px] h-[2px] ${isStylesHome ? (isScrolled || isOpenMenu ? 'bg-[#333]' : 'bg-white') : 'bg-[#333]'}`}
              style={{
                transform: isOpenMenu ? 'translateY(0) scaleX(.8) rotate(40deg)' : 'none',
                marginBottom: isOpenMenu ? '0px' : '5px'
              }}
            />
            <div
              className={`${styles.navbarHamburgerLine} ${styles.navbarHamburgerLine2} w-[35px] h-[2px] ${isStylesHome ? (isScrolled || isOpenMenu ? 'bg-[#333]' : 'bg-white') : 'bg-[#333]'}`}
              style={{
                transform: isOpenMenu ? 'translateY(-2px) scaleX(.8) rotate(-40deg)' : 'none'
              }}
            />
          </button>

          <Link
            className="navbar-logo flex z-[2] max-[769px]:order-2 max-[769px]:w-[90px]"
            href="/"
            aria-current="page"
            aria-label="Truekindkanva"
            onClick={() => setIsOpenMenu(false)}
          >
            <Logo
              className={`w-full max-w-[102px] h-auto min-w-[12px] min-h-[12px] ${
                isStylesHome ? (isScrolled || isOpenMenu ? 'text-[#2F2F2F]' : 'text-white') : 'text-[#2F2F2F]'
              }`}
            />
          </Link>

          <div className={`${styles.navbarMenu} flex justify-between`}>
            <ul className={`${styles.navbarMenuList} flex flex-row items-stretch gap-[38px] max-w-container`}>
              {initialMenu.map((item) => (
                <li key={item.handle} className="navbar-menu-list-item">
                  <Link
                    href={item.handle}
                    className={`${
                      styles.navbarMenuListItemLink
                    } relative font-figtree font-[500] text-[2.4rem] min-[769px]:text-[1rem] tracking-[0.2px] w-fit ${isStylesHome ? (isScrolled || isOpenMenu ? 'text-[#3b3b3b]' : 'text-white') : 'text-[#3b3b3b]'}`}
                    data-style={isStylesHome ? (isScrolled ? 'true' : 'false') : 'true'}
                    aria-label={item.label}
                    onClick={() => setIsOpenMenu(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              <li className="navbar-menu-list-item block min-[769px]:hidden">
                <Link
                  href="#login"
                  className={`${styles.navbarMenuListItemLink} relative font-figtree text-[2.4rem] min-[769px]:text-[1rem] font-[500] tracking-[0.2px] text-[#3b3b3b]  w-fit`}
                  data-style={isStylesHome ? (isScrolled ? 'true' : 'false') : 'true'}
                  aria-label="Sign Up/Login"
                  onClick={() => setIsOpenMenu(false)}
                >
                  Sign Up/Login
                </Link>
              </li>

              <NavbarMenuSocial />
            </ul>
          </div>

          <div
            className={`navbar-cta rounded-[64px] px-[24px] py-[12px] z-[2] max-[769px]:order-3 max-[769px]:bg-transparent max-[769px]:p-[5px] ${
              isStylesHome ? (isScrolled ? 'bg-[#3b3b3b]' : 'bg-white') : 'bg-[#3b3b3b]'
            }`}
          >
            <ul className="navbar-cta-list flex items-stretch gap-[6px]">
              <li className="navbar-cta-list-item group flex items-center m-0 max-[769px]:hidden">
                <button
                  id="search-nav"
                  className="navbar-cta-list-item-btn-search cursor-pointer group-hover:scale-[1.05] duration-300 transition-transform"
                  aria-label="Search"
                  onClick={handleSearch}
                >
                  <SearchIcon
                    className={`block min-w-[18px] min-h-[18px] ${isStylesHome ? (isScrolled ? 'text-white' : 'text-[#3b3b3b]') : 'text-white'}`}
                  />
                </button>
              </li>

              <div
                className={`border-vertical block w-[1px] mx-[10px] h-auto opacity-50 max-[769px]:hidden ${isStylesHome ? (isScrolled ? 'bg-white' : 'bg-[#3b3b3b]') : 'bg-white'}`}
              />

              <li className="navbar-cta-list-item group flex items-center m-0">
                <button
                  id="cart-nav"
                  className="navbar-cta-list-item-btn-cart relative cursor-pointer group-hover:scale-[1.05] duration-300 transition-transform"
                  aria-label="Cart"
                  onClick={handleOpenCart}
                >
                  <CartIcon
                    className={`block min-w-[14px] min-h-[14px] ${isStylesHome ? (isScrolled || isOpenMenu ? 'text-white max-[769px]:text-[#3b3b3b]' : 'text-[#3b3b3b] max-[769px]:text-white') : 'text-white max-[769px]:text-[#3b3b3b]'}`}
                  />
                  {itemCount > 0 && (
                    <span
                      className={`absolute -top-[1px] -right-[3px] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center -mt-1 -mr-1 z-40 ${isStylesHome ? (isScrolled || isOpenMenu ? 'bg-white text-[#333] max-[769px]:bg-[#333] max-[769px]:text-white' : 'bg-[#333] text-white max-[769px]:bg-[#333]') : 'bg-white text-[#333] max-[769px]:bg-[#333] max-[769px]:text-white'}`}
                    >
                      {itemCount}
                    </span>
                  )}
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  )
}
