import { BiStar, BiSolidStarHalf, BiSolidStar } from 'react-icons/bi';
import { cn } from '@/lib/utils';

export default function RatingReview({
  averageRating,
  size = 'normal'
}: {
  averageRating: number | string | undefined;
  size?: 'small' | 'normal' | 'large';
}) {
  if (!averageRating) {
    return null;
  }

  let rating = 0;
  let avgRating = Number(averageRating);

  if (isNaN(avgRating)) {
    avgRating = 0;
  }

  if (avgRating >= 5) {
    rating = 5;
  }

  if (avgRating % 1 === 0) {
    rating = avgRating;
  } else {
    rating = Math.floor(avgRating);
    const diff = avgRating - rating;

    if (diff > 0.5) {
      rating += 1;
    } else {
      rating += 0.5;
    }
  }

  return (
    <span className="flex text-amber-400">
      {[...Array(5)].map((_, idx) => {
        const index = idx + 1;
        if (index <= rating) {
          return (
            <BiSolidStar
              fill="currentColor"
              className={cn({
                'h-5 w-5': size === 'normal',
                'h-4 w-4': size === 'small',
                'h-6 w-6': size === 'large'
              })}
              key={index}
            />
          );
        }
        if (index - rating === 0.5) {
          return (
            <BiSolidStarHalf
              fill="currentColor"
              className={cn({
                'h-5 w-5': size === 'normal',
                'h-4 w-4': size === 'small',
                'h-6 w-6': size === 'large'
              })}
              key={index}
            />
          );
        }
        return (
          <BiStar
            fill="currentColor"
            className={cn({
              'h-5 w-5': size === 'normal',
              'h-4 w-4': size === 'small',
              'h-6 w-6': size === 'large'
            })}
            key={index}
          />
        );
      })}
    </span>
  );
}
