import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { RootState } from '@tap-n-taste/utils';
import { useSelector } from 'react-redux';

interface ImageSliderProps {
  className?: {
    root?: string; // Root container class
    image?: string; // Image class
    indicator?: string; // Indicators container class
    activeIndicator?: string; // Active indicator class
    inactiveIndicator?: string; // Inactive indicator class
  };
  [rest: string]: any; // Additional props
}

export function ImageSlider({
  className = {},
  ...rest
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipeLeft = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === restaurantData?.media?.gallery?.length - 1) return 0;
      return prevIndex + 1;
    });
  };

  const handleSwipeRight = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) return restaurantData?.media?.gallery?.length - 1;
      return prevIndex - 1;
    });
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') handleSwipeLeft();
      if (event.key === 'ArrowLeft') handleSwipeRight();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const { restaurantData } = useSelector(
    (state: RootState) => state.restaurant
  );

  return (
    <Box
      {...handlers}
      {...rest}
      className={`relative w-full h-[40vh] sm:h-[60vh] overflow-hidden mt-4 mb-4 ${
        className.root || ''
      }`}
    >
      {/* Container for image */}
      <div className="w-full h-full overflow-hidden">
        <img
          src={restaurantData?.media?.gallery[currentIndex]}
          alt={`Slide ${currentIndex}`}
          loading="lazy"
          className={`w-full h-full object-cover object-center rounded-xl transition-transform duration-500 ${
            className.image || ''
          }`}
        />
      </div>

      {/* Indicators */}
      <Box
        className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 ${
          className.indicator || ''
        }`}
      >
        {restaurantData?.media?.gallery?.map((_: any, index: any) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 rounded-full cursor-pointer transition-colors ${
              currentIndex === index
                ? `${className.activeIndicator || 'bg-[#F1414F] w-6'}`
                : `${className.inactiveIndicator || 'bg-gray-300 w-3'}`
            }`}
          />
        ))}
      </Box>
    </Box>
  );
}

export default ImageSlider;
