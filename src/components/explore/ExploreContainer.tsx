'use client'

import { useRef } from 'react'
import { useInView } from 'motion/react'
import ExploreContent from './ExploreContent'
import { ExploreStyleProvider } from './ExploreStyleContext'
import ExploreTitle from './ExploreTitle'
import { ExploreCategoryType } from '@/types/explore'

export default function ExploreContainer({ exploreData }: { exploreData: ExploreCategoryType[] }) {
  const refSection = useRef(null)

  const isInViewSection = useInView(refSection, {
    once: true,
    margin: '-50px 0px -50px 0px'
  })

  return (
    <ExploreStyleProvider>
      <section ref={refSection} id="explore" className="explore__section block mt-[102px]">
        <ExploreTitle isInViewSection={isInViewSection} />

        {exploreData.map((exploreItem, index) => (
          <ExploreContent key={exploreItem.id} index={index} exploreItem={exploreItem} />
        ))}
      </section>
    </ExploreStyleProvider>
  )
}
