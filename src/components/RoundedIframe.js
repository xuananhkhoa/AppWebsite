import React from 'react';
import { Box, IconButton } from '@chakra-ui/react';

const RoundedIframe = ({ youtubeUrl, ...props }) => {
  return (
    <Box
      position="relative"
      width="100%"
      height="100%"
      borderRadius={props.borderRadius || '10px'}
      overflow="hidden"
      boxShadow="2xl"
    >
      <iframe width="100%" height="700px" src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=PUVCKwWJ5aDYQIwi" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      {props.children}
    </Box>
  );
};

export default RoundedIframe;