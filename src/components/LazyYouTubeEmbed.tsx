import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface LazyYouTubeEmbedProps {
  videoId: string;
  title: string;
  useNoCookie?: boolean;
  className?: string;
}

export const LazyYouTubeEmbed: React.FC<LazyYouTubeEmbedProps> = ({
  videoId,
  title,
  useNoCookie = false,
  className = 'w-full h-full',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  if (isLoaded) {
    const domain = useNoCookie ? 'https://www.youtube-nocookie.com' : 'https://www.youtube.com';
    return (
      <iframe
        src={`${domain}/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        className={`${className} border-0`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsLoaded(true)}
      aria-label={`Reproducir video: ${title}`}
      className={`${className} relative block w-full h-full bg-slate-900 group cursor-pointer overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4472C4]`}
    >
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors flex items-center justify-center">
        <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#4472C4] group-hover:bg-[#33599E] text-white flex items-center justify-center shadow-2xl ring-4 ring-white/30 group-hover:scale-110 transition-transform duration-200">
          <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-0.5" />
        </span>
      </div>
    </button>
  );
};
