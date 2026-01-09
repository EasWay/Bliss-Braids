// Service image mappings for cycling through multiple images with positioning
export const serviceImages = {
  'knotless-braids': [
    { src: '/videos/Knotless barid.mp4', position: '50% 20%', type: 'video' },
  ],
  'jumbo-braids': [
    { src: '/videos/Jumbo braids.mp4', position: '50% 20%', type: 'video' },
  ],
  'spiral-braids': [
    { src: '/videos/Spiral braids.mp4', position: '50% 30%', type: 'video' },
  ],
  'boho-braids': [
    { src: '/videos/Boho braids.mp4', position: '50% 8%', type: 'video' },
  ],
  'island-twist': [
    { src: '/videos/Island twist braids.mp4', position: '50% 20%', type: 'video' },
  ],
  'lemonade': [
    { src: '/videos/Lemonade braids.mp4', position: '100% 50%', type: 'video' },
  ],
  'cornrow-pony': [
    { src: '/videos/Cornrow pony braids.mp4', position: '30% 30%', type: 'video' },
  ],
  'butterfly-locs': [
    { src: '/videos/Faux braids.mp4', position: '50% 20%', type: 'video' },
  ],
  'kinky-twist': [
    { src: '/videos/Kinky twist.mp4', position: '50% 20%', type: 'video' },
  ],
} as const;

export interface ServiceMedia {
  src: string;
  position: string;
  type: 'image' | 'video';
}

export const getServiceImages = (serviceId: string): readonly ServiceMedia[] => {
  return serviceImages[serviceId as keyof typeof serviceImages] || [{ src: '/images/hero-fallback.jpg', position: 'center center', type: 'image' }];
};