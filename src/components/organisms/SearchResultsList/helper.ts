import { getLocationDetails } from '@/lib/utils';
import { Destination } from '@/types/destinations';
import { Product } from '@/types/products';
import { DestinationSearchResults, SearchResults } from '@/types/search';

type SearchResultsItem = {
  type: 'DESTINATION' | 'PRODUCT';
  title: string;
  subtitle: string;
  image?: {
    url: string;
    width: number;
    height: number;
    caption: string;
  };
  destination: Destination;
  productCode?: Product['productCode'];
};

const totalListCount = 7;

// mapping products
const mappingProducts = (products: Product[] | undefined, allDestinations: Destination[]) => {
  if (!products) return [];
  const list = products.map((product) => {
    const { locationString } = getLocationDetails(product.destinations, allDestinations);
    const productDestinationRef = product.destinations.find((destination) => destination.primary);
    if (!productDestinationRef) return null;
    const productDestination = allDestinations.find(
      (destination) => destination.destinationId === Number(productDestinationRef.ref)
    );
    if (!productDestination) return null;
    const image = product.images?.[0];
    const imageVariant = image?.variants.find(
      (variant) => variant.width === 100 && variant.height === 100
    );
    return {
      type: 'PRODUCT',
      title: product.title,
      subtitle: locationString,
      image: {
        url: imageVariant?.url || '',
        width: imageVariant?.width || 0,
        height: imageVariant?.height || 0,
        caption: image?.caption || ''
      },
      productCode: product.productCode,
      destination: productDestination
    } as SearchResultsItem;
  });
  return list.filter((item) => item) as SearchResultsItem[];
};

// mapping destinations
const mappingDestinations = (
  destinations: DestinationSearchResults[] | undefined,
  allDestinations: Destination[]
) => {
  if (!destinations) return [];
  const destinationsList = destinations.map((dest) => {
    const destination = allDestinations.find(
      (destination) => destination.destinationId === dest.id
    );
    if (!destination) return null;
    const { locationString } = getLocationDetails(dest.id, allDestinations);
    return {
      type: 'DESTINATION',
      title: destination.destinationName,
      subtitle: locationString,
      destination
    } as SearchResultsItem;
  });
  return destinationsList.filter((item) => item) as SearchResultsItem[];
};

// get search results list
export const getSearchResultsList = (
  searchResults: SearchResults | undefined,
  allDestinations: Destination[]
) => {
  if (!searchResults) return [];
  const { destinations, products } = searchResults;
  if (!destinations?.totalCount && !products.totalCount) return [];
  if (!destinations?.results?.length && !products.results?.length) return [];
  if (destinations.totalCount + products.totalCount <= totalListCount) {
    return [
      ...mappingDestinations(destinations?.results, allDestinations),
      ...mappingProducts(products?.results, allDestinations)
    ];
  }

  if (destinations.totalCount <= 3) {
    const productsList = mappingProducts(products.results, allDestinations).slice(
      0,
      totalListCount - destinations.totalCount
    );
    return [...mappingDestinations(destinations?.results, allDestinations), ...productsList];
  } else {
    const destinationsList = mappingDestinations(destinations?.results, allDestinations).slice(
      0,
      4
    );
    const productsList = mappingProducts(products?.results, allDestinations).slice(0, 3);
    return [...destinationsList, ...productsList];
  }
};
