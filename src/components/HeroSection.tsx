
import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-rose-900/30 to-slate-900/50"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-rose-500/20 to-purple-500/20 blur-3xl animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${8 + i * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white mb-6 leading-tight">
          <span className="block">Discover</span>
          <span className="bg-gradient-to-r from-rose-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Extraordinary
          </span>
          <span className="block">Companions</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/80 mb-12 font-light max-w-3xl mx-auto leading-relaxed">
          Connect with sophisticated, verified companions for intimate experiences, 
          travel adventures, and memorable encounters in the world's most exclusive destinations.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-full font-medium transition-all duration-300 hover:shadow-2xl hover:shadow-rose-500/25 hover:scale-105">
            <span className="relative z-10">Start Exploring</span>
            <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-purple-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          
          <button className="px-8 py-4 border border-white/30 text-white rounded-full font-medium backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/60" />
      </div>
    </div>
  );
};
