import { useEffect } from 'react'

interface SEOProps {
  title: string
  description: string
  keywords?: string
  image?: string
}

function setMeta(name: string, content: string, useProperty = false) {
  const attr = useProperty ? 'property' : 'name'
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.content = content
}

export default function SEO({ title, description, keywords, image }: SEOProps) {
  const fullTitle = `${title} | Hamlet Global — Luxury Gemstones & Fine Jewellery`

  useEffect(() => {
    document.title = fullTitle
    setMeta('description', description)
    if (keywords) setMeta('keywords', keywords)
    setMeta('og:title', fullTitle, true)
    setMeta('og:description', description, true)
    setMeta('og:type', 'website', true)
    setMeta('og:site_name', 'Hamlet Global', true)
    if (image) setMeta('og:image', image, true)
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)

    return () => {
      document.title = 'Hamlet Global | Luxury Gemstones & Fine Jewellery'
    }
  }, [fullTitle, description, keywords, image])

  return null
}
