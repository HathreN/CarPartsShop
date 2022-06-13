import { imageUrl } from '@/utils/Image';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const FIND_PART = gql`
  query FindPart($query: PartQueryInput!) {
    part(query: $query) {
      _id
        id
      name
        category
      price
      image
      carBrand
    }
  }
`;
export interface LocalStorageItem {
  id: number,
  amount: number
}

export interface LocalStorageCart {
  items: LocalStorageItem[];
}

const Part = () => {
  const router = useRouter()
  let {id} = (router.query)


  const { loading, data } = useQuery<LocalStorageItem>(FIND_PART, {
    variables: { query: {id: id}  }
  });
  const part = data ? data.part : null;
  console.log(JSON.stringify(part))

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
    console.log(JSON.stringify(cart))
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
  }
  return (

    <div className="bg-white">
      <Navbar />
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
            { part &&
              <li key={part.id}>
                <div className="flex items-center">
                  {part.category}
                  {/*category / part navigation*/}
                  <svg
                    width={16}
                    height={150}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className=" text-blue-500"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />

                  </svg>
                  {part.name}
                </div>
                <div className="max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
                  <div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
                    <img className="w-full h-full object-center object-cover" src={imageUrl(router, part.image)}
                         alt={part.name} />
                  </div>
                  <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                    <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                      <img className="w-full h-full object-center object-cover" src={imageUrl(router, part.image)}
                           alt={part.name} />
                    </div>
                    <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                      <img className="w-full h-full object-center object-cover" src={imageUrl(router, part.image)}
                           alt={part.name} />
                    </div>
                  </div>
                  <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
                    <img className="w-full h-full object-center object-cover" src={imageUrl(router, part.image)}
                         alt={part.name} />
                  </div>
                </div>
                <div
                  className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                  <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{part.name}</h1>
                  </div>

                  <div className="mt-4 lg:mt-0 lg:row-span-3">
                    <p className="text-3xl text-gray-900">{part.price + ' zł'}</p>
                    <button
                      onClick={() => {
                        handleSubmit(part.id)
                      }}
                      className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Add to bag
                    </button>
                  </div>

                  <div
                    className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <div>
                      <div className="space-y-6">
                        <p className="text-base text-gray-900">{part.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            }
          </ol>
        </nav>

      </div>
    </div>
  );
};
export default Part;