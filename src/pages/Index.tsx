
import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Star, Calendar, Heart, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { HeroSection } from '@/components/HeroSection';
import { ProfileCard } from '@/components/ProfileCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { Navigation } from '@/components/Navigation';

const Index = () => {
  const [selectedCity, setSelectedCity] = useState('New York');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    ageRange: [21, 35],
    ethnicity: [],
    bodyType: [],
    services: [],
    priceRange: [200, 2000],
    availability: 'all'
  });

  // Mock data for profiles
  const profiles = [
    {
      id: 1,
      name: 'Sophia',
      age: 26,
      location: 'Manhattan, NY',
      priceRange: '$$$$',
      rating: 4.9,
      reviews: 127,
      availability: 'Available Today',
      ethnicity: 'European',
      specialties: ['GFE', 'Travel Companion', 'Dinner Dates'],
      verified: true,
      image: '/placeholder.svg',
      coverVideo: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Isabella',
      age: 24,
      location: 'Brooklyn, NY',
      priceRange: '$$$',
      rating: 4.8,
      reviews: 89,
      availability: 'Available Tomorrow',
      ethnicity: 'Latin',
      specialties: ['BDSM', 'Role Play', 'Fetish'],
      verified: true,
      image: '/placeholder.svg',
      coverVideo: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'Aria',
      age: 28,
      location: 'Upper East Side, NY',
      priceRange: '$$$$$',
      rating: 5.0,
      reviews: 203,
      availability: 'Available Now',
      ethnicity: 'Asian',
      specialties: ['Luxury Travel', 'Art Events', 'VIP'],
      verified: true,
      image: '/placeholder.svg',
      coverVideo: '/placeholder.svg'
    },
    {
      id: 4,
      name: 'Zara',
      age: 25,
      location: 'Chelsea, NY',
      priceRange: '$$$$',
      rating: 4.7,
      reviews: 156,
      availability: 'Available Tonight',
      ethnicity: 'Mixed',
      specialties: ['Massage', 'Tantric', 'Wellness'],
      verified: true,
      image: '/placeholder.svg',
      coverVideo: '/placeholder.svg'
    },
    {
      id: 5,
      name: 'Luna',
      age: 27,
      location: 'SoHo, NY',
      priceRange: '$$$',
      rating: 4.9,
      reviews: 98,
      availability: 'Available Weekend',
      ethnicity: 'European',
      specialties: ['Photography', 'Art Modeling', 'Creative'],
      verified: true,
      image: '/placeholder.svg',
      coverVideo: '/placeholder.svg'
    },
    {
      id: 6,
      name: 'Maya',
      age: 23,
      location: 'Tribeca, NY',
      priceRange: '$$$$',
      rating: 4.8,
      reviews: 74,
      availability: 'Available Today',
      ethnicity: 'African',
      specialties: ['Dance', 'Performance', 'Entertainment'],
      verified: true,
      image: '/placeholder.svg',
      coverVideo: '/placeholder.svg'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      <Navigation selectedCity={selectedCity} onCityChange={setSelectedCity} />
      
      <HeroSection />
      
      {/* Search and Filter Section */}
      <div className="relative z-10 -mt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <Input 
                placeholder="Search by name, location, or specialty..."
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-rose-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Select value="newest">
              <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="available">Available Now</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <FilterSidebar filters={filters} onFiltersChange={setFilters} />
            </div>
          )}
          
          {/* Profile Grid */}
          <div className="flex-1">
            <div className="mb-8">
              <h2 className="text-3xl font-light text-white mb-2">
                Discover in {selectedCity}
              </h2>
              <p className="text-white/70">
                {profiles.length} exclusive companions available
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {profiles.map((profile) => (
                <ProfileCard 
                  key={profile.id} 
                  profile={profile}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button - Mobile */}
      <div className="fixed bottom-6 right-6 lg:hidden z-50">
        <Button 
          size="lg" 
          className="rounded-full w-14 h-14 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 shadow-xl"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
