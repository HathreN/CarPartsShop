import { imageUrl } from '@/utils/Image';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
interface Part {
  id: number,
  category: string;
  name: string;
  image: string;
  carBrand: string;
  price: number;
  description?: string;
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
    price: 3000,
    description: 'Zawieszenie amerykańskiej firmy feal'
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
const product = {
  name: 'Hamulec hydrauliczny firmy swagier',
  price: '400 zł',
  href: '/checkout',
  breadcrumbs: [
    { id: 4, name: 'Hamulce hydrauliczne', href: '/checkout' },
    { id: 4, name: 'swagier', href: '/checkout' },
  ],
  images: [
    {
      src: '/hydro.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: '/hydro.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: '/hydro.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: '/hydro.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
}

export interface LocalStorageItem {
  id: number,
  amount: number
}

export interface LocalStorageCart {
  items: LocalStorageItem[];
}

const Part = () => {
  const router = useRouter()
  const {id} = (router.query)

  function handleSubmit(id: number) {
    const itemJSONData = localStorage.getItem('shoppingCart') || '{"items": []}';

    const cart: LocalStorageCart = JSON.parse(itemJSONData);

    let item = cart.items.find((item: LocalStorageItem) => item.id === id);
    if (!item) {
      item = {
        id,
        amount: 1
      };
      cart.items.push(item);
    } else {
      item.amount++;
    }

    localStorage.setItem('shoppingCart', JSON.stringify(cart));
  }

  return (

    <div className="bg-white">
      <Navbar />
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
            {Parts.map(part => (
              id == part.id ?
              <li key={part.id}>
                <div className="flex items-center">
                    {part.name}
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="w-4 h-5 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
                <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
                  <div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
                    <img className="w-full h-full object-center object-cover" src={imageUrl(router, part.image)} alt={product.name} />
                  </div>
                  <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                    <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                      <img className="w-full h-full object-center object-cover" src={imageUrl(router, part.image)} alt={product.name} />
                    </div>
                    <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                      <img className="w-full h-full object-center object-cover" src={imageUrl(router, part.image)} alt={product.name} />
                    </div>
                  </div>
                  <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
                    <img className="w-full h-full object-center object-cover" src={imageUrl(router, part.image)} alt={product.name} />
                  </div>
                </div>
                <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                  <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
                  </div>

                  <div className="mt-4 lg:mt-0 lg:row-span-3">
                    <p className="text-3xl text-gray-900">{part.price + ' zł'}</p>
                      <button
                        onClick={() => {handleSubmit(part.id)}}
                        className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Add to bag
                      </button>
                  </div>

                  <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <div>
                      <div className="space-y-6">
                        <p className="text-base text-gray-900">{part.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li> : false
            ))}
          </ol>
        </nav>

      </div>
    </div>
  );
};
export default Part;