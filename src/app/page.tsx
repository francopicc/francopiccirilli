"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, FileText, Mail, ExternalLink, Search, Moon, Sun } from "lucide-react"
import SpotlightSearch from "@/components/Spotlight"
import Image from "next/image"

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Windows key (Meta) + P
      if ((e.metaKey || e.ctrlKey) && e.key === "p") {
        e.preventDefault()
        setIsSearchOpen(true)
      }

      // Close on Escape
      if (e.key === "Escape") {
        setIsSearchOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const searchItems = [
    { id: "about", name: "About", section: "about" },
    { id: "skills", name: "Skills", section: "skills" },
    { id: "projects", name: "Projects", section: "projects" },
    { id: "education", name: "Education", section: "education" },
    { id: "links", name: "Links", section: "links" },
    { id: "contact", name: "Contact", section: "contact" },
  ]

  const projects = [
    {
      id: "naftas",
      name: "Naftas",
      description: "Fuel prices and statistics in Argentina.",
      icon: "/assets/naftas.svg",
      iconBg: "#0E0E0E",
      link: "https://naftas.vercel.app",
      className: "ml-0.5"
    },
    {
      id: "delta",
      name: "Delta",
      description: "Subscription system for SaaS, with billing and metrics.",
      icon: "/assets/delta.svg",
      iconBg: "#0E0E0E",
      link: "https://francopiccirilli.com.ar",
      className: "invert brightness-0"
    }
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsSearchOpen(false)
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <main className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-[#0A0A0A] text-white" : "bg-[#F5F5F7] text-[#1D1D1F]"} -tracking-[0.5px]`}>
      {isSearchOpen && (
        <SpotlightSearch
          items={searchItems}
          onSelect={(item) => scrollToSection(item.section)}
          onClose={() => setIsSearchOpen(false)}
        />
      )}

      <div className="max-w-2xl mx-auto px-4 py-16 space-y-12">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <h1 className="text-2xl font-medium -mb-2">Franco Piccirilli</h1>
            <p className={`${isDarkMode ? "text-stone-500" : "text-stone-600"} font-medium text-sm`}>Software Engineer & Product Designer</p>
          </motion.div>
          
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full ${isDarkMode ? "bg-[#1C1C1E]" : "bg-[#E8E8ED]"} transition-colors duration-300`}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Quick action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="flex gap-3"
        >
          <a 
            href="/assets/piccirilli_franco_cv.pdf" 
            download 
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${isDarkMode ? "bg-white text-black" : "bg-[#0A0A0A] text-white"} text-sm font-medium transition-transform hover:scale-105`}
          >
            <FileText size={16} />
            Download CV
          </a>
          <a 
            href="https://linkedin.com/in/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${isDarkMode ? "bg-[#1C1C1E] text-white" : "bg-[#E8E8ED] text-[#1D1D1F]"} text-sm font-medium transition-transform hover:scale-105`}
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
          <button 
            onClick={() => setIsSearchOpen(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${isDarkMode ? "bg-[#1C1C1E] text-white" : "bg-[#E8E8ED] text-[#1D1D1F]"} text-sm font-medium transition-transform hover:scale-105`}
          >
            <Search size={16} />
            Search
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
          id="about"
        >
          <h2 className="text-xl font-semibold">About</h2>
          <p className={`${isDarkMode ? "text-stone-300" : "text-stone-700"} leading-relaxed`}>
            Software engineer with a passion for creating elegant, user-centric products that merge technical excellence with thoughtful design. Currently focused on building innovative solutions that solve real-world problems.
          </p>
          <ul className="space-y-2">
            <li className="flex">
              <span className="mr-2">-</span>
              <span>
                Currently living in La Plata, <span className={`${isDarkMode ? "text-stone-500" : "text-stone-600"}`}>Argentina</span>
              </span>
            </li>
            <li className="flex">
              <span className="mr-2">-</span>
              <span>
                Studying at <span className={`${isDarkMode ? "text-stone-500" : "text-stone-600"}`}>Universidad Tecnologica Nacional de La Plata</span>
              </span>
            </li>
            <li className="flex">
              <span className="mr-2">-</span>
              <span>
                Focusing on <span className={`${isDarkMode ? "text-stone-500" : "text-stone-600"}`}>Building Products.</span>
              </span>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
          id="skills"
        >
          <h2 className="text-xl font-semibold">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "UI/UX", "Product Strategy", "RESTful APIs", "Figma", "Adobe Illustrator", "Supabase", "MongoDB", "OAuth", "Git"].map((skill) => (
              <span 
                key={skill} 
                className={`px-3 py-1 text-sm rounded-full ${isDarkMode ? "bg-[#1C1C1E] text-white" : "bg-[#E8E8ED] text-[#1D1D1F]"}`}
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* New Projects Section with Apple-style design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="space-y-6"
          id="projects"
        >
          <h2 className="text-xl font-semibold">Projects</h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <motion.a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`block ${isDarkMode ? "bg-[#1C1C1E]" : "bg-[#E8E8ED]"} rounded-xl p-4 transition-transform hover:scale-[1.02]`}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                    style={{ backgroundColor: project.iconBg }}
                  >
                    <Image src={project.icon}  alt={project.name} width={24} height={24} className={project.className}/>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium mt-1">{project.name}</h3>
                      <ExternalLink size={16} className={`${isDarkMode ? "text-stone-400" : "text-stone-500"}`} />
                    </div>
                    <p className={`${isDarkMode ? "text-stone-400" : "text-stone-600"} text-sm -mt-0.5`}>
                      {project.description}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
          id="education"
        >
          <h2 className="text-xl font-semibold">Education</h2>
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="flex justify-between">
                <h3 className="font-medium">Information Systems Engineering</h3>
                <span className={`${isDarkMode ? "text-stone-500" : "text-stone-600"} text-sm`}>2023</span>
              </div>
              <p className={`${isDarkMode ? "text-stone-500" : "text-stone-600"} text-sm`}>Universidad Tecnologica Nacional de La Plata</p>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <h3 className="font-medium">Bachelor in Social Sciences</h3>
                <span className={`${isDarkMode ? "text-stone-500" : "text-stone-600"} text-sm`}>2008 - 2023</span>
              </div>
              <p className={`${isDarkMode ? "text-stone-500" : "text-stone-600"} text-sm`}>Nstra. Señora del Perpetuo Socorro</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between">
                <h3 className="font-medium">British English (B2+)</h3>
                <span className={`${isDarkMode ? "text-stone-500" : "text-stone-600"} text-sm`}>2016 - 2023</span>
              </div>
              <p className={`${isDarkMode ? "text-stone-500" : "text-stone-600"} text-sm`}>Universidad Tecnologica Nacional de La Plata</p>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <h3 className="font-medium">JavaScript</h3>
                <span className={`${isDarkMode ? "text-stone-500" : "text-stone-600"} text-sm`}>2021-2021</span>
              </div>
              <p className={`${isDarkMode ? "text-stone-500" : "text-stone-600"} text-sm`}>Coderhouse</p>
            </div>
          </div>

          
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-4"
          id="links"
        >
          <h2 className="text-xl font-semibold">Links</h2>
          <div className="space-y-3">
            <a href="https://github.com/francopicc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group">
              <Github size={18} />
              <span className="group-hover:underline">GitHub</span>
              <ExternalLink size={14} className="opacity-50" />
            </a>
            <a href="https://www.linkedin.com/in/francopiccirilli" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group">
              <Linkedin size={18} />
              <span className="group-hover:underline">LinkedIn</span>
              <ExternalLink size={14} className="opacity-50" />
            </a>
            <a href="mailto:francopiccirilli51@gmail.com" className="flex items-center gap-2 group">
              <Mail size={18} />
              <span className="group-hover:underline">francopiccirilli51@gmail.com</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="pt-8 border-t border-gray-800"
          id="contact"
        >
          <p className={`text-sm ${isDarkMode ? "text-stone-500" : "text-stone-600"}`}>
            Press <kbd className={`px-2 py-1 rounded ${isDarkMode ? "bg-[#1C1C1E]" : "bg-[#E8E8ED]"} text-xs`}>⌘ + P</kbd> to search.
          </p>
        </motion.div>
      </div>
    </main>
  )
}