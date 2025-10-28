'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import styles from './ingredient.module.css'
import IngredientCard from './IngredientCard'
import { initialIngredients } from '@/constants/initialIngredients'
import { motionTextVariants } from '@/utils/animations'

export default function Ingredient() {
  const ref = useRef(null)
  const createTransformY = (y: number) => `translate3d(0px, ${y}%, 0px)`

  // useInView: Chỉ trigger animation khi component vào viewport
  const isInView = useInView(ref, {
    once: true,
    margin: '-50px 0px -50px 0px'
  })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.2', 'end 0.2']
  })

  // Tạo tất cả transforms từ 1 scrollYProgress: Biến đổi transform một MotionValue thành MotionValue khác: useTransform(input, inputRange, outputRange) -> Framer Motion sẽ map giá trị scroll trong khoảng inputRange. VD: Khi scrollYProgress = 0 thì transform = createLeafTransform(110), khi scrollYProgress = 1 thì transform = createLeafTransform(-110)
  const leafTransform = useTransform(scrollYProgress, [-1, 1], [createTransformY(110), createTransformY(-93)])

  const empressTransform = useTransform(scrollYProgress, [-1, 1], [createTransformY(110), createTransformY(40)])

  const avatarTransform = useTransform(scrollYProgress, [0, 8], [createTransformY(-22), createTransformY(50)])

  const card1Transform = useTransform(scrollYProgress, [-1, 1], [createTransformY(66), createTransformY(-23)])

  const card2Transform = useTransform(scrollYProgress, [-1, 1], [createTransformY(44), createTransformY(-37)])

  const card3Transform = useTransform(scrollYProgress, [-1, 1], [createTransformY(88), createTransformY(0)])

  const card4Transform = useTransform(scrollYProgress, [-1, 1], [createTransformY(66), createTransformY(-6)])

  // Object chứa tất cả transforms để dễ dàng truy cập theo index
  const transforms = {
    card1: card1Transform,
    card2: card2Transform,
    card3: card3Transform,
    card4: card4Transform
  }

  return (
    <section ref={ref} id="ingredients" className="section block relative my-[115px]">
      <div className="container relative max-w-[1400px] flex flex-col w-full m-auto px-[calc(8px*.5)]">
        <div className="ingredients__text relative mb-[102px]">
          <motion.div
            className="ingredients__title relative"
            variants={motionTextVariants.staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ duration: 1.2, ease: 'linear' }}
          >
            <h2 className="masking-text block font-figtree text-start text-[5.6rem] font-[500] leading-[1.1] -tracking-[.5px] overflow-hidden">
              <motion.span className="word inline-block will-change-transform" variants={motionTextVariants.fadeInUp}>
                CLEAN,
              </motion.span>{' '}
              <motion.span className="word inline-block will-change-transform" variants={motionTextVariants.fadeInUp}>
                CONSIOUS,
              </motion.span>
            </h2>

            <h2 className="masking-text block text-start font-figtree text-[5.6rem] font-[500] leading-[1.1] -tracking-[.5px] overflow-hidden">
              <motion.span className="word inline-block will-change-transform" variants={motionTextVariants.fadeInUp}>
                PERFORMANCE
              </motion.span>
            </h2>

            <div className="masking-text absolute left-[24%] top-[128px] min-w-[295px] min-h-[88px] overflow-hidden">
              <div className="relative inline-block">
                <motion.h2
                  className="font-sentient font-[400] text-[8rem] italic leading-[1.1] -tracking-[5px] will-change-transform"
                  variants={motionTextVariants.fadeInUp}
                  transition={{ duration: 0.3, ease: 'linear' }}
                >
                  skincare.
                </motion.h2>
                <motion.div
                  className="absolute top-[88%] left-0 h-[3px] bg-[#3b3b3b] w-full will-change-transform"
                  variants={motionTextVariants.scaleInLine}
                  transition={{ duration: 0.2, ease: 'linear', delay: 1 }}
                />
              </div>
            </div>
          </motion.div>

          <p className="ingredients__desc font-figtree text-[1.28rem] mt-[20px] max-w-[295px] w-full">
            Unreservedly honest products that truly work, be kind to skin and the planet - no exceptions!
          </p>
        </div>

        <div className="ingredients__wrapper relative">
          {/* Leaf with parallax */}
          <motion.div
            className="media-img absolute right-[5%] top-[20%] w-[217px] -translate-x-[50%] -translate-y-[50%]"
            style={{
              transform: leafTransform,
              transition: 'transform 0.5s ease-out'
            }}
          >
            <Image
              src="/ingredients/ingredients-leaf.png"
              alt="Leaf"
              decoding="async"
              draggable="false"
              width={217}
              height={212}
              sizes="(max-width: 640px) 320px, (max-width: 768px) 640px, (max-width: 1024px) 768px, (max-width: 1280px) 1024px, (max-width: 1536px) 1280px, 1536px"
            />
          </motion.div>

          {/* Empress with parallax */}
          <motion.div
            className="media-img absolute bottom-[7%] left-[25%] w-[217px] -translate-x-[50%] -translate-y-[50%]"
            style={{
              transform: empressTransform,
              transition: 'transform 0.5s ease-out'
            }}
          >
            <Image
              className="w-auto h-auto"
              src="/ingredients/ingredients-empress.png"
              alt="Empress"
              decoding="async"
              draggable="false"
              width={217}
              height={212}
              sizes="(max-width: 640px) 320px, (max-width: 768px) 640px, (max-width: 1024px) 768px, (max-width: 1280px) 1024px, (max-width: 1536px) 1280px, 1536px"
            />
          </motion.div>

          {/* Avatar with parallax */}
          <div
            className={`${styles.ingredientsMaskImgWrapper} ingredients__image-wrapper flex absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[70%] h-[100%] -z-[1]`}
          >
            <motion.div
              className={`w-[100%] h-[120%] object-cover pointer-events-none user-select-none`}
              style={{
                transform: avatarTransform,
                transition: 'transform 0.5s ease-out'
              }}
            >
              <Image
                className="block w-full h-full object-cover object-center"
                src="/ingredients/ingredients-avatar.jpg"
                alt="Avatar"
                decoding="async"
                draggable="false"
                width={975}
                height={965}
                sizes="(max-width: 640px) 320px, (max-width: 768px) 640px, (max-width: 1024px) 768px, (max-width: 1280px) 1024px, (max-width: 1536px) 1280px, 1536px"
              />
            </motion.div>
          </div>

          {/* Cards with parallax */}
          <div className="ingredients__firstrow flex items-start">
            {initialIngredients.slice(0, 2).map((card, cardIndex) => {
              const globalIndex = cardIndex
              const cardKey = `card${globalIndex + 1}` as keyof typeof transforms
              return (
                <motion.div
                  key={cardIndex}
                  style={{
                    transform: transforms[cardKey],
                    transition: 'transform 0.5s ease-out'
                  }}
                >
                  <IngredientCard {...card} />
                </motion.div>
              )
            })}
          </div>

          <div className="ingredients__secondrow flex items-start justify-end -mt-[10%]">
            {initialIngredients.slice(2, 4).map((card, cardIndex) => {
              const globalIndex = cardIndex + 2
              const cardKey = `card${globalIndex + 1}` as keyof typeof transforms
              return (
                <motion.div
                  key={cardIndex + 2}
                  style={{
                    transform: transforms[cardKey],
                    transition: 'transform 0.5s ease-out'
                  }}
                >
                  <IngredientCard {...card} />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
