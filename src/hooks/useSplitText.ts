/**
 * Custom hook to split the title into 3 most balanced parts.
 * It treats compound words (word/word or word-word) as a single part and applies balanced splitting logic.
 */

import { useMemo } from 'react'

export const useSplitText = (paragraph: string): string[] => {
  return useMemo(() => {
    // Split string into parts.
    const parts = paragraph.split(/\s+/).filter((part) => part.length > 0)
    const N = parts.length

    if (N < 3) return [paragraph, '', '']

    let splitIndex1: number
    let splitIndex2: number

    if (N === 5) {
      //  Apply special logic (2-1-2) to balance when there are 5 words
      splitIndex1 = 2
      splitIndex2 = 3
    } else {
      // General balanced division logic (approximately N/3)
      splitIndex1 = Math.ceil(N / 3)
      splitIndex2 = Math.ceil((2 * N) / 3)
    }

    // Combine parts into 3 main parts
    const part1 = parts.slice(0, splitIndex1).join(' ')
    const part2 = parts.slice(splitIndex1, splitIndex2).join(' ')
    const part3 = parts.slice(splitIndex2).join(' ')

    return [part1, part2, part3]
  }, [paragraph])
}
