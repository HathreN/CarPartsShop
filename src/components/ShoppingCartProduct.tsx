import { imageUrl } from '@/utils/Image';
import { useRouter } from 'next/router';

export default function ShoppingCartProduct({product,carParts, index}){
  const router = useRouter()
  return (
    <li key={product.id} className='flex py-6'>
      <div
        className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
        <img className='w-full h-full object-center object-cover'
             src={imageUrl(router, product.image)} alt={product.name} />
      </div>

      <div className='ml-4 flex flex-1 flex-col'>
        <div>
          <div className='flex justify-between text-base font-medium text-gray-900'>
            <h3>
              <a href={product.link}> {product.name} </a>
            </h3>
            <p className='ml-4'>{product.price}</p>
          </div>
          <p className='mt-1 text-sm text-gray-500'>{product.carBrand}</p>
        </div>
        <div className='flex flex-1 items-end justify-between text-sm'>
          <p className='text-gray-500'>Ilość: {carParts[index].amount}</p>

          <div className='flex'>
            <button
              type='button'
              className='font-medium text-indigo-600 hover:text-indigo-500'
            >
              Usuń produkt
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}