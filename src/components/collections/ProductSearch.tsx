'use client'

import { parseAsInteger, useQueryState } from 'nuqs'

interface ProductFilterProps {
  refetchProducts: () => Promise<void>
}

export default function ProductSearch({ refetchProducts }: ProductFilterProps) {
  const [search, setSearch] = useQueryState('search', { defaultValue: '' })
  const [perPage, setPerPage] = useQueryState('select', parseAsInteger.withDefault(1))

  const handleSearch = (value: string) => {
    setSearch(value)
    setTimeout(() => {
      refetchProducts()
    }, 300)
  }

  const handleSelectChange = (value: string) => {
    setPerPage(Number(value))
    setTimeout(() => {
      refetchProducts()
    }, 300)
  }

  return (
    <div className="flex flex-row gap-2 items-center justify-between">
      <input
        className="w-full border border-solid border-[#d8d8d8]"
        placeholder="Search products..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <button
        onClick={() => {
          setSearch(null)
          setPerPage(1)
        }}
      >
        Clear
      </button>
      <select
        className="w-full max-w-[180px]"
        value={perPage.toString()}
        onChange={(value) => handleSelectChange(value.target.value)}
        // onChangeCapture={(value) => setPerPage(Number(value))}
      >
        <option value="10">All Categories</option>
        <option value="2">Category 1</option>
        <option value="3">Category 2</option>
        <option value="4">Category 3</option>
      </select>
    </div>
  )
}
