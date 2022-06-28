import { imageUrl } from '@/utils/Image';
import Link from 'next/link';
import { useRouter } from 'next/router';
export default function SingleProductIcon({product}) {
  const router = useRouter()
  return(
    <Link prefetch as={`/part/${product.id}`} href={{
      pathname: 'part',
      query: 'id=' + product.id
    }} key={product.id}>
      <div className="group">
        <div
          className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden hover:bg-gray-50 lg:h-80 lg:aspect-none">
          <img className="w-full h-full object-center object-cover" src={imageUrl(router, product.image)}
               alt={product.name} />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              {product.name}
            </h3>
          </div>
          <p className="text-sm font-medium text-gray-900">{product.price}</p>
        </div>
      </div>
    </Link>
  );
}