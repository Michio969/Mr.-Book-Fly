import { Helmet } from 'react-helmet-async'

export default function SEO({ title, description, keywords, canonical }) {
  const fullTitle = `${title} | MrBookAndFly`
  const baseUrl = 'https://mrbookandfly.shop'
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={`${baseUrl}${canonical}`} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${baseUrl}${canonical}`} />
      
      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}
