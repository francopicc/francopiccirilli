"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ArrowUp, ArrowDown, Command } from "lucide-react"

type SearchItem = {
  id: string
  name: string
  section: string
}

type SpotlightSearchProps = {
  items: SearchItem[]
  onSelect: (item: SearchItem) => void
  onClose: () => void
  isDarkMode?: boolean
}

export default function SpotlightSearch({ 
  items, 
  onSelect, 
  onClose, 
  isDarkMode = true 
}: SpotlightSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredItems, setFilteredItems] = useState<SearchItem[]>(items)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    // Focus the input when the component mounts
    if (inputRef.current) {
      inputRef.current.focus()
    }

    // Handle click outside to close
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      const container = document.getElementById("spotlight-container")
      if (container && !container.contains(target)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  useEffect(() => {
    if (searchQuery) {
      const filtered = items.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
      setFilteredItems(filtered)
      setSelectedIndex(0)
    } else {
      setFilteredItems(items)
    }
  }, [searchQuery, items])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
    } else if (e.key === "Enter" && filteredItems.length > 0) {
      onSelect(filteredItems[selectedIndex])
    } else if (e.key === "Escape") {
      onClose()
    }
  }

  useEffect(() => {
    // Scroll selected item into view
    const selectedElement = document.getElementById(`search-item-${selectedIndex}`)
    if (selectedElement && listRef.current) {
      selectedElement.scrollIntoView({ block: "nearest" })
    }
  }, [selectedIndex])

  const bgColor = isDarkMode ? "bg-[#1C1C1E]" : "bg-[#F5F5F7]"
  const textColor = isDarkMode ? "text-white" : "text-[#1D1D1F]"
  const borderColor = isDarkMode ? "border-[#2C2C2E]" : "border-[#D2D2D7]"
  const secondaryTextColor = isDarkMode ? "text-[#86868B]" : "text-[#6E6E73]"
  const highlightColor = isDarkMode ? "bg-white" : "bg-[#E8E8ED]"
  const highlightTextColor = isDarkMode ? "text-black" : "text-black"
  const highlightSecondaryColor = isDarkMode ? "text-black/70" : "text-black/70"
  const hoverColor = isDarkMode ? "bg-[#2C2C2E]" : "bg-[#E8E8ED]"

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          id="spotlight-container"
          className={`${bgColor} rounded-xl shadow-2xl w-full max-w-md overflow-hidden border ${borderColor}`}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
        >
          <div className={`flex items-center p-4 border-b ${borderColor}`}>
            <Search className={`w-5 h-5 ${secondaryTextColor} mr-3`} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              className={`bg-transparent w-full outline-none ${textColor}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className={`flex items-center space-x-2 text-xs ${secondaryTextColor}`}>
              <kbd className={`flex items-center justify-center h-6 w-6 rounded ${isDarkMode ? "bg-[#2C2C2E]" : "bg-[#E8E8ED]"} text-xs font-medium`}>
                <Command size={12} />
              </kbd>
              <span>+</span>
              <kbd className={`px-2 py-1 rounded ${isDarkMode ? "bg-[#2C2C2E]" : "bg-[#E8E8ED]"} text-xs font-medium`}>P</kbd>
            </div>
          </div>

          <ul 
            ref={listRef} 
            className="max-h-72 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
          >
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <motion.li
                  key={item.id}
                  id={`search-item-${index}`}
                  className={`mx-2 px-3 py-2 cursor-pointer rounded-lg transition-colors duration-150 ${
                    index === selectedIndex 
                      ? highlightColor
                      : `hover:${hoverColor}`
                  }`}
                  onClick={() => onSelect(item)}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15, delay: index * 0.03 }}
                >
                  <div className="flex items-center justify-between">
                    <span className={index === selectedIndex ? highlightTextColor : textColor}>
                      {item.name}
                    </span>
                    <span className={index === selectedIndex ? highlightSecondaryColor : secondaryTextColor}>
                      {item.section}
                    </span>
                  </div>
                </motion.li>
              ))
            ) : (
              <li className={`px-4 py-2 ${secondaryTextColor} text-center`}>No results found</li>
            )}
          </ul>

          <div className={`flex justify-between px-4 py-2 text-xs ${secondaryTextColor} border-t ${borderColor}`}>
            <div className="flex items-center space-x-2">
              <div className="flex">
                <ArrowUp className="w-3 h-3 mr-1" />
                <ArrowDown className="w-3 h-3" />
              </div>
              <span>to navigate</span>
            </div>
            <div>
              <span>ESC to close</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}