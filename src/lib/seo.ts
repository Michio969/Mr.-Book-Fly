import { useEffect } from "react"

const SITE_URL = "https://mrbookandfly.shop"
const DEFAULT_OG_IMAGE = `${SITE_URL}/upi-qr.png`

interface SEOOptions {
  /** Page title. "Mr. Book & Fly" is appended automatically unless `noSuffix` is set. */
  title: string
  /** Meta description (~150-160 chars is ideal). */
  description: string
  /** Path relative to the site root, e.g. "/hotel-booking". Defaults to "/". */
  path?: string
  /** Comma-separated keywords for this specific page (optional). */
  keywords?: string
  /** Override the Open Graph/Twitter image URL. */
  image?: string
  /** Skip appending the default site suffix to the title. */
  noSuffix?: boolean
  /** Set to true for private/user-specific pages that shouldn't be indexed. */
  noindex?: boolean
}

function setMetaByName(name: string, content: string) {
  let el = document.head.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute("name", name)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
}

function setMetaByProperty(property: string, content: string) {
  let el = document.head.querySelector(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute("property", property)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
}

function setCanonical(href: string) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement("link")
    el.setAttribute("rel", "canonical")
    document.head.appendChild(el)
  }
  el.setAttribute("href", href)
}

/**
 * Updates document title, meta description/keywords, canonical link, and
 * Open Graph/Twitter tags for the current route. Since this is a client-rendered
 * SPA, these updates are primarily read by crawlers that execute JS (e.g. Googlebot).
 * Social previews (WhatsApp, Facebook, Twitter) will still fall back to the
 * static tags in index.html since they don't run JavaScript.
 */
export function useSEO({ title, description, path = "/", keywords, image, noSuffix, noindex }: SEOOptions) {
  useEffect(() => {
    const fullTitle = noSuffix ? title : `${title} | Mr. Book & Fly`
    const url = `${SITE_URL}${path === "/" ? "" : path}`
    const ogImage = image ?? DEFAULT_OG_IMAGE

    document.title = fullTitle

    setMetaByName("description", description)
    if (keywords) setMetaByName("keywords", keywords)
    setMetaByName("robots", noindex ? "noindex, nofollow" : "index, follow")

    setCanonical(url)

    setMetaByProperty("og:title", fullTitle)
    setMetaByProperty("og:description", description)
    setMetaByProperty("og:url", url)
    setMetaByProperty("og:image", ogImage)

    setMetaByName("twitter:title", fullTitle)
    setMetaByName("twitter:description", description)
    setMetaByName("twitter:image", ogImage)

    // Reset robots meta to the sitewide default when this page unmounts,
    // so a noindex page doesn't leak into the next page's tags.
    return () => {
      setMetaByName("robots", "index, follow")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, keywords, image, noSuffix, noindex])
}
