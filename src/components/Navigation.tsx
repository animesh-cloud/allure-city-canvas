
import React, { useState } from 'react';
import { MapPin, Menu, X, Heart, MessageCircle, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface NavigationProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

export const Navigation = ({ selectedCity, onCityChange }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cities = [
    'New York', 'Los Angeles', 'Miami', 'Las Vegas', 'Chicago', 
    'San Francisco', 'Boston', 'Washington DC', 'Atlanta', 'Dallas'
  ];

  return (
    <nav className="relative z-50 bg-black/10 backdrop-blur-xl border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="text-2xl font-light text-white tracking-wider">
              <span className="bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent">
                LUXE
              </span>
              <span className="text-white/90">COMPANION</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <a href="#" className="text-white/80 hover:text-white transition-colors font-light">
              Discover
            </a>
            <a href="#" className="text-white/80 hover:text-white transition-colors font-light">
              Premium
            </a>
            <a href="#" className="text-white/80 hover:text-white transition-colors font-light">
              Travel
            </a>
            <a href="#" className="text-white/80 hover:text-white transition-colors font-light">
              Events
            </a>
          </div>

          {/* City Selector */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-white/60" />
              <Select value={selectedCity} onValueChange={onCityChange}>
                <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* User Actions */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
                <MessageCircle className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10">
          <div className="px-4 py-6 space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="w-4 h-4 text-white/60" />
              <Select value={selectedCity} onValueChange={onCityChange}>
                <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <a href="#" className="block text-white/80 hover:text-white py-2 font-light">
              Discover
            </a>
            <a href="#" className="block text-white/80 hover:text-white py-2 font-light">
              Premium
            </a>
            <a href="#" className="block text-white/80 hover:text-white py-2 font-light">
              Travel
            </a>
            <a href="#" className="block text-white/80 hover:text-white py-2 font-light">
              Events
            </a>
            
            <div className="flex items-center space-x-4 pt-4 border-t border-white/10">
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
                <Heart className="w-4 h-4 mr-2" />
                Favorites
              </Button>
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
                <MessageCircle className="w-4 h-4 mr-2" />
                Messages
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
