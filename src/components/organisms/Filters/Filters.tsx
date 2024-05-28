import { ProductSearchResults } from '@/types/products';
import { Tags } from '@/components/molecules/Tags';
import { Filtering } from '@/types/productSearchFilters';
import { Flags } from '@/components/molecules/Flags';
import { PriceFilter } from '@/components/molecules/PriceFilter';
import { Separator } from '@/components/ui/separator';
import { DurationFilter } from '@/components/molecules/DurationFilter';
import { RatingFilter } from '@/components/molecules/RatingFilter';

export default function Filters({
  searchResults,
  filters
}: {
  searchResults?: ProductSearchResults;
  filters: Filtering;
}) {
  const { tags, flags, highestPrice, durationInMinutes } = filters;

  return (
    <div className="w-full">
      <DurationFilter durationInMinutes={durationInMinutes} />
      <Separator />
      <PriceFilter selectedHighestPrice={highestPrice} />
      <Separator />
      <RatingFilter rating={filters.rating} />
      <Separator />
      <Flags activeFlags={flags} />
      <Separator />
      {searchResults?.products && <Tags products={searchResults?.products} activeTags={tags} />}
    </div>
  );
}
