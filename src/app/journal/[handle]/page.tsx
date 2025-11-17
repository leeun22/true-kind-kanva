export async function generateStaticParams() {
  const handles = ['collections', 'product-name', 'product-handle']
  return handles.map((handle) => ({
    handle: handle
  }))
}

export default function JournalHandlePage() {
  return <h1>Hello, Journal Handle Page!</h1>
}
