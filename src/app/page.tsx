"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, FileText, Mail, ExternalLink, Search, Moon, Sun } from "lucide-react"
import SpotlightSearch from "@/components/Spotlight"
import Image from "next/image"
import ProjectsSection from "@/components/Projects"

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
    { id: "works", name: "Works", section: "works" },
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
            <p className={`${isDarkMode ? "text-stone-500" : "text-stone-600"} font-medium text-sm`}>Software Engineer</p>
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
            href="/assets/PICCIRILLI_FRANCO_CV.pdf"
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
          <ProjectsSection isDarkMode={isDarkMode} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
          id="works"
        >
          <h2 className="text-xl font-semibold">Works</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <h3 className="font-medium">Programming Coordinator and Leader (Volunteer)</h3>
                <span className={`${isDarkMode ? "text-stone-500" : "text-stone-600"} text-sm`}>Nov 2022 - Mar 2023</span>
              </div>
              <p className={`${isDarkMode ? "text-stone-300" : "text-stone-700"} leading-relaxed`}>
                Developed a professional project for a university assignment, creating a travel management platform.
                The project was completed in approximately 3-4 months, during which time I also learned new technologies included in the project stack.
                The project used Django with Python and employed MySQL as the local database.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <h3 className="font-medium">Systems Administrator (Freelancer)</h3>
                <span className={`${isDarkMode ? "text-stone-500" : "text-stone-600"} text-sm`}>Jun 2025 -</span>
              </div>
              <p className={`${isDarkMode ? "text-stone-300" : "text-stone-700"} leading-relaxed`}>
                I developed and managed a complete POS system for a café, handling sales, inventory, and reports. 
                I was responsible for the system's infrastructure, security, maintenance, and technical support. 
                I implemented continuous improvements that optimised operational processes and business efficiency. 
                The stack is based on React Native, with mySQL as the locally managed database.
              </p>
              
              {/* POS System Images */}
              <div className="w-full flex items-center overflow-x-auto overflow-y-hidden pt-3 pb-4">
                {[
                  { thumbnail: "/assets/projects/atilio-pos-1.webp", fullImage: "/assets/projects/atilio-pos-1.webp" },
                  { thumbnail: "/assets/projects/atilio-pos-2.webp", fullImage: "/assets/projects/atilio-pos-2.webp" },
                  { thumbnail: "/assets/projects/atilio-pos-3.webp", fullImage: "/assets/projects/atilio-pos-3.webp" }
                ].map((screenshot, index) => (
                  <div key={index} className="group flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        const dialog = document.getElementById('pos-dialog') as HTMLDialogElement;
                        const img = document.getElementById('pos-dialog-img') as HTMLImageElement;
                        if (dialog && img) {
                          img.src = screenshot.fullImage;
                          dialog.showModal();
                        }
                      }}
                      data-is-odd={index % 2 === 0}
                      data-index={index}
                      className={`block outline-none w-[200px] overflow-hidden flex-shrink-0 aspect-[1.66]
                        rounded border ${isDarkMode ? "border-[#333333]" : "border-[#eeeeee]"}
                        hover:shadow-[0px_3px_4px_rgba(0,_0,_0,_0.12)] transition-shadow shadow-[0px_1px_2px_rgba(0,_0,_0,_0.04)]
                        data-[is-odd=true]:-rotate-[4deg] rotate-[4deg] data-[index=1]:-ml-[60px] data-[index=2]:-ml-[60px]
                      `}
                    >
                      <Image
                        width={200}
                        height={120}
                        className="object-cover h-full w-full"
                        src={screenshot.thumbnail}
                        alt={`POS System screenshot ${index + 1}`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-4"
          id="education"
        >
          <h2 className="text-xl font-semibold">Education</h2>
          <div className="space-y-3">
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
          transition={{ duration: 0.5, delay: 0.5 }}
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
          transition={{ duration: 0.5, delay: 0.6 }}
          className="pt-8 border-t border-gray-800"
          id="contact"
        >
          <p className={`text-sm ${isDarkMode ? "text-stone-500" : "text-stone-600"}`}>
            Press <kbd className={`px-2 py-1 rounded ${isDarkMode ? "bg-[#1C1C1E]" : "bg-[#E8E8ED]"} text-xs`}>⌘ + P</kbd> to search.
          </p>
        </motion.div>
      </div>

      {/* POS System Image Dialog */}
      <dialog id="pos-dialog" className="backdrop:bg-black/50 bg-transparent">
        <div className="fixed inset-0 bg-black/25 z-50 grid place-content-center p-4" onClick={() => {
          const dialog = document.getElementById('pos-dialog') as HTMLDialogElement;
          dialog?.close();
        }}>
          <div className="w-full h-full grid place-content-center">
            <Image
              id="pos-dialog-img"
              src=""
              alt="POS System screenshot"
              width={800}
              height={600}
              className="rounded-md object-contain max-w-[90vw] max-h-[90vh]"
            />
          </div>
        </div>
      </dialog>
    </main>
  )
}