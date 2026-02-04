'use client';

import { useEffect, useState } from 'react';
import { IntroOverlay } from '../components/Intro/IntroOverlay';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import { Navbar } from '../components/sections/Navbar';
import { Hero } from '../components/sections/Hero';
import { TechEvents } from '../components/sections/TechEvents';
import { StatsBar } from '../components/sections/StatsBar';
import { EventFlow } from '../components/sections/EventFlow';
import { Sponsors } from '../components/sections/Sponsors';
import { Organisers } from '../components/sections/Organisers';
import { Venue } from '../components/sections/Venue';
import { Footer } from '../components/sections/Footer';
import { InstructionsPopup } from '../components/ui/InstructionsPopup';

export default function Home() {
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Initial load animation
    gsap.from('.pixel-box', {
      scale: 0.8,
      opacity: 0,
      duration: 1.5,
      ease: 'power4.out',
      stagger: 0.1
    });

    // Scroll trigger animations
    // Global Reveal Animations
    const revealElements = gsap.utils.toArray('.reveal');
    revealElements.forEach((el: any) => {
      gsap.fromTo(
        el,
        {
          y: 50,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%', // Start when top of element hits 85% of viewport
            end: 'bottom 20%', // End logic not strictly needed for toggleActions but good practice
            toggleActions: 'play none none reverse', // Play on enter, Reverse on leave back (scroll up)
          },
        }
      );
    });

    // Apple Style Gradient Text Reveal (Scrubbed)
    const appleReveals = gsap.utils.toArray('.apple-reveal-text');
    appleReveals.forEach((el: any) => {
      gsap.to(el, {
        backgroundPosition: '0% 0',
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'bottom 40%',
          scrub: 1,
        },
      });
    });

    // Staggered Text Reveals
    const textReveals = gsap.utils.toArray('.reveal-text');
    textReveals.forEach((el: any) => {
      gsap.fromTo(
        el,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-orange/30 relative">
      <IntroOverlay />
      {/* Global Background Effects */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>

      <div className="relative z-10">
        <Navbar onInstructionsClick={() => setIsInstructionsOpen(true)} />
        <Hero />
        <TechEvents />
        <StatsBar />
        <EventFlow />
        <Sponsors />
        <Organisers />
        <Venue />
        <Footer />
      </div>

      <InstructionsPopup
        isOpen={isInstructionsOpen}
        onClose={() => setIsInstructionsOpen(false)}
      />
    </div>
  );
}
