import { useRouter } from 'next/router';
import { imageUrl } from '@/utils/Image';
import { LocalStorageCart, LocalStorageItem } from '@/pages/part';
//@ts-ignore
import { setCartLength } from '@/pages/checkout';
import Button from '@/components/UI/Button';
//@ts-ignore
export default function SingleCheckoutProduct({product,carParts,index}){

  const router = useRouter()
  function removeProduct(){
    const itemJSONData = localStorage.getItem('shoppingCart') || '{"items": []}';

    const cart: LocalStorageCart = JSON.parse(itemJSONData);

    let item = cart.items.find((item: LocalStorageItem) => item.id === product.id);
    if (item && item.amount==1) {
      let cartIndex: number = 0
      let forIndex: number = 0
      cart.items.forEach((item: LocalStorageItem) => {
        if(item.id !=product.id){
          forIndex ++
        } else {
          cartIndex = forIndex
          forIndex++
        }
      })
      cart.items.splice(cartIndex,cartIndex+1);
      setCartLength(0)
    } else if(item) {
      item.amount--;
      setCartLength(item.amount)
    }
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
  }

  return (
    <div key={product.id} className="flex flex-row py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img className="w-full h-full object-center object-cover" src={imageUrl(router, product.image)} alt={product.name} />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a href={product.link}> {product.name} </a>
            </h3>
            <p className="ml-4">{product.price + ' zł'}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{product.carBrand}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Ilość produktów: {carParts[index]?.amount}</p>

          <div className="flex">
            <Button onClick={()=>{removeProduct()}}>Usuń produkt</Button>
          </div>
        </div>
      </div>
    </div>
  )
}