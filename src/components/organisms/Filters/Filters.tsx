import { Sorting } from '../Sorting';
import { Flag, Product } from '@/types/products';
import { Tags } from '@/components/molecules/Tags';
import { Filtering } from '@/types/productSearchFilters';
import { Flags } from '@/components/molecules/Flags';
import { PriceFilter } from '@/components/molecules/PriceFilter';
import { Separator } from '@/components/ui/separator';
import { DurationFilter } from '@/components/molecules/DurationFilter';
import { RatingFilter } from '@/components/molecules/RatingFilter';
import { ProductFiltering } from '@/types/search';

export default function Filters({
  products,
  tags,
  flags,
  highestPrice,
  rating,
  durationInMinutes,
  isSearchResultsPage
}: {
  products?: Product[];
  tags?: number[];
  flags?: Flag[];
  highestPrice?: number;
  rating?: ProductFiltering['rating'];
  durationInMinutes?: Filtering['durationInMinutes'];
  isSearchResultsPage?: boolean;
}) {
  return (
    <div className="w-full">
      <div className="lg:hidden">
        <Sorting isInFilters />
        <Separator />
      </div>
      <DurationFilter durationInMinutes={durationInMinutes} />
      <Separator />
      <PriceFilter selectedHighestPrice={highestPrice} />
      <Separator />
      <RatingFilter rating={rating} />
      <Separator />
      <Flags activeFlags={flags} />
      <Separator />
      {products && !isSearchResultsPage && <Tags products={products} activeTags={tags} />}
    </div>
  );
}
