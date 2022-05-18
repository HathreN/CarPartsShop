import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { imageUrl } from '@/utils/Image';

const Checkout = () => {
  const router = useRouter()
  const {category} = (router.query)
  interface Part {
    id: number,
    category: string;
    name: string;
    image: string;
    carBrand: string;
    price: number;
  }

  let Parts: Part[] = [
    {
      id: 1,
      category: 'suspension',
      name: 'gwint',
      image: '/gwint.jpg',
      carBrand: 'BMW',
      price: 1200
    }, {
      id: 2,
      category: 'suspension',
      name: 'gwint2',
      image: '/gwint.jpg',
      carBrand: 'BMW',
      price: 3000
    }, {
      id: 3,
      category: 'interior',
      name: 'podłoga',
      image: '/wnetrze.jpg',
      carBrand: 'BMW',
      price: 200
    }, {
      id: 4,
      category: 'interior',
      name: 'podłoga2',
      image: '/wnetrze.jpg',
      carBrand: 'BMW',
      price: 300
    }, {
      id: 5,
      category: 'handbrake',
      name: 'ręczny swagier',
      image: '/hydro.jpg',
      carBrand: 'BMW',
      price: 700
    }, {
      id: 6,
      category: 'handbrake',
      name: 'ręczny swagier2',
      image: '/hydro.jpg',
      carBrand: 'BMW',
      price: 500
    }, {
      id: 7,
      category: 'shifter',
      name: 'short shifter',
      image: '/shifter.jpg',
      carBrand: 'BMW',
      price: 700
    }, {
      id: 8,
      category: 'shifter',
      name: 'short shifter2',
      image: '/shifter.jpg',
      carBrand: 'BMW',
      price: 700
    },
  ];
  console.log(category);
  return (
    <div className="bg-white">
      <Navbar />
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Przedmioty znajdujące się w twoim koszyku</h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {Parts.map((product) => (
            <Link href={{
              pathname: 'part',
              query: 'id='+ product.id }} key={product.id}>
              <div className="group relative">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img className="w-full h-full object-center object-cover" src={imageUrl(router, product.image)} alt={product.name} />
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
          ))}
        </div>
      </div>
    </div>
  );
}
export default Checkout;