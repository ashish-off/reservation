import { Star } from "lucide-react";

const Reviews = () => {
  // only 3 reviews
  const reviews = [
    {
      id: 1,
      name: "Amelia R.",
      date: "Last weekend",
      rating: 3,
      comment:
        "From the welcome to dessert, everything felt curated. The staff even remembered my dietary notes.",
    },
    {
      id: 2,
      name: "Marcus L.",
      date: "2 days ago",
      rating: 5,
      comment:
        "We booked on the way and were seated right on time. The tasting menu was spot on.",
    },
    {
      id: 3,
      name: "Priya S.",
      date: "This week",
      rating: 4,
      comment:
        "Loved the ambience—warm lighting and great music. Service was quick and attentive.",
    },
  ];

  const renderStars = (count: number) => (
    <div className="flex gap-1 text-amber-500">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Star
          key={idx}
          size={16}
          className={idx < count ? "fill-amber-400" : "fill-transparent"}
        />
      ))}
    </div>
  );
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
          Guest Experiences
        </h3>

        <div className="flex items-center gap-2 rounded-full bg-white/80 border border-white/60 px-4 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
          <span className="text-lg font-semibold">4.8</span>
          <Star size={18} className="fill-amber-400 text-amber-500" />
          <span className="text-xs text-gray-600">320+ reviews</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div
            key={review.id}
            className=" rounded-2xl bg-background p-4 md:p-8 shadow-lg flex flex-col gap-6"
          >
            <div className="flex items-center justify-between">
              {renderStars(review.rating)}
            </div>
            <p className="text-muted-foreground italic capitalize">
              "{review.comment}"
            </p>
              <div>
                <p className="text-lg font-semibold">{review.name}</p>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
