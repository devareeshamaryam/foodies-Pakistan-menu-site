 "use client"

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import GlobalApi from '../_utils/GlobalApi'
import { ArrowRightCircle, ArrowLeftCircle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
 
const CategoryList = () => {
  const scrollRef = useRef(null)
  const [categoryList, setCategoryList] = useState([])
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const params = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  useEffect(() => {
    console.log(params.get('category'))
    setSelectedCategory(params.get('category') || 'all')
  }, [params])
    
  useEffect(() => {
    getCategoryList()
  }, [])

  const getCategoryList = () => {
    GlobalApi.GetCategory().then(resp => {
      console.log(resp.categories)
      setCategoryList(resp.categories)
    })
  }

  const scrollLeft = () => {
    if(scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'   
      })
    }
  }

  const scrollRight = () => {
    if(scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'   
      })
    }
  }

  // Check scroll position to show/hide arrows
  const checkScroll = () => {
    if(scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  return (
    <div className='mt-10 relative'>
      <div className='px-5 md:px-10 mb-6'>
       </div>
      
      <div className='relative group'>
        {/* Left Arrow - Only show when needed */}
        {showLeftArrow && (
          <ArrowLeftCircle 
            className='hidden md:block absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full text-primary h-10 w-10 cursor-pointer shadow-lg hover:scale-110 transition-all opacity-0 group-hover:opacity-100'
            onClick={scrollLeft}
          />
        )}

        {/* Scrollable Container */}
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className='flex gap-5 overflow-x-auto scroll-smooth px-5 md:px-10 pb-4 scrollbar-hide'
        > 
          {categoryList && categoryList.map((category, index) => (
            <Link 
              href={`?category=${category.slug}`}
              key={index} 
              className={`flex-shrink-0 w-[120px] md:w-[150px] flex flex-col bg-slate-50 rounded-lg cursor-pointer transition-all duration-300 border border-slate-200 overflow-hidden hover:scale-105 hover:shadow-xl hover:border-primary ${selectedCategory === category.slug ? 'text-primary border-primary bg-orange-50' : ''}`}
            >
              <div className='relative w-full h-28 md:h-32 bg-white'>
                <Image 
                  src={category.icon?.url} 
                  alt={category.name}
                  fill
                  className='object-cover'
                />
              </div>
              
              <div className='p-3 text-center bg-white'>
                <h2 className='text-xs md:text-sm font-medium line-clamp-2'>{category.name}</h2>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Arrow - Only show when needed */}
        {showRightArrow && (
          <ArrowRightCircle 
            className='hidden md:block absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full text-primary h-10 w-10 cursor-pointer shadow-lg hover:scale-110 transition-all opacity-0 group-hover:opacity-100'
            onClick={scrollRight}
          />
        )}
      </div>
    </div>
  )
}

export default CategoryList