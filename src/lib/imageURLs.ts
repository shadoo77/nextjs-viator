export const imageBaseUrl = 'https://res.cloudinary.com/tripplazr/image/upload';

export const imageURLs = {
  heroHeader: `${imageBaseUrl}/w_1300,h_600,c_auto,g_auto/v1710942318/random/AU-Main-Homepage-Thumbnail_cgwvze.jpg`
};

export const resizedBaseImageURL = (width: number, height: number) =>
  `${imageBaseUrl}/w_${width},h_${height},c_auto,g_auto`;
