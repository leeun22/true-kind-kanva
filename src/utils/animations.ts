// utils/ (Utilities)	Chứa các hàm thuần (pure functions), tiện ích nhỏ, không có side effects, không gọi API hay tương tác DB. (xây dựng query string).

import { Variants } from 'motion'

export const motionTextVariants: Record<string, Variants> = {
  // Tạo hiệu ứng xuất hiện tuần tự cho các phần tử con với container là cha, và điều khiển thời gian và thứ tự animation của các phần tử con qua transition.
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  },

  fadeInUp: {
    hidden: {
      y: 10,
      opacity: 0,
      filter: 'blur(8px)'
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)'
    }
  },

  scaleInLine: {
    hidden: {
      y: 10,
      opacity: 0,
      filter: 'blur(8px)',
      scaleX: 0,
      transformOrigin: '0% 0%'
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      scaleX: 1,
      transformOrigin: '0% 100%'
    }
  }
}
