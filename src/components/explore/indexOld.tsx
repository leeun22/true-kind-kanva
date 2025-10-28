'use client'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, useScroll, useTransform } from 'motion/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, FreeMode } from 'swiper/modules'
import { motionTextVariants } from '@/utils/animations'
import ArrowIcon from '@/assets/arrow-icon'
import CartIcon from '@/assets/cart-icon'
import styles from './explore.module.css'
import './explore-swiper.css'

export default function ExploreOld() {
  const ref = useRef(null)
  const [isGrabbing, setIsGrabbing] = useState(false)
  const [isViewSliderTransform, setIsViewSliderTransform] = useState(true)
  const createTransformY = (y: number) => `translate(0px, ${y}%)`

  const isInViewSection = useInView(ref, {
    once: true,
    margin: '-50px 0px -50px 0px'
  })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.2', 'end 0.2']
  })

  const exploreBannerTransform = useTransform(scrollYProgress, [0, 8], [createTransformY(-15), createTransformY(100)])

  // Effect để kích hoạt transform khi scroll vào viewport
  useEffect(() => {
    if (!isInViewSection) return

    setIsViewSliderTransform(true)

    const timer = setTimeout(() => {
      setIsViewSliderTransform(false)
    }, 450) // sau 0.45s hiệu ứng mới xuất hiện

    return () => clearTimeout(timer)
  }, [isInViewSection])

  // Hàm xử lý khi bắt đầu grab
  const handleTouchStart = () => {
    setIsGrabbing(true)
  }

  // Hàm xử lý khi kết thúc grab
  const handleTouchEnd = () => {
    setIsGrabbing(false)
  }

  // Tính toán transform style
  const getSlideTransform = () => {
    if (isGrabbing) {
      return 'rotate(3deg) scale(0.9, 0.9)'
    }
    if (isViewSliderTransform) {
      return 'rotate(-3deg) scale(1.05, 1.05) translate(120px, -20px)'
    }
    return 'rotate(0deg) scale(1) translate(0px, 0px)'
  }

  const getSlideTransition = () => {
    if (isGrabbing) return 'transform 0.2s ease-in-out'
    if (!isViewSliderTransform) return 'transform 1s ease-in-out'
    return 'transform 0.2s ease-in-out'
  }

  return (
    <section ref={ref} id="explore" className="explore__section block mt-[102px]">
      <motion.div
        className="explore__title block m-auto mb-[88px]"
        variants={motionTextVariants.staggerContainer}
        initial="hidden"
        animate={isInViewSection ? 'visible' : 'hidden'}
        transition={{ duration: 1.2, ease: 'linear' }}
      >
        <h2 className="masking-text block font-figtree text-center text-[5.8rem] font-[500] leading-[52px] -tracking-[1px] h-[58px] overflow-hidden">
          <motion.span className="word inline-block will-change-transform" variants={motionTextVariants.fadeInUp}>
            EXPLORE
          </motion.span>
        </h2>

        <h2 className="masking-text block font-sentient text-center text-[7.6rem] italic font-[400] leading-[50px] -tracking-[5px] h-[76px] overflow-hidden">
          <motion.span className="word inline-block will-change-transform" variants={motionTextVariants.fadeInUp}>
            pure potency
          </motion.span>
        </h2>
      </motion.div>

      {/* Parallax Image */}
      <div
        className={`${styles.halfGrid} flex flex-row items-center justify-between w-full min-h-[832px] h-[120vh] overflow-hidden`}
      >
        <div className="half__grid-img parallax w-1/2 h-full overflow-hidden">
          <motion.div
            className="parallax-image relative w-full h-[110%] object-cover user-select-none"
            style={{
              transform: exploreBannerTransform,
              transition: 'transform 0.5s ease-out'
            }}
          >
            <Image
              className="block w-full h-full object-cover object-center"
              src="/explore-parallax-1.jpg"
              alt="Product Highlight"
              decoding="async"
              draggable="false"
              sizes="(max-width: 640px) 320px, (max-width: 768px) 640px, (max-width: 1024px) 768px, (max-width: 1280px) 1024px, (max-width: 1536px) 1280px, 1536px"
              width={768}
              height={841}
            />
          </motion.div>
        </div>

        {/* Slider Content */}
        <div className="half__grid-content flex flex-col justify-between w-1/2 h-full max-h-[665px] px-[calc(4%+9.6px)] overflow-hidden">
          <div className="half__grid-text flex items-end justify-between">
            <motion.div
              className="half__grid-title block w-full max-w-[256px]"
              variants={motionTextVariants.staggerContainer}
              initial="hidden"
              animate={isInViewSection ? 'visible' : 'hidden'}
              transition={{ duration: 1.2, ease: 'linear' }}
            >
              <h3 className="masking-text block font-figtree text-start text-[5.21rem] font-[500] leading-[1] tracking-[0] min-h-[52.8px] overflow-hidden">
                <motion.span
                  className="word inline-block will-change-transform"
                  variants={motionTextVariants.fadeInUp}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  Pure
                </motion.span>
              </h3>

              <h3 className="masking-text block font-sentient text-start text-[5.21rem] italic font-[400] leading-[1] -tracking-[3.5px] min-h-[52.8px] overflow-hidden">
                <motion.span
                  className="word inline-block will-change-transform"
                  variants={motionTextVariants.fadeInUp}
                  transition={{ duration: 0.3, delay: 0.7 }}
                >
                  Brilliance
                </motion.span>
              </h3>
            </motion.div>

            <Link
              href="/products"
              className={`${styles.sliderArrow} relative flex flex-row items-center justify-center text-white bg-[#3b3b3b] rounded-full w-[51px] h-[51px] hover:scale-[1.1] overflow-hidden`}
              style={{ transition: 'transform 1s ease, opacity .3s ease' }}
              aria-label="Products"
              data-clone="true"
            >
              <ArrowIcon
                className={`${styles.iconArrow} ${styles.iconArrowFirst} min-w-[12px] min-h-[12px] origin-center`}
              />
              <ArrowIcon
                className={`${styles.iconArrow} ${styles.iconArrowSecond} min-w-[12px] min-h-[12px] origin-center absolute top-1/2 left-1/2`}
              />
            </Link>
          </div>

          <div className="half__grid-product-slider flex items-center w-full h-full">
            <Swiper
              id="explore-swiper"
              slidesPerView={2}
              spaceBetween={20}
              freeMode={true}
              grabCursor={true}
              pagination={{
                clickable: true
              }}
              modules={[FreeMode, Pagination]}
              className="exploreSwiperClass"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onSliderMove={handleTouchStart}
              onTransitionEnd={handleTouchEnd}
            >
              {[1, 2, 3, 4].map((product, index) => (
                <SwiperSlide
                  key={index}
                  className="explore-swiper-slide"
                  style={{
                    backgroundColor: 'rgb(241, 204, 207)',
                    width: '305.5px',
                    translate: 'none',
                    rotate: 'none',
                    scale: 'none',
                    opacity: 1,
                    transform: getSlideTransform(),
                    transition: getSlideTransition(),
                    marginRight: 15
                  }}
                >
                  <Link
                    href={`/products/`}
                    className="product__card group flex flex-col justify-between relative h-auto p-[18px_12px] user-select-none"
                    aria-label="Product Name"
                  >
                    <div className="product__card-head relative flex justify-between items-center z-[3]">
                      <p className="product__card-category inline-block px-[24px] pt-[10px] pb-[7px] bg-white text-[#3b3b3b] text-[1rem] leading-[1] uppercase font-figtree font-[400] rounded-[64px]">
                        Pure Brilliance
                      </p>

                      <div className="product__card-quickcart flex items-center justify-center bg-white rounded-full w-[26px] h-[26px]">
                        <CartIcon className="icon-cart w-[10px] h-[13px] text-[#3b3b3b]" />
                      </div>
                    </div>

                    <div className="product__content relative">
                      <div
                        className="media-img n-a product__card-img relative block w-full h-[345px] max-h-[45vh] mx-auto -mt-[6px] mb-[12px] z-[1] group:hover:invisible"
                        style={{ transition: 'opacity 0.3s ease' }}
                      >
                        <Image
                          className="w-full h-full object-contain object-center"
                          alt="Product Name"
                          src="/product-images/product-image-1.jpg"
                          decoding="async"
                          draggable="false"
                          sizes="(max-width: 640px) 320px, (max-width: 768px) 640px, (max-width: 1024px) 768px, (max-width: 1280px) 1024px, (max-width: 1536px) 1280px, 1536px"
                          width={335}
                          height={375}
                        />
                      </div>

                      {/* Product card image 2 */}
                      <div
                        className="media-img n-a product__card-img absolute top-0 left-0 block w-full h-[345px] max-h-[45vh] mx-auto mt-[0] mb-[12px] group-hover:z-[2] group-hover:visible"
                        style={{ transition: 'opacity 0.3s ease' }}
                      >
                        <Image
                          className="w-full h-full object-contain object-center"
                          alt="Product Name"
                          src="/product-images/product-image-1.1.jpg"
                          decoding="async"
                          draggable="false"
                          sizes="(max-width: 640px) 320px, (max-width: 768px) 640px, (max-width: 1024px) 768px, (max-width: 1280px) 1024px, (max-width: 1536px) 1280px, 1536px"
                          width={335}
                          height={375}
                        />
                      </div>

                      <div className="product__card-foot flex items-end justify-between z-[2]">
                        <h3 className="product__card-title max-w-[70%] font-figtree text-[1.28rem] font-[400] tracking-[0] leading-[1.2] text-[#3b3b3b] uppercase">
                          AHA Brightening Exfoliant Cleanser/Face Wash
                        </h3>

                        <p className="product-price font-figtree text-[1.28rem] font-[400] tracking-[0] leading-[1.2] text-[#3b3b3b] whitespace-normal text-right">
                          F ₹899
                        </p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <p className="text-uppercase max-w-[295px] w-full uppercase font-figtree text-[1.28rem] font-[400] tracking-[0] leading-[1.2] text-[#3b3b3b]">
            Stay glowing and healthy without having to think about it.
          </p>
        </div>
      </div>
    </section>
  )
}
