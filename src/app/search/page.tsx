import type { Metadata } from 'next'
import ProductCard from '@/components/products/ProductCard'
import { getSearchResults } from '@/lib/data'

/**
 * Set robots: { index: false } to prevent search engines from indexing spam pages
 * to avoid diluting the SEO of the main product pages
 * (since the content is mainly a list of results).
 */
export const metadata: Metadata = {
  title: `Search "${query}"`,
  description: `Kết quả tìm kiếm cho từ khóa "${query}" trên website Tên Thương Hiệu.`,
  robots: {
    index: false,
    follow: true,
    nocache: true
  }
}

export default async function SearchResultsPage({ searchParams }) {
  const query = searchParams.q || ''

  if (!query) {
    return <h1>Vui lòng nhập từ khóa tìm kiếm.</h1>
  }

  const results = await getSearchResults(query)

  return (
    <div>
      <h1>Kết quả tìm kiếm cho: "{query}"</h1>
      {results.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {results.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      ) : (
        <p>Không tìm thấy kết quả nào khớp với "{query}".</p>
      )}
    </div>
  )
}
