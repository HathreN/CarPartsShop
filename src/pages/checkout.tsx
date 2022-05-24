import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import { imageUrl } from '@/utils/Image';
import { useEffect, useState } from 'react';
import * as Realm from 'realm-web';
import { LocalStorageCart, LocalStorageItem } from '@/pages/part';
let products = [
]
const Checkout = () => {

  const router = useRouter()
  const [parts, setParts] = useState([])
  let [cartLength,setCartLength] = useState(0);
  useEffect(()=> {
    console.log(cartLength);
    if(products.length==0){load()}
    const itemJSONData = localStorage.getItem('shoppingCart') || '{"items": []}';
    const cart: LocalStorageCart = JSON.parse(itemJSONData);
    if(cart.items.length==0){
      location.href = "/";
    }
    setCartLength(cart.items.length)
    console.log(cartLength)
    let i :number = 0;
    cart.items.forEach((item: LocalStorageItem) => {
      products[i] = item
      i++;
    })
  },[cartLength])

  async function load(){
    const REALM_APP_ID = "partsshop-iqmiv";
    const app = new Realm.App({id: REALM_APP_ID});
    const credentials = Realm.Credentials.anonymous()
    try{
      const user = await app.logIn(credentials);
      await setParts(await user.functions.getAllParts());
    } catch (error){
      console.error(error)
    }
  }

  let priceTotal: number = 0;
  function found (id: number) {
    let check: boolean =false;
    products.find((obj) => {
      if ((obj.id==id)==true){
        check= true;
        parts[id-1].amount = obj.amount;
        priceTotal += parts[id-1].price*obj.amount;
      } else {
        check = false;
      }
      return obj.id == id;
    })
    return check
  };


  return (
    <div className="bg-white">
      <Navbar />
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Przedmioty znajdujące się w twoim koszyku</h2>

        <div className="mt-6 gap-y-10 gap-x-6 xl:gap-x-8">
          {parts.map((product) => (
            found(product.id) && (
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
                    <p className="text-gray-500">Ilość produktów: {product.amount}</p>

                    <div className="flex">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={()=>{
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
                        }}
                      >
                        Usuń produkt
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          ))}
          <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Cena produktów</p>
              <p>{priceTotal + ' zł'}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">Koszty dostawy i podatek naliczany przy płatności.</p>
            <div className="mt-6">
              <a
                href="/payment"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Przejdź do płatności
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Checkout;