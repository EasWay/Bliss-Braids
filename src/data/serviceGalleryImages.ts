// Service gallery images mapping
// Maps service IDs to their gallery images
// NOTE: Some services use placeholder images that should be replaced with actual service photos

export const serviceGalleryImages: Record<string, string[]> = {
  'knotless-braids': [
    '/images/portfolio/Knotless-1.jpg',
    '/images/Knotless braids2.jpg', // Placeholder - replace with knotless braids image
    '/images/Knotless braids3.jpg', // Placeholder - replace with knotless braids image
    '/images/Knotless braids4.jpg', // Placeholder - replace with knotless braids image
    '/images/Knotless braids5.jpg', // Placeholder - replace with knotless braids image
  ],
  
  'jumbo-braids': [
    '/images/jumbo braids.jpg',
    '/images/jumbo braids.png', // Placeholder - replace with jumbo braids image
    '/images/jumbo braids1.jpg', // Placeholder - replace with jumbo braids image
    '/images/jumbo braids2.jpg', // Placeholder - replace with jumbo braids image
    '/images/jumbo braids3.jpg', // Placeholder - replace with jumbo braids image
  ],
  
  'spiral-braids': [
    '/images/configurator/spiral braids.jpg',
    '/images/spiral braids1.jpg', // Placeholder - replace with spiral braids image
    '/images/spiral braids2.jpg', // Placeholder - replace with spiral braids image
    '/images/spiral braids3.jpg', // Placeholder - replace with spiral braids image
    '/images/spiral braids4.jpg', // Placeholder - replace with spiral braids image
  ],
  
  'boho-braids': [
    '/images/Boho braids.jpg',
    '/images/Boho braids1.jpg',
    '/images/Boho curls and beads and premium edges.jpg',
    '/images/Boho curls.jpg', // Placeholder - replace with boho braids image
    '/images/boho-curls-beads.jpg', // Placeholder - replace with boho braids image
  ],
  
  'island-twist': [
    '/images/Island twist.jpg',
    '/images/Island twist.png',
    '/images/Island twist2.jpg', // Placeholder - replace with island twist image
    '/images/Island twist1.jpg', // Placeholder - replace with island twist image
    '/images/Island twist3.jpg', // Placeholder - replace with island twist image
  ],
  
  'lemonade': [
    '/images/Cornrow rasta.jpg',
    '/images/Cornrow rasta1.jpg',
    '/images/Cornrow rasta2.jpg',
    '/images/Cornrow rasta3.jpg',
    '/images/Cornrow rasta4.jpg',
  ],
  
  'cornrow-pony': [
    '/images/Cornrow pony.jpg',
    '/images/Cornrow pony1.jpg',
    '/images/Cornrow pony2.jpg',
    '/images/Cornrow pony3.jpg',
    '/images/Cornrow pony4.jpg',
  ],
  
  'butterfly-locs': [
    '/images/Butterfly lock.jpg',
    '/images/Butterfly lock1.jpg',
    '/images/Butterfly lock2.jpg',
    '/images/Butterfly lock3.jpg',
    '/images/Butterfly lock4.jpg',
  ],
  
  'kinky-twist': [
    '/images/configurator/Kinky twist.png',
    '/images/kinky twist1.jpg', // Placeholder - replace with kinky twist image
    '/images/kinky twist2.jpg', // Placeholder - replace with kinky twist image
    '/images/kinky twist3.jpg', // Placeholder - replace with kinky twist image
    '/images/kinky twist4.jpg', // Placeholder - replace with kinky twist image
  ],
};

// Helper function to get gallery images for a service
export function getServiceGalleryImages(serviceId: string): string[] {
  return serviceGalleryImages[serviceId] || [];
}
