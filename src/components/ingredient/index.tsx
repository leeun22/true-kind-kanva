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

  // useInView: Only trigger animation when component enters viewport
  const isInView = useInView(ref, {
    once: true,
    margin: '-50px 0px -50px 0px'
  })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.2', 'end 0.2']
  })

  // Create all transforms from 1 scrollYProgress: Transform one MotionValue to another MotionValue
  const leafTransform = useTransform(scrollYProgress, [-1, 1], [createTransformY(110), createTransformY(-93)])

  const empressTransform = useTransform(scrollYProgress, [-1, 1], [createTransformY(110), createTransformY(40)])

  const avatarTransform = useTransform(scrollYProgress, [0, 8], [createTransformY(-22), createTransformY(50)])

  const card1Transform = useTransform(scrollYProgress, [-1, 1], [createTransformY(66), createTransformY(-23)])

  const card2Transform = useTransform(scrollYProgress, [-1, 1], [createTransformY(44), createTransformY(-37)])

  const card3Transform = useTransform(scrollYProgress, [-1, 1], [createTransformY(88), createTransformY(0)])

  const card4Transform = useTransform(scrollYProgress, [-1, 1], [createTransformY(66), createTransformY(-6)])

  // Object contains all transforms for easy access by index
  const transforms = {
    card1: card1Transform,
    card2: card2Transform,
    card3: card3Transform,
    card4: card4Transform
  }

  return (
    <section
      ref={ref}
      id="ingredients"
      className="section block relative md:my-[115px] min-[490px]:my-[80px] my-[62px]"
    >
      <div className="container relative flex flex-col w-full max-w-full">
        <div className="ingredients__text relative md:mb-[102px] mb-[16px] max-w-container">
          <motion.div
            className="ingredients__title relative"
            variants={motionTextVariants.staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ duration: 1.2, ease: 'linear' }}
          >
            <h2 className="masking-text block font-figtree text-start text-fluid8xl font-[600] leading-[1.1] -tracking-[.5px] overflow-hidden">
              <motion.span className="word inline-block will-change-transform" variants={motionTextVariants.fadeInUp}>
                CLEAN,
              </motion.span>{' '}
              <motion.span className="word inline-block will-change-transform" variants={motionTextVariants.fadeInUp}>
                CONSIOUS,
              </motion.span>
            </h2>

            <h2 className="masking-text block text-start font-figtree text-fluid8xl font-[600] leading-[1.1] -tracking-[.5px] overflow-hidden">
              <motion.span className="word inline-block will-change-transform" variants={motionTextVariants.fadeInUp}>
                PERFORMANCE
              </motion.span>
            </h2>

            <div className="masking-text md:absolute relative lg:left-[24%] md:left-[32%] left-0 xl:top-[128px] lg:top-[115px] md:top-[90px] top-0 min-w-[295px] xl:min-h-[88px] overflow-hidden">
              <div className="relative inline-block">
                <motion.h2
                  className="font-sentient text-fluid6xl italic leading-[1.1] -tracking-[5px] will-change-transform"
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

          <p className="ingredients__desc font-figtree md:text-fluid3lg text-[1.4rem] xl:mt-[20px] md:ml-0 ml-auto mt-[14px] xl:max-w-[295px] md:max-w-[196px] max-w-[200px] w-full">
            Unreservedly honest products that truly work, be kind to skin and the planet - no exceptions!
          </p>
        </div>

        <div className="ingredients__wrapper relative md:max-w-container">
          {/* Leaf with parallax */}
          <motion.div
            className="media-img absolute right-[5%] top-[20%] xl:w-[217px] w-[145px] -translate-x-[50%] -translate-y-[50%] max-md:hidden"
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
            className="media-img absolute bottom-[7%] left-[25%] xl:w-[217px] w-[145px]  -translate-x-[50%] -translate-y-[50%] max-md:hidden"
            style={{
              transform: empressTransform,
              transition: 'transform 0.5s ease-out'
            }}
          >
            <Image
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
            className={`${styles.ingredientsMaskImgWrapper} ingredients__image-wrapper flex md:absolute relative md:top-[50%] left-[50%] -translate-x-[50%] md:-translate-y-[50%] sm:w-[70%] w-full md:h-[100%] sm:h-[70dvh] h-[75dvh] max-[480px]:h-[55dvh] md:-z-[1]`}
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
          <div className="ingredients__first-row flex items-start max-[768px]:py-[12px]">
            {initialIngredients.slice(0, 2).map((card, cardIndex) => {
              const globalIndex = cardIndex
              const cardKey = `card${globalIndex + 1}` as keyof typeof transforms
              return (
                <motion.div
                  key={cardIndex}
                  className={`${styles.ingredientsFirstCol} max-[768px]:flex-1`}
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

          <div className="ingredients__second-row flex items-start justify-end md:-mt-[10%] max-[768px]:py-[12px]">
            {initialIngredients.slice(2, 4).map((card, cardIndex) => {
              const globalIndex = cardIndex + 2
              const cardKey = `card${globalIndex + 1}` as keyof typeof transforms
              return (
                <motion.div
                  key={cardIndex + 2}
                  className={`${styles.ingredientsFirstCol} max-[768px]:flex-1`}
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
