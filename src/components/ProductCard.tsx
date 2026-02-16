import { Link } from "react-router-dom";

type Props = {
  id: string;
  name: string;
  price: number;
  image: string;
  edition?: number;
  totalEdition?: number;
};

const ProductCard = ({ id, name, price, image, edition, totalEdition }: Props) => {
  return (
    <Link to={`/product/${id}`} className="group block">
      {/* Square image container */}
      <div className="aspect-square overflow-hidden bg-secondary mb-4">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-label">
            No Image
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg text-foreground leading-tight">
            {name}
          </h3>
          {edition && totalEdition && (
            <p className="text-label text-muted-foreground mt-1">
              {edition} / {totalEdition}
            </p>
          )}
        </div>
        <p className="text-sm font-sans text-foreground whitespace-nowrap">
          ${price}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
