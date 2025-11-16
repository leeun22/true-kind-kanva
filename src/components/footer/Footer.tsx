import Link from 'next/link'
import { CreditsButton } from './CreditsButton'
import { DisclaimerButton } from './DisclaimerButton'
import Subscribe from './Subscribe'
import Logo from '@/assets/logo'
import styles from './footer.module.css'
import BannerParallaxFooter from './BannerParallaxFooter'

interface FooterContent {
  title: string
  links: {
    name: string
    href: string
    target?: string | undefined
    rel?: string | undefined
  }[]
}

export default function Footer() {
  const footer: FooterContent[] = [
    {
      title: 'Explore',
      links: [
        { name: 'Shop', href: '/products' },
        { name: 'About', href: '/#about' },
        { name: 'Journal', href: '/#journal' },
        { name: 'Sign Up/Login', href: '/#signup' }
      ]
    },
    {
      title: 'Follow Us',
      links: [
        {
          name: 'Instagram',
          href: 'https://www.instagram.com/truekind.skin/',
          target: '_blank',
          rel: 'noopener noreferrer'
        },
        {
          name: 'Facebook',
          href: 'https://www.facebook.com/truekind.skin/',
          target: '_blank',
          rel: 'noopener noreferrer'
        }
      ]
    }
  ]

  return (
    <footer id="footer" className="footer__section block sm:mt-[100px] mt-[80px] pb-[51px]">
      <BannerParallaxFooter />

      <div className="footer__container max-w-container">
        <div className="footer__content-wrapper flex min-[769px]:flex-row flex-col py-[50px] max-[769px]:-mt-[30%]">
          <div className="footer__content-col-wrapper min-[769px]:w-[42%] max-w-full flex-[0] basis-auto min-[769px]:order-1 order-2">
            <div className="footer__content-row flex flex-wrap gap-[25px]">
              {footer.map((item, index) => (
                <div key={index} className="footer__content-col flex-1">
                  <p className="subtitle font-figtree text-[1.02rem] text-[#a0a0a0] leading-[1.1] mb-[14px] uppercase">
                    {item.title}
                  </p>

                  <ul className="flex flex-col w-full gap-[12px]">
                    {item.links.map((link, index) => (
                      <li key={index} className="font-figtree text-[1.4rem] text-[#3b3b3b] leading-[1.1]">
                        <Link
                          className={`${styles.footerLink} relative w-fit cursor-pointer`}
                          href={link.href}
                          target={link.target}
                          rel={link.rel}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="footer__contact-col flex-1">
                <p className="subtitle font-figtree text-[1.02rem] text-[#a0a0a0] mb-[14px] uppercase">Contact Us</p>

                <ul className="flex flex-col w-full gap-[12px]">
                  <li className="font-figtree text-[1.4rem] text-[#3b3b3b] leading-[1.1]">
                    <span className="link relative w-fit">lenhung22.it@gmail.com</span>
                  </li>
                  <li className="font-figtree text-[1.4rem] text-[#3b3b3b] leading-[1.1]">
                    <span className="link relative w-fit">1111-2222-3333</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <Subscribe />
        </div>

        <div className="footer__copyright">
          <Logo className="w-full max-w-[102px] h-auto" />

          <p className="footer__copyright-description text-figtree text-[1.02rem] text-[#a0a0a0] leading-[1.2] my-[14px_25px] max-w-[190px]">
            Clean, Conscious, Clinical Skincare! Honest products that truly work
          </p>

          <div className="footer__copyright-wrapper flex flex-wrap gap-[12px] justify-between items-center">
            <p className="footer__copyright-right font-figtree text-[1.02rem] text-[#3b3b3b] leading-[1.1]">
              © 2025 TrueKind, All Rights Reserved
            </p>

            <ul className="footer__copyright-links flex justify-center items-center gap-[25px] font-figtree text-[1.02rem] text-[#a0a0a0] leading-[1.1]">
              <li>
                <DisclaimerButton label="Disclaimer" />
              </li>
              <li>
                <CreditsButton label="Credits" />
              </li>
              <li>
                <p className="name">
                  Developed By:{' '}
                  <Link
                    className="!underline cursor-pointer"
                    href="https://github.com/leeun22"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    leeun
                  </Link>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
