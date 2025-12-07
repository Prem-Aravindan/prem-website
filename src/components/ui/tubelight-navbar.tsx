"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon?: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function TubelightNavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)

  // Track which section is in view
  useEffect(() => {
    const sectionIds = items.map(item => item.url.replace('#', ''))
    
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Trigger when section is in middle of viewport
      threshold: 0
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          const matchingItem = items.find(item => item.url === `#${sectionId}`)
          if (matchingItem) {
            setActiveTab(matchingItem.name)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sectionIds.forEach(id => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [items])

  const handleNavClick = (itemName: string, url: string) => {
    setActiveTab(itemName)
    const targetId = url.replace('#', '')
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div
      className={cn(
        "fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-2 sm:pt-4 w-full px-2 sm:px-0 sm:w-auto",
        className,
      )}
    >
      <div className="flex items-center justify-center gap-0.5 sm:gap-1 bg-white/5 border border-white/20 backdrop-blur-xl py-1 sm:py-1.5 px-1 sm:px-1.5 rounded-full shadow-2xl overflow-x-auto scrollbar-hide max-w-full">
        {items.map((item) => {
          const isActive = activeTab === item.name

          return (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.name, item.url)}
              className={cn(
                "relative cursor-pointer text-[10px] sm:text-xs font-medium px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-full transition-all duration-300 whitespace-nowrap flex-shrink-0",
                isActive
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-300",
              )}
            >
              {item.name}
              {isActive && (
                <motion.div
                  layoutId="tubelight"
                  className="absolute inset-0 w-full bg-gradient-to-r from-white/10 to-white/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 40,
                  }}
                >
                  {/* Tubelight glow effect */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 sm:w-8 h-0.5 sm:h-1 bg-white rounded-t-full shadow-lg shadow-white/40">
                    <div className="absolute w-8 sm:w-12 h-4 sm:h-6 bg-white/30 rounded-full blur-lg -top-2 sm:-top-2.5 -left-1 sm:-left-2" />
                    <div className="absolute w-6 sm:w-10 h-3 sm:h-5 bg-white/40 rounded-full blur-md -top-1 sm:-top-1.5 left-0" />
                    <div className="absolute w-3 sm:w-5 h-2 sm:h-3 bg-white/50 rounded-full blur-sm top-0 left-1 sm:left-1.5" />
                  </div>
                </motion.div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

