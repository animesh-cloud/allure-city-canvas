
import React, { useState } from 'react';
import { Star, MapPin, Calendar, Heart, MessageCircle, Shield, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Profile {
  id: number;
  name: string;
  age: number;
  location: string;
  priceRange: string;
  rating: number;
  reviews: number;
  availability: string;
  ethnicity: string;
  specialties: string[];
  verified: boolean;
  image: string;
  coverVideo: string;
  gallery?: string[];
  services?: { name: string; price: string; duration: string }[];
  bio?: string;
  languages?: string[];
}

interface ProfileCardProps {
  profile: Profile;
  onViewProfile: (profile: Profile) => void;
}

export const ProfileCard = ({ profile, onViewProfile }: ProfileCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const getAvailabilityColor = (availability: string) => {
    if (availability.includes('Now')) return 'bg-green-500';
    if (availability.includes('Today')) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const getPriceDisplay = (priceRange: string) => {
    const ranges = {
      '$$$': '$200-500',
      '$$$$': '$500-1000',
      '$$$$$': '$1000+'
    };
    return ranges[priceRange as keyof typeof ranges] || priceRange;
  };

  const handleLongPress = () => {
    setIsVideoPlaying(true);
    setTimeout(() => setIsVideoPlaying(false), 3000);
  };

  return (
    <Card 
      className="group relative overflow-hidden bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleLongPress}
      onClick={() => onViewProfile(profile)}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        {/* Profile Image */}
        <img 
          src={profile.image} 
          alt={profile.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Video Preview Overlay */}
        {(isHovered || isVideoPlaying) && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 animate-pulse">
              <Play className="w-8 h-8 text-white" />
            </div>
            {/* Simulated video preview text */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-2">
                <p className="text-white text-xs text-center">Preview: Elegant introduction</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Verified Badge */}
        {profile.verified && (
          <div className="absolute top-4 left-4 transform transition-transform duration-300 group-hover:scale-110">
            <Badge className="bg-blue-500/90 hover:bg-blue-500 text-white border-0 shadow-lg">
              <Shield className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          </div>
        )}
        
        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm hover:bg-black/40 text-white border-0 transition-all duration-300 hover:scale-110"
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorited(!isFavorited);
          }}
        >
          <Heart 
            className={`w-4 h-4 transition-all duration-300 ${
              isFavorited ? 'fill-red-500 text-red-500 scale-110' : ''
            }`} 
          />
        </Button>
        
        {/* Availability Status */}
        <div className="absolute bottom-4 left-4 transform transition-transform duration-300 group-hover:scale-105">
          <Badge className={`${getAvailabilityColor(profile.availability)} text-white border-0 text-xs shadow-lg`}>
            <div className="w-2 h-2 rounded-full bg-white mr-1 animate-pulse" />
            {profile.availability}
          </Badge>
        </div>
        
        {/* View Profile Button - Slides up on hover */}
        <div className={`absolute bottom-0 left-0 right-0 transform transition-all duration-500 ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}>
          <div className="bg-gradient-to-t from-black/90 to-transparent p-4">
            <Button 
              className="w-full bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white border-0 font-medium"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onViewProfile(profile);
              }}
            >
              View Profile
            </Button>
          </div>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
      </div>
      
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-medium text-white mb-1 group-hover:text-rose-400 transition-colors duration-300">
              {profile.name}, {profile.age}
            </h3>
            <div className="flex items-center text-white/60 text-sm">
              <MapPin className="w-3 h-3 mr-1" />
              {profile.location}
            </div>
          </div>
          <div className="text-right">
            <div className="text-rose-400 font-medium text-lg">
              {getPriceDisplay(profile.priceRange)}
            </div>
            <div className="text-white/60 text-xs">per hour</div>
          </div>
        </div>
        
        {/* Rating with enhanced styling */}
        <div className="flex items-center mb-4">
          <div className="flex items-center bg-white/5 rounded-full px-3 py-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white ml-1 font-medium">{profile.rating}</span>
            <span className="text-white/60 ml-1 text-sm">({profile.reviews})</span>
          </div>
        </div>
        
        {/* Specialties with improved layout */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {profile.specialties.slice(0, 3).map((specialty, index) => (
              <Badge 
                key={index}
                variant="secondary" 
                className="bg-white/10 text-white/80 hover:bg-white/20 border-0 text-xs transition-all duration-300 hover:scale-105"
              >
                {specialty}
              </Badge>
            ))}
            {profile.specialties.length > 3 && (
              <Badge 
                variant="secondary" 
                className="bg-gradient-to-r from-rose-500/20 to-purple-600/20 text-white/60 hover:text-white border border-white/20 text-xs transition-all duration-300 hover:scale-105"
              >
                +{profile.specialties.length - 3} more
              </Badge>
            )}
          </div>
        </div>
        
        {/* Actions with enhanced interactivity */}
        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white border-0 transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/25"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onViewProfile(profile);
            }}
          >
            View Profile
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
            onClick={(e) => e.stopPropagation()}
          >
            <MessageCircle className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
