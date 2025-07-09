
import React, { useState, useEffect } from 'react';
import { X, Star, MapPin, Calendar, Heart, MessageCircle, Shield, Camera, Clock, DollarSign, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';

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

interface ProfileDetailModalProps {
  profile: Profile | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileDetailModal = ({ profile, isOpen, onClose }: ProfileDetailModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  if (!profile) return null;

  const gallery = profile.gallery || [profile.image, profile.image, profile.image];
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const services = profile.services || [
    { name: 'Dinner Companion', price: '$300', duration: '3 hours' },
    { name: 'Evening Experience', price: '$500', duration: '4 hours' },
    { name: 'Overnight Stay', price: '$1,200', duration: '12 hours' },
    { name: 'Weekend Getaway', price: '$2,500', duration: '2 days' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[90vh] p-0 bg-black/95 backdrop-blur-xl border border-white/20 overflow-hidden">
        {/* Header with Gallery */}
        <div className="relative h-1/2 overflow-hidden">
          <img 
            src={gallery[currentImageIndex]} 
            alt={profile.name}
            className="w-full h-full object-cover"
          />
          
          {/* Gallery Navigation */}
          {gallery.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-sm hover:bg-black/40 text-white"
                onClick={prevImage}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-sm hover:bg-black/40 text-white"
                onClick={nextImage}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </>
          )}

          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {gallery.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/40'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>

          {/* Profile Header Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-light text-white">{profile.name}, {profile.age}</h1>
                  {profile.verified && (
                    <Badge className="bg-blue-500/90 text-white border-0">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center text-white/80 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {profile.location}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white ml-1 font-medium">{profile.rating}</span>
                    <span className="text-white/60 ml-1">({profile.reviews} reviews)</span>
                  </div>
                  <Badge className={`${profile.availability.includes('Now') ? 'bg-green-500' : 'bg-yellow-500'} text-white border-0`}>
                    <div className="w-2 h-2 rounded-full bg-white mr-1" />
                    {profile.availability}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-black/20 backdrop-blur-sm hover:bg-black/40 text-white"
                  onClick={() => setIsFavorited(!isFavorited)}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-black/20 backdrop-blur-sm hover:bg-black/40 text-white"
                >
                  <MessageCircle className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          <DialogClose className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm hover:bg-black/40 text-white rounded-full p-2">
            <X className="w-5 h-5" />
          </DialogClose>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-medium text-white mb-4">About</h3>
                  <p className="text-white/80 leading-relaxed">
                    {profile.bio || `Sophisticated companion offering premium experiences in ${profile.location}. I specialize in creating memorable encounters for discerning clients who appreciate elegance, intelligence, and genuine connection.`}
                  </p>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-white/10 text-white/80 border-0">
                      {profile.ethnicity}
                    </Badge>
                    {(profile.languages || ['English', 'French']).map((lang, index) => (
                      <Badge key={index} variant="secondary" className="bg-white/10 text-white/80 border-0">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Services */}
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-medium text-white mb-4">Services & Rates</h3>
                  <div className="space-y-4">
                    {services.map((service, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div>
                          <h4 className="text-white font-medium">{service.name}</h4>
                          <div className="flex items-center text-white/60 text-sm mt-1">
                            <Clock className="w-3 h-3 mr-1" />
                            {service.duration}
                          </div>
                        </div>
                        <div className="text-rose-400 font-medium text-lg">
                          {service.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Specialties */}
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-medium text-white mb-4">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.specialties.map((specialty, index) => (
                      <Badge 
                        key={index}
                        variant="secondary" 
                        className="bg-gradient-to-r from-rose-500/20 to-purple-600/20 text-white border border-white/20"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Booking Card */}
              <Card className="bg-gradient-to-br from-rose-500/20 to-purple-600/20 backdrop-blur-sm border border-white/20">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-2xl font-light text-white mb-1">Starting from</div>
                    <div className="text-3xl font-medium text-rose-400">{profile.priceRange === '$$$' ? '$300' : profile.priceRange === '$$$$' ? '$500' : '$1000'}</div>
                    <div className="text-white/60 text-sm">per engagement</div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white mb-3"
                    onClick={() => setShowBooking(true)}
                  >
                    Discreet Booking
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Response Time</span>
                      <span className="text-white">Less than 1 hour</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Repeat Clients</span>
                      <span className="text-white">85%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Years Active</span>
                      <span className="text-white">3+</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Reviews */}
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Recent Reviews</h3>
                  <div className="space-y-4">
                    {[1, 2].map((review) => (
                      <div key={review} className="space-y-2">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                        <p className="text-white/80 text-sm italic">
                          "Exceptional experience, truly sophisticated and engaging companion."
                        </p>
                        <div className="text-white/60 text-xs">- Verified Client</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Booking Overlay */}
        {showBooking && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6">
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 max-w-md w-full">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-xl font-medium text-white mb-4">Booking Confirmation</h3>
                  <p className="text-white/80 mb-6">
                    Your booking request has been sent discreetly. You will receive a confirmation within 24 hours.
                  </p>
                  <Button 
                    onClick={() => setShowBooking(false)}
                    className="bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white"
                  >
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
