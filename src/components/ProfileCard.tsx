
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
}

interface ProfileCardProps {
  profile: Profile;
}

export const ProfileCard = ({ profile }: ProfileCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

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

  return (
    <Card 
      className="group relative overflow-hidden bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        {/* Profile Image */}
        <img 
          src={profile.image} 
          alt={profile.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Video Overlay on Hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <Play className="w-8 h-8 text-white" />
            </div>
          </div>
        )}
        
        {/* Verified Badge */}
        {profile.verified && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-blue-500/90 hover:bg-blue-500 text-white border-0">
              <Shield className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          </div>
        )}
        
        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm hover:bg-black/40 text-white border-0"
          onClick={() => setIsFavorited(!isFavorited)}
        >
          <Heart 
            className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} 
          />
        </Button>
        
        {/* Availability Status */}
        <div className="absolute bottom-4 left-4">
          <Badge className={`${getAvailabilityColor(profile.availability)} text-white border-0 text-xs`}>
            <div className="w-2 h-2 rounded-full bg-white mr-1" />
            {profile.availability}
          </Badge>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>
      
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-medium text-white mb-1">
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
        
        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white ml-1 font-medium">{profile.rating}</span>
            <span className="text-white/60 ml-1">({profile.reviews} reviews)</span>
          </div>
        </div>
        
        {/* Specialties */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {profile.specialties.slice(0, 3).map((specialty, index) => (
              <Badge 
                key={index}
                variant="secondary" 
                className="bg-white/10 text-white/80 hover:bg-white/20 border-0 text-xs"
              >
                {specialty}
              </Badge>
            ))}
            {profile.specialties.length > 3 && (
              <Badge 
                variant="secondary" 
                className="bg-white/10 text-white/60 hover:bg-white/20 border-0 text-xs"
              >
                +{profile.specialties.length - 3}
              </Badge>
            )}
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white border-0"
            size="sm"
          >
            View Profile
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <MessageCircle className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
