import { useRef, useState } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import Slider, { Settings } from 'react-slick';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/products';
import TourCardShort from '@/components/organisms/RecommendedTours/TourCardShort';

export default function CarouselTestimonial({ products }: { products: Product[] }) {
  let sliderRef = useRef<Slider | null>(null);

  const [activeSlide, setActiveSlide] = useState(0);

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const settings: Settings = {
    dots: true,
    infinite: false,
    lazyLoad: 'ondemand',
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 900, settings: { slidesToShow: 3 } },
      { breakpoint: 800, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ],
    afterChange: (current) => setActiveSlide(current)
  };

  return (
    <div className="slider-container-recommended-tours relative">
      <Slider
        {...settings}
        ref={(slider) => {
          sliderRef.current = slider;
        }}
      >
        {products.map((product) => (
          <TourCardShort key={product.productCode} {...product} />
        ))}
      </Slider>
      <Button
        onClick={() => previous()}
        variant="outline"
        size="icon"
        className="absolute rounded-full -left-2 top-1/2 -translate-y-1/2 bg-slate-300/40 hover:bg-slate-400/50"
      >
        <LuChevronLeft className="w-5 h-5 text-slate-500" />
      </Button>

      <Button
        onClick={() => next()}
        variant="outline"
        size="icon"
        className="absolute rounded-full -right-2 top-1/2 -translate-y-1/2 bg-slate-300/40 hover:bg-slate-400/50"
      >
        <LuChevronRight className="w-5 h-5 text-slate-500" />
      </Button>
    </div>
  );
}
