import React, { useState } from 'react';
import Image from "next/image";
import { ExternalLink, Flame } from "lucide-react";
import { motion } from "framer-motion";

// Define types for project and screenshot
interface Screenshot {
  thumbnail: string;
  fullImage: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  icon: string;
  iconBg: string;
  link?: string;
  className?: string;
  screenshots: Screenshot[];
  useLucideIcon?: boolean;
  lucideIcon?: React.ComponentType<any>;
}

// Define the props for ProjectCard component
interface ProjectCardProps {
  project: Project;
  isDarkMode: boolean;
}

const ProjectCard = ({ project, isDarkMode }: ProjectCardProps) => {
  const [dialogData, setDialogData] = useState<{ isOpen: boolean; fullImage: string }>({
    isOpen: false,
    fullImage: ""
  });

  const openDialog = (fullImage: string) => {
    setDialogData({ isOpen: true, fullImage });
  };

  const closeDialog = () => {
    setDialogData({ isOpen: false, fullImage: "" });
  };

  return (
    <div className="space-y-1 w-full">
      <div className="flex gap-2">
        {/* Project Logo/Icon */}
        <div className={`${isDarkMode ? "bg-[#1C1C1E]" : "bg-white"} flex-shrink-0 grid place-content-center rounded-lg shadow-[0px_1px_2px_rgba(0,_0,_0,_0.12),_0px_0px_0px_1px_rgba(0,_0,_0,_0.08)] size-10`}>
          <div
            className="size-9 rounded-md flex items-center justify-center"
            style={{ backgroundColor: project.iconBg }}
          >
            {project.useLucideIcon && project.lucideIcon ? (
              <project.lucideIcon size={24} className={project.className || ''} />
            ) : (
              <Image src={project.icon} alt={project.name} width={24} height={24} className={project.className || ''} />
            )}
          </div>
        </div>

        {/* Project Title and Description */}
        <div className="text-compact">
          <a className="font-medium flex items-center" href={project.link || '#'} target="_blank" rel="noopener noreferrer">
            <p className={`relative before:absolute before:bottom-0 before:w-full before:h-0.5 ${isDarkMode ? "before:bg-stone-700 hover:before:bg-stone-600" : "before:bg-stone-200 hover:before:bg-stone-300"} before:transition-colors`}>
              {project.name}
            </p>
            {project.link && <ExternalLink size={16} className={`${isDarkMode ? "text-stone-500" : "text-stone-400"} ml-1`} />}
          </a>
          <p className={`${isDarkMode ? "text-stone-400" : "text-stone-600"} text-sm`}>
            {project.description}
          </p>
        </div>
      </div>

      {/* Project Images */}
      <div className="sm:pl-12 pl-3 w-full flex items-center overflow-x-auto overflow-y-hidden pt-3 pb-4">
        {project.screenshots.map((screenshot, index) => (
          <div key={index} className="group flex-shrink-0">
            {/* Dialog for expanded view */}
            {dialogData.isOpen && dialogData.fullImage === screenshot.fullImage && (
              <div
                className="fixed inset-0 bg-black/25 z-50 grid place-content-center"
                onClick={closeDialog}
              >
                <div className="w-full h-full grid place-content-center">
                  <Image
                    src={screenshot.fullImage}
                    alt="Project screenshot"
                    width={1200}
                    height={720}
                    className="rounded-md object-fill w-full max-w-[1920px] max-h-[1080px]"
                  />
                </div>
              </div>
            )}

            {/* Thumbnail */}
            <button
              type="button"
              onClick={() => openDialog(screenshot.fullImage)}
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
                alt={`${project.name} thumbnail`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Define the props for ProjectsSection component
interface ProjectsSectionProps {
  isDarkMode: boolean;
}

const ProjectsSection = ({ isDarkMode }: ProjectsSectionProps) => {
  // Sample data - replace with your actual projects
  const projects: Project[] = [
    {
      id: "flama",
      name: "Flama",
      description: "Flama centralises project, team and process management in one place. It enables planning, coordination and progress measurement with visual tools and automation. It helps organisations maintain clarity, control and efficiency at every stage.",
      icon: "/assets/flama.svg",
      iconBg: "#0E0E0E",
      className: "text-white",
      useLucideIcon: true,
      lucideIcon: Flame,
      screenshots: [
        {
          thumbnail: "/assets/projects/flama-1.webp",
          fullImage: "/assets/projects/flama-1.webp"
        },
      ]
    },
    {
      id: "naftas",
      name: "Naftas",
      description: "Fuel prices and statistics in Argentina.",
      icon: "/assets/naftas.svg",
      iconBg: "#0E0E0E",
      link: "https://naftas.vercel.app",
      className: "ml-0.5",
      screenshots: [
        {
          thumbnail: "/assets/projects/naftas-1.webp",
          fullImage: "/assets/projects/naftas-1.webp"
        },
        {
          thumbnail: "/assets/projects/naftas-2.webp",
          fullImage: "/assets/projects/naftas-2.webp"
        },
      ]
    },
    {
      id: "delta",
      name: "Delta",
      description: "Subscription system for SaaS, with billing and metrics.",
      icon: "/assets/delta.svg",
      iconBg: "#0E0E0E",
      className: "invert brightness-0",
      screenshots: [
        {
          thumbnail: "/assets/projects/delta-1.webp",
          fullImage: "/assets/projects/delta-1.webp"
        },
        {
          thumbnail: "/assets/projects/delta-2.webp",
          fullImage: "/assets/projects/delta-2.webp"
        },
        {
          thumbnail: "/assets/projects/delta-3.webp",
          fullImage: "/assets/projects/delta-3.webp"
        },
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="space-y-6"
      id="projects"
    >
      <h2 className="text-xl font-semibold">Projects</h2>
      <div className="space-y-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} isDarkMode={isDarkMode} />
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectsSection;
