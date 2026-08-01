'use client';

import { useRef } from 'react';
import { Link } from 'next-transition-router';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import AnimatedHeading from '@/components/ui/AnimateHeading';
import AnimateDescription from '@/components/ui/AnimateDescription';
import { FaArrowUp, FaHome, FaArrowLeft, FaCheckCircle, FaProjectDiagram } from 'react-icons/fa';
import { Project } from '@/lib/projects';

gsap.registerPlugin(useGSAP);

export default function ProjectKnowMore({ project }: { project: Project }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      gsap.fromTo(
        containerRef.current.querySelectorAll('.fade-up-item'),
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
        }
      );
    },
    { scope: containerRef, dependencies: [project.slug] }
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <section ref={containerRef} className="min-h-screen bg-[#080807] text-white px-6 md:px-48 py-10">
      {/* Navigation Header */}
      <div className="flex items-center justify-between gap-4 mb-12 fade-up-item">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-2.5 text-[#a29e9a] hover:text-white transition-all duration-300 group px-4 py-2 rounded-full bg-[#1a1a18] border border-[#2a2a28] hover:border-[#3a3a38]"
        >
          <FaArrowLeft className="text-sm transform group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-xs sm:text-sm font-medium">Back to Project</span>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-2.5 text-[#a29e9a] hover:text-white transition-all duration-300 group px-4 py-2 rounded-full bg-[#1a1a18] border border-[#2a2a28] hover:border-[#3a3a38]"
        >
          <FaHome className="text-sm transform group-hover:scale-110 transition-transform duration-300 text-[#0c6145]" />
          <span className="text-xs sm:text-sm font-medium">Home</span>
        </Link>
      </div>

      {/* Main Title & Subtitle */}
      <div className="mb-10 fade-up-item">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0c6145]/20 text-[#0c6145] border border-[#0c6145]/30 text-xs font-semibold uppercase tracking-wider mb-4">
          <FaProjectDiagram className="text-xs" />
          <span>Detailed Architecture</span>
        </div>
        <AnimatedHeading
          text={`${project.title} — Key Features & Role Breakdown`}
          className="text-[clamp(1.8rem,6vw,3rem)] md:text-6xl font-extrabold mb-4"
        />
        <AnimateDescription
          text={project.description}
          className="text-sm sm:text-base md:text-lg text-[#a29e9a] font-sans max-w-4xl"
        />
      </div>

      {/* Tech Stack Bar */}
      <div className="mb-12 p-6 rounded-2xl bg-[#141413] border border-[#2a2a28] fade-up-item">
        <strong className="text-sm sm:text-base md:text-lg font-bold block mb-3 text-white">Tech Stack</strong>
        <div className="flex flex-wrap gap-2">
          {project.tech?.map((techItem, i) => (
            <span
              key={i}
              className="px-3.5 py-1.5 rounded-lg bg-[#1a1a18] border border-[#2a2a28] text-xs sm:text-sm text-[#d4d2d0] font-sans"
            >
              {techItem}
            </span>
          ))}
        </div>
      </div>

      {/* Key Features Section */}
      {project.keyFeatures && project.keyFeatures.length > 0 && (
        <div className="mb-14 fade-up-item">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-6 text-white flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#0c6145]"></span>
            <span>Key Features</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.keyFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-5 rounded-2xl bg-[#141413] border border-[#2a2a28] hover:border-[#0c6145]/40 transition-all duration-300 group"
              >
                <FaCheckCircle className="text-[#0c6145] text-lg shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm sm:text-base text-[#d4d2d0] font-sans font-medium leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Role Modules Section */}
      {project.roleModules && project.roleModules.length > 0 && (
        <div className="mb-16 fade-up-item">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-6 text-white flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#0c6145]"></span>
            <span>Role Modules & User Permissions</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.roleModules.map((module, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#141413] border border-[#2a2a28] hover:border-[#0c6145]/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between border-b border-[#2a2a28] pb-4 mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-white">{module.role}</h3>
                  <span className="text-xs px-3 py-1 rounded-full bg-[#0c6145]/20 text-[#0c6145] border border-[#0c6145]/30 font-mono uppercase tracking-wider">
                    Role Module
                  </span>
                </div>
                <ul className="space-y-2.5 text-sm text-[#a29e9a] font-sans">
                  {module.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2.5">
                      <span className="text-[#0c6145] font-bold">•</span>
                      <span className="text-[#d4d2d0] leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Navigation */}
      <div className="relative flex justify-center py-12 fade-up-item border-t border-[#2a2a28] mt-12">
        <div className="text-center">
          <p className="text-[#a29e9a] text-lg">Have a project in mind?</p>
          <a
            href="mailto:subhashadireddy@gmail.com"
            className="text-xl font-semibold text-[#bab6b3] hover:text-[#d4d2d0] transition"
          >
            subhashadireddy@gmail.com
          </a>
        </div>

        <button
          onClick={scrollToTop}
          className="absolute right-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1a1a18] border border-[#2a2a28] flex items-center justify-center text-[#a29e9a] hover:text-[#0c6145] hover:border-[#0c6145] hover:bg-[#0c6145]/10 transition-all duration-300 group focus:outline-none"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:-translate-y-1 transition-transform duration-300" />
        </button>
      </div>
    </section>
  );
}
