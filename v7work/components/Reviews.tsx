export type Review = { id: string; image: string; client: string; project?: string };

export function Reviews({ reviews = [] }: { reviews?: Review[] }) {
  if (!reviews.length) return null;
  return (
    <section className="reviews-section section-shell" id="reviews">
      <div className="section-kicker">03 / Client notes</div>
      <h2>Proof, left in the client’s own words.</h2>
      <div className="review-grid">
        {reviews.map((review) => (
          <figure className="review-card" key={review.id}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={review.image} alt={`Client feedback from ${review.client}`} />
            <figcaption>
              <span>{review.client}</span>
              {review.project ? <span>{review.project}</span> : null}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
