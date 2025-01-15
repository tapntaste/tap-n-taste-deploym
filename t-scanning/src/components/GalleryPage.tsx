'use client';

import { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Dialog,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { Close, PlayCircle } from '@mui/icons-material';
import { TButton, TLoadingSpinner } from '@tap-n-taste/ui';
import { useSelector } from 'react-redux';
import { RootState } from '@tap-n-taste/utils';

export default function GalleryPage() {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'photo' | 'video' | 'youtube' | null>(null);
  const isMobile = useMediaQuery('(max-width:600px)');

  const { restaurantData,loading } = useSelector((state: RootState) => state.restaurant);

  const handleMediaClick = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      setMediaType('youtube');
      setSelectedMedia(url.replace('watch?v=', 'embed/').replace('youtu.be/', 'www.youtube.com/embed/'));
    } else if (url.endsWith('.mp4')) {
      setMediaType('video');
      setSelectedMedia(url);
    } else {
      setMediaType('photo');
      setSelectedMedia(url);
    }
  };

  const handleClose = () => {
    setSelectedMedia(null);
    setMediaType(null);
  };

  return (
    loading?<TLoadingSpinner/>:<Box className="px-2 sm:px-4 py-8 sm:py-10 mx-auto" sx={{ maxWidth: 'lg', mx: 'auto' }}>
      <Typography variant="h4" textAlign="center" fontWeight="bold" mb={4} sx={{ fontFamily: 'Poppins, sans-serif' }}>
        Gallery
      </Typography>

      {/* Gallery Grid */}
      <Grid container spacing={3} className="mb-12">
        {/* Photos */}
        {restaurantData?.media?.photos?.map((photo: string, index: number) => (
          <Grid item xs={12} sm={6} md={4} key={index} onClick={() => handleMediaClick(photo)} sx={{ borderRadius: '16px' }}>
            <Box component="img" src={photo} alt={`Photo ${index + 1}`} sx={{ borderRadius: '16px' }} className="w-full h-[200px] object-cover cursor-pointer" />
          </Grid>
        ))}

        {/* Videos */}
        {restaurantData?.media?.videos?.map((video: string, index: number) => (
          <Grid item xs={12} sm={6} md={4} key={index} onClick={() => handleMediaClick(video)} sx={{ borderRadius: '16px' }}>
            <Box className="w-full h-[200px] flex items-center justify-center relative cursor-pointer bg-black rounded-lg">
              {video.includes('youtube.com') || video.includes('youtu.be') ? (
               <Box>
                <img src='https://cdn-icons-png.flaticon.com/128/3039/3039386.png' />
               </Box>
              ) : (
                <video src={video} className="w-full h-[200px] object-cover" muted />
              )}
            </Box>
          </Grid>
        ))}
      </Grid>

      <TButton text="View All" className={{ root: 'bg-white hover:bg-none w-full mx-auto', text: 'capitalize' }} sx={{ color: 'red' }} />

      {/* Dialog for Media Preview */}
      <Dialog
        open={!!selectedMedia}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        PaperProps={{ sx: { backgroundColor: 'transparent', boxShadow: 'none', overflow: 'hidden' } }}
      >
        <Box className="rounded-2xl flex justify-center items-center relative w-full" sx={{ borderRadius: '12px', height: isMobile ? '300px' : '500px' }}>
          <IconButton onClick={handleClose} disableRipple sx={{ position: 'absolute', top: '4%', right: '10%', background: 'white', padding: '2px', color: 'black', '&:hover': { background: 'white' } }}>
            <Close />
          </IconButton>

          {mediaType === 'photo' && selectedMedia && (
            <Box component="img" src={selectedMedia} alt="Selected Media" className="rounded-2xl" sx={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          )}

          {mediaType === 'video' && selectedMedia && (
            <Box component="video" src={selectedMedia} controls sx={{ width: '100%', height: '100%', borderRadius: '8px', backgroundColor: 'black' }} />
          )}

       <Box>
       {mediaType === 'youtube' && selectedMedia && (
            <iframe width="560" height="315" src={selectedMedia} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          )}
       </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
