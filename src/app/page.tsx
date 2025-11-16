import Carousel from '@/components/carousel'
import Connect from '@/components/connect'
import Explore from '@/components/explore'
import Ingredient from '@/components/ingredient'
import Divider from '@/components/ui/Divider'
// import { Spinner } from '@/components/ui/Spinner'
// import { Suspense } from 'react'

export default function Home() {
  return (
    <main>
      <Carousel />

      <Ingredient />

      <Divider />

      {/* <Suspense fallback={<Spinner />}> */}
      <Explore />
      {/* </Suspense> */}

      <Connect />
    </main>
  )
}
