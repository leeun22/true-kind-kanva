'use client'

import { useRef } from 'react'
import Divider from '../ui/Divider'
import { SubscribeButton } from './SubscribeButton'
import { useTransformMotion } from '@/hooks/useTransformMotion'
import { motion } from 'motion/react'

export default function Subscribe() {
  const refSubscribe = useRef<HTMLDivElement | null>(null)
  const { transformMotion } = useTransformMotion({
    refTarget: refSubscribe,
    startY: -20,
    endY: 20
  })

  return (
    <motion.div
      ref={refSubscribe}
      className="footer__email-wrapper min-[769px]:w-[42%] w-full max-w-[450px] min-[769px]:max-w-full flex-[0] basis-auto min-[769px]:ml-auto max-[769px]:m-auto -mt-[30%] min-[769px]:order-2 order-1 z-[1] max-[769px]:mb-[100px]"
      style={{
        transform: transformMotion,
        transition: 'transform 0.5s ease-out'
      }}
    >
      <div className="footer__email flex flex-col items-center justify-center w-full text-white bg-[#232323] text-center xl:p-[76px_51px_38px] p-[48px_24px_32px] transition-[padding] duration-200">
        <h5 className="footer__email-title font-figtree text-fluid8xl text-white leading-[.85] xl:mb-[25px] mb-[12.8px] uppercase">
          Hear more <br /> from Us
        </h5>

        <p className="footer__email-desc font-figtree text-[1.3rem] text-[#a0a0a0] leading-[1.2] max-w-[225px]">
          Get the latest news about skincare tips and new products.
        </p>

        <input
          type="email"
          className="w-full min-w-[90px] rounded-[62px] border border-solid border-[#d8d8d8] bg-none text-white font-figtree text-[1.4rem] xl:my-[50px] my-[25px] xl:p-[16px] py-[8px] px-[12px] appearance-none outline-none pointer-events-auto"
          name="contact[email]"
          aria-required="true"
          autoCorrect="off"
          autoCapitalize="off"
          autoComplete="email"
          aria-invalid="true"
          aria-describedby="Newsletter-error--newsletter"
          placeholder="Enter your email"
        />

        <SubscribeButton label="Subscribe" />

        <Divider className="xl:my-[76px_51px] my-[25px_38px]" />

        <p className="footer__email-desc block font-figtree text-[1.02rem] text-[#787878] leading-[1.2] max-w-[225px]">
          No Spam, only quality articles to help you be more radient. You can opt out anytime.
        </p>
      </div>
    </motion.div>
  )
}
