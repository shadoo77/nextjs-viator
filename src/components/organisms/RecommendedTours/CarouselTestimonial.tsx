import { useRef, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import Slider, { Settings } from 'react-slick';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/products';
import TourCardShort from '@/components/organisms/RecommendedTours/TourCardShort';

export default function CarouselTestimonial({ products }: { products: Product[] }) {
  let sliderRef = useRef<Slider | null>(null);

  const [activeSlide, setActiveSlide] = useState(1);

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

  const slidesToShow = 4;

  const responsiveSettings = {
    oneSlide: { breakpoint: 600, settings: { slidesToShow: 1 } },
    twoSlides: { breakpoint: 800, settings: { slidesToShow: 2 } },
    threeSlides: { breakpoint: 900, settings: { slidesToShow: 3 } }
  };

  const settings: Settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    responsive: [...Object.values(responsiveSettings)],
    afterChange: (current) => setActiveSlide(current + 1)
  };

  const oneSlide = useMediaQuery(`(max-width: ${responsiveSettings.oneSlide.breakpoint}px)`);
  const twoSlides = useMediaQuery(`(max-width: ${responsiveSettings.twoSlides.breakpoint}px)`);
  const threeSlides = useMediaQuery(`(max-width: ${responsiveSettings.threeSlides.breakpoint}px)`);

  let slidesToShowResponsive = slidesToShow;
  if (oneSlide) {
    slidesToShowResponsive = 1;
  } else if (twoSlides) {
    slidesToShowResponsive = 2;
  } else if (threeSlides) {
    slidesToShowResponsive = 3;
  }

  const pageCount = Math.ceil(products.length - slidesToShowResponsive + 1);

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
      {activeSlide !== 1 && (
        <Button
          onClick={() => previous()}
          variant="outline"
          size="icon"
          className="absolute rounded-full -left-2 top-1/2 -translate-y-1/2"
        >
          <LuChevronLeft className="w-5 h-5 text-slate-500" />
        </Button>
      )}

      {activeSlide !== pageCount && (
        <Button
          onClick={() => next()}
          variant="outline"
          size="icon"
          className="absolute rounded-full -right-2 top-1/2 -translate-y-1/2"
        >
          <LuChevronRight className="w-5 h-5 text-slate-500" />
        </Button>
      )}
    </div>
  );
}
