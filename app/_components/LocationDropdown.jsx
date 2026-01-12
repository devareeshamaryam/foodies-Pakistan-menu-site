 'use client';

import React, { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';

const LocationDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState('Karachi');

    const cities = [
        'Islamabad',
        'Karachi',
        'Lahore',
        'Multan',
        'Faisalabad',
        'Rawalpindi',
        'Peshawar',
        'Quetta',
        'Sialkot',
        'Gujranwala'
    ];

    const handleCitySelect = (city) => {
        setSelectedCity(city);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            {/* Compact Location Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 px-2 py-1.5 hover:bg-gray-100 rounded-md transition-colors group"
            >
                <MapPin className="w-4 h-4 text-red-500" />
                <div className="flex flex-col items-start">
                    <span className="text-[10px] text-gray-500 leading-none">Your Location</span>
                    <span className="text-sm font-medium text-gray-900 leading-tight">
                        {selectedCity}
                    </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ml-1 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Compact Dropdown Menu */}
            {isOpen && (
                <>
                    {/* Backdrop to close dropdown */}
                    <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsOpen(false)}
                    />
                    
                    <div className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-lg shadow-xl w-52 z-50 max-h-80 overflow-y-auto">
                        <div className="py-1">
                            {cities.map((city, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleCitySelect(city)}
                                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-gray-50 transition-colors text-left ${
                                        selectedCity === city ? 'bg-red-50' : ''
                                    }`}
                                >
                                    {/* Small Circle Avatar */}
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-semibold text-xs shadow-sm">
                                        {city.charAt(0)}
                                    </div>
                                    {/* City Name */}
                                    <span className={`text-sm font-medium ${
                                        selectedCity === city ? 'text-red-600' : 'text-gray-700'
                                    }`}>
                                        {city}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default LocationDropdown;