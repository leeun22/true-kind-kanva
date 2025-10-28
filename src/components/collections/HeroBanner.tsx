'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function HeroBanner() {
  return (
    <section id="collection-hero-banner" className="block mb-[100px] overflow-hidden">
      <div className="collection__intro relative pt-[100px] h-[100dvh] bg-[#edeff0]">
        <div className="container relative max-w-[1400px] w-full m-auto px-[calc(8px*.5)]">
          <div className="row relative z-[2]">
            <div className="col flex flex-col gap-0 justify-center items-start w-fit h-min px-[calc(8px*.5)]">
              <h2 className="collection__title font-figtree text-[8.1rem] text-[#3b3b3b] font-[500] leading-[1.1] tracking-[0] uppercase">
                Meet Our
              </h2>

              <h2 className="collection__subtitle-mobile block md:hidden font-sentient text-[10rem] text-[#3b3b3b] font-[400] leading-[1] tracking-[-5px] italic">
                completelineup
              </h2>
            </div>
          </div>
        </div>

        <div className="row-bottom hidden md:flex items-end absolute bottom-[7%] left-0 w-full z-[2] px-[calc(4%+9px)]">
          <div className="col basis-auto w-[67%]">
            <div className="cta max-w-[315px] p-[25px] bg-white rounded-[14px]">
              <h3 className="font-figtree text-[3.5rem] font-[500] leading-[1.1] tracking-[0] text-[#3b3b3b] mb-[18px]">
                Understand Your Routine
              </h3>

              <p className="font-figtree text-[1.3rem] font-[400] text-[#737373] leading-[1.2] opacity-[.65]">
                Skincare is not just about the products you use, but it&apos;s also about how you use those products
                effectively. Head over to clean journal to read more.
              </p>

              <Link
                href="/journal"
                className="btn relative inline-block p-[14px_36px] mt-[75px] text-center w-full bg-[#3b3b3b] text-white cursor-pointer uppercase rounded-[62px]"
              >
                <span className="label font-figtree text-[1.25rem] text-white font-[400] uppercase">Read More</span>
              </Link>
            </div>
          </div>

          <div className="col basis-auto w-[33%]">
            <h1 className="collection__subtitle-desktop hidden md:block m-auto text-center font-sentient text-[8.5rem] text-[#3b3b3b] font-[500] leading-[.95] tracking-[-5px] italic">
              Complete lineup
            </h1>
          </div>
        </div>

        <div className="collection__intro-img flex items-end justify-between w-full h-full absolute bottom-0 left-0 z-[1] overflow-hidden">
          <div
            className="media-img-desktop relative hidden md:block w-full h-full select-none"
            style={{
              transform: 'translate(0%, 0%)'
            }}
          >
            <Image
              className="w-full h-full object-cover object-bottom align-middle"
              src="/collections/shops-banner.jpg"
              alt="Shop Banner"
              decoding="async"
              draggable="false"
              priority
              sizes="(max-width: 640px) 320px, (max-width: 768px) 640px, (max-width: 1024px) 768px, (max-width: 1280px) 1024px, (max-width: 1536px) 1280px, 1536px"
              width={1510}
              height={910}
            />
          </div>

          <div className="media-img-mobile relative block md:hidden w-full h-full select-none">
            <Image
              src="/collections/shops-banner-m.jpg"
              className="w-full h-full object-cover object-bottom align-middle"
              alt="Shop Banner"
              decoding="async"
              draggable="false"
              priority
              sizes="(max-width: 640px) 320px, (max-width: 768px) 640px, (max-width: 1024px) 768px, (max-width: 1280px) 1024px, (max-width: 1536px) 1280px, 1536px"
              width={375}
              height={645}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
