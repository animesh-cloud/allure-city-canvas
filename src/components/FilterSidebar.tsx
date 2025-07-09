
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

interface Filters {
  ageRange: number[];
  ethnicity: string[];
  bodyType: string[];
  services: string[];
  priceRange: number[];
  availability: string;
}

interface FilterSidebarProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export const FilterSidebar = ({ filters, onFiltersChange }: FilterSidebarProps) => {
  const ethnicities = [
    'European', 'Latin', 'Asian', 'African', 'Mixed', 'Middle Eastern', 'Indian', 'Other'
  ];
  
  const bodyTypes = [
    'Petite', 'Slim', 'Athletic', 'Curvy', 'Voluptuous', 'BBW', 'Tall', 'Average'
  ];
  
  const services = [
    'GFE', 'Travel Companion', 'Dinner Dates', 'BDSM', 'Role Play', 'Fetish',
    'Massage', 'Tantric', 'Photography', 'Art Modeling', 'Dance', 'VIP Events'
  ];

  const updateFilters = (key: keyof Filters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: 'ethnicity' | 'bodyType' | 'services', value: string) => {
    const currentArray = filters[key];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilters(key, newArray);
  };

  return (
    <Card className="bg-black/20 backdrop-blur-xl border border-white/10 sticky top-4">
      <CardHeader>
        <CardTitle className="text-white flex justify-between items-center">
          Filters
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onFiltersChange({
              ageRange: [21, 35],
              ethnicity: [],
              bodyType: [],
              services: [],
              priceRange: [200, 2000],
              availability: 'all'
            })}
            className="text-white/60 hover:text-white"
          >
            Clear All
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Age Range */}
        <div>
          <label className="text-white font-medium mb-3 block">
            Age Range: {filters.ageRange[0]} - {filters.ageRange[1]}
          </label>
          <Slider
            value={filters.ageRange}
            onValueChange={(value) => updateFilters('ageRange', value)}
            max={50}
            min={18}
            step={1}
            className="w-full"
          />
        </div>

        {/* Price Range */}
        <div>
          <label className="text-white font-medium mb-3 block">
            Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </label>
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilters('priceRange', value)}
            max={5000}
            min={100}
            step={50}
            className="w-full"
          />
        </div>

        {/* Availability */}
        <div>
          <label className="text-white font-medium mb-3 block">Availability</label>
          <Select value={filters.availability} onValueChange={(value) => updateFilters('availability', value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="now">Available Now</SelectItem>
              <SelectItem value="today">Available Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Ethnicity */}
        <div>
          <label className="text-white font-medium mb-3 block">Ethnicity</label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {ethnicities.map((ethnicity) => (
              <div key={ethnicity} className="flex items-center space-x-2">
                <Checkbox
                  id={ethnicity}
                  checked={filters.ethnicity.includes(ethnicity)}
                  onCheckedChange={() => toggleArrayFilter('ethnicity', ethnicity)}
                  className="border-white/20 text-white data-[state=checked]:bg-rose-500"
                />
                <label htmlFor={ethnicity} className="text-white/80 text-sm cursor-pointer">
                  {ethnicity}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Body Type */}
        <div>
          <label className="text-white font-medium mb-3 block">Body Type</label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {bodyTypes.map((bodyType) => (
              <div key={bodyType} className="flex items-center space-x-2">
                <Checkbox
                  id={bodyType}
                  checked={filters.bodyType.includes(bodyType)}
                  onCheckedChange={() => toggleArrayFilter('bodyType', bodyType)}
                  className="border-white/20 text-white data-[state=checked]:bg-rose-500"
                />
                <label htmlFor={bodyType} className="text-white/80 text-sm cursor-pointer">
                  {bodyType}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <label className="text-white font-medium mb-3 block">Specialties</label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {services.map((service) => (
              <div key={service} className="flex items-center space-x-2">
                <Checkbox
                  id={service}
                  checked={filters.services.includes(service)}
                  onCheckedChange={() => toggleArrayFilter('services', service)}
                  className="border-white/20 text-white data-[state=checked]:bg-rose-500"
                />
                <label htmlFor={service} className="text-white/80 text-sm cursor-pointer">
                  {service}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Applied Filters */}
        {(filters.ethnicity.length > 0 || filters.bodyType.length > 0 || filters.services.length > 0) && (
          <div>
            <label className="text-white font-medium mb-3 block">Applied Filters</label>
            <div className="flex flex-wrap gap-2">
              {[...filters.ethnicity, ...filters.bodyType, ...filters.services].map((filter, index) => (
                <Badge 
                  key={index}
                  variant="secondary"
                  className="bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border-0 text-xs"
                >
                  {filter}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
