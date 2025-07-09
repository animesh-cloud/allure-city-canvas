import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Star, Calendar, Heart, MessageCircle, SlidersHorizontal, Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { HeroSection } from '@/components/HeroSection';
import { ProfileCard } from '@/components/ProfileCard';
import { ProfileDetailModal } from '@/components/ProfileDetailModal';
import { FilterSidebar } from '@/components/FilterSidebar';
import { Navigation } from '@/components/Navigation';

const Index = () => {
  const [selectedCity, setSelectedCity] = useState('New York');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState({
    ageRange: [21, 35],
    ethnicity: [],
    bodyType: [],
    services: [],
    priceRange: [200, 2000],
    availability: 'all'
  });

  // Enhanced profile data with additional fields for the modal
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
      coverVideo: '/placeholder.svg',
      gallery: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
      bio: 'Sophisticated companion with a passion for art, fine dining, and meaningful conversations. I believe in creating authentic connections and memorable experiences.',
      languages: ['English', 'French', 'Italian'],
      services: [
        { name: 'Dinner Companion', price: '$400', duration: '3 hours' },
        { name: 'Evening Experience', price: '$700', duration: '4 hours' },
        { name: 'Overnight Stay', price: '$1,500', duration: '12 hours' },
        { name: 'Weekend Getaway', price: '$3,000', duration: '2 days' }
      ]
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
      coverVideo: '/placeholder.svg',
      gallery: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
      bio: 'Adventurous and open-minded companion who enjoys exploring fantasies and creating unforgettable experiences in a safe, consensual environment.',
      languages: ['English', 'Spanish'],
      services: [
        { name: 'Session Experience', price: '$300', duration: '2 hours' },
        { name: 'Extended Play', price: '$500', duration: '4 hours' },
        { name: 'Overnight Adventure', price: '$1,200', duration: '12 hours' }
      ]
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
      coverVideo: '/placeholder.svg',
      gallery: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
      bio: 'Elite companion specializing in luxury experiences, cultural events, and international travel. Fluent in multiple languages with extensive cultural knowledge.',
      languages: ['English', 'Mandarin', 'Japanese'],
      services: [
        { name: 'VIP Experience', price: '$800', duration: '3 hours' },
        { name: 'Premium Evening', price: '$1,200', duration: '6 hours' },
        { name: 'Luxury Overnight', price: '$2,500', duration: '12 hours' },
        { name: 'Travel Companion', price: '$5,000', duration: '24 hours' }
      ]
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
      coverVideo: '/placeholder.svg',
      gallery: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
      bio: 'Wellness-focused companion offering therapeutic and sensual experiences. Certified in various massage techniques and holistic practices.',
      languages: ['English', 'Portuguese'],
      services: [
        { name: 'Wellness Session', price: '$350', duration: '2 hours' },
        { name: 'Tantric Experience', price: '$600', duration: '3 hours' },
        { name: 'Extended Wellness', price: '$1,000', duration: '6 hours' }
      ]
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
      coverVideo: '/placeholder.svg',
      gallery: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
      bio: 'Creative companion with a background in fine arts and photography. Perfect for cultural events, gallery openings, and artistic collaborations.',
      languages: ['English', 'German', 'Dutch'],
      services: [
        { name: 'Creative Session', price: '$300', duration: '2 hours' },
        { name: 'Art Event Companion', price: '$500', duration: '4 hours' },
        { name: 'Weekend Project', price: '$1,500', duration: '2 days' }
      ]
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
      coverVideo: '/placeholder.svg',
      gallery: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
      bio: 'Professional dancer and performer bringing energy and entertainment to every encounter. Specializing in creating memorable, dynamic experiences.',
      languages: ['English', 'French'],
      services: [
        { name: 'Entertainment Hour', price: '$400', duration: '2 hours' },
        { name: 'Performance Evening', price: '$650', duration: '4 hours' },
        { name: 'Extended Experience', price: '$1,300', duration: '8 hours' }
      ]
    }
  ];

  // Auto-detect user location (simulated)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode this to get city
          console.log('User location detected:', position.coords);
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }
  }, []);

  const handleViewProfile = (profile) => {
    setSelectedProfile(profile);
  };

  const handleCloseModal = () => {
    setSelectedProfile(null);
  };

  const sortedProfiles = [...profiles].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return a.priceRange.length - b.priceRange.length;
      case 'price-high':
        return b.priceRange.length - a.priceRange.length;
      case 'available':
        return a.availability.includes('Now') ? -1 : 1;
      default:
        return b.id - a.id; // newest first
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      <Navigation selectedCity={selectedCity} onCityChange={setSelectedCity} />
      
      <HeroSection />
      
      {/* Enhanced Search and Filter Section */}
      <div className="relative z-10 -mt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <Input 
                placeholder="Search by name, location, specialty, or experience..."
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-rose-400 transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
                {Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f !== 'all') && (
                  <Badge className="ml-2 bg-rose-500 text-white text-xs">!</Badge>
                )}
              </Button>
              
              <div className="flex bg-white/10 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-white/20' : 'hover:bg-white/10'}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-white/20' : 'hover:bg-white/10'}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
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
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-light text-white mb-2">
                    Discover in {selectedCity}
                  </h2>
                  <p className="text-white/70">
                    {sortedProfiles.length} exclusive companions available
                  </p>
                </div>
                
                {/* Quick Stats */}
                <div className="hidden lg:flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="text-white font-medium">
                      {sortedProfiles.filter(p => p.availability.includes('Now')).length}
                    </div>
                    <div className="text-white/60">Available Now</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-medium">
                      {sortedProfiles.filter(p => p.verified).length}
                    </div>
                    <div className="text-white/60">Verified</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-medium">
                      {(sortedProfiles.reduce((acc, p) => acc + p.rating, 0) / sortedProfiles.length).toFixed(1)}
                    </div>
                    <div className="text-white/60">Avg Rating</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {sortedProfiles.map((profile) => (
                <ProfileCard 
                  key={profile.id} 
                  profile={profile}
                  onViewProfile={handleViewProfile}
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
          className="rounded-full w-14 h-14 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 shadow-xl animate-pulse"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="w-6 h-6" />
        </Button>
      </div>

      {/* Profile Detail Modal */}
      <ProfileDetailModal 
        profile={selectedProfile}
        isOpen={!!selectedProfile}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Index;
