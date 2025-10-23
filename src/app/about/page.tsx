import AboutUsPage from '@/src/components/about/about-us'
import BlogFooter from '@/src/components/home/blog-footer'
import Navbar from '@/src/components/home/header/navbar'
import React from 'react'

const page = () => {
  return (
      <div>
          <Navbar />
          <AboutUsPage />
          <BlogFooter />
    </div>
  )
}

export default page