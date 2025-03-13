'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiCalendar, FiMapPin, FiShare2 } from 'react-icons/fi';
import { format } from 'date-fns';
import Image from 'next/image';

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  imageUrl?: string;
  price: string;
}

export default function EventCard({
  id,
  title,
  date,
  time,
  location,
  imageUrl,
  price
}: EventCardProps) {
  const router = useRouter();
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const shareUrl = `${window.location.origin}/events/${id}`;
      if (navigator.share) {
        await navigator.share({
          title,
          text: 'Check out this event!',
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert('Event link copied to clipboard!');
      }
    } catch {
      // Handle error silently
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={imageUrl || '/default-event-image.jpg'}
          alt={title}
          fill
          className="object-cover"
        />
        <button
          onClick={handleShare}
          disabled={isSharing}
          className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
        >
          <FiShare2 className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <FiCalendar className="w-4 h-4 mr-2" />
            <span>{format(new Date(date), 'EEEE, MMMM dd')} at {time}</span>
          </div>
          
          <div className="flex items-center">
            <FiMapPin className="w-4 h-4 mr-2" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold">${price}</span>
          <button
            onClick={() => router.push(`/events/${id}`)}
            className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
} 