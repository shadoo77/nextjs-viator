'use client';

import { useProduct } from '@/tanstack/queries/product';

export default function TestSingleTour({ productCode }: { productCode: string }) {
  const { data, error, isFetching, isLoading } = useProduct({ productCode });

  console.log({ data, error, isFetching, isLoading });

  return <div>TestSingleTour</div>;
}
