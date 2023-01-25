import Navbar2 from '@/components/Navbar2';
import { useEffect, useState } from 'react';
import { LocalStorageCart, LocalStorageItem } from '@/pages/part';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import { Checkout } from '@/types_realm';
import { useUser } from '@auth0/nextjs-auth0';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
let products: [LocalStorageItem] = [{ id: 0, amount: 0 }];
let partsList: [number] = [0];
let carParts: any = [];
export const FIND_ALL_PARTS = gql`
    query FindAllParts($query: PartQueryInput!) {
        parts(sortBy: ID_ASC,query: $query) {
            _id
            id
            name
            price
            image{
                link
            }
            link
            carBrand
            amount
        }
    }
`;

// language=GraphQL
export const INSERT_SHOPPING_CART = gql`
    mutation ($orderPrice: Int, $parts: [OrderPartInsertInput], $userName: String, $deliveryDetails: OrderDeliveryDetailInsertInput){
        insertOneOrder(data: { id: 1,orderPrice: $orderPrice ,parts: $parts,userName: $userName, deliveryDetails: $deliveryDetails }){
            _id
            deliveryDetails {
                delivery
                description
                postCode
                street
                town
            }
            id
            orderPrice
            parts {
                id
                amount
            }
            userName
        }
    }
`;


const Checkout = () => {
  const { user } = useUser();
  let [cartLength, setCartLength] = useState(0);
  let [userEmail, setUserEmail] = useState();
  useEffect(() => {
    const itemJSONData = localStorage.getItem('shoppingCart') || '{"items": []}';
    const cart: LocalStorageCart = JSON.parse(itemJSONData);
    if (cart.items.length == 0) {
      location.href = '/';
    }
    setCartLength(cart.items.length);
    let i: number = 0;
    partsList.splice(0, partsList.length);
    cart.items.forEach((item: LocalStorageItem) => {
      products[i] = item;
      i++;
    });
    products.forEach((product) => {
      partsList.push(product.id);
    });
  }, [cartLength]);
  const { loading, data } = useQuery<{ parts: [Checkout] }>(FIND_ALL_PARTS, {
    variables: { query: { id_in: partsList } }
  });
  const parts:any = data ? data.parts : null;
  let index: number = 0;
  let priceTotal: number = 0;
  const [formData, setFormData] = useState({
    description: "",
    postCode: "",
    street: "",
    town: "",
    delivery: ""
  })
  // @ts-ignore
  const updateFormData = e =>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  function SortArrayAlpha(x:any, y:any) {
    if (x.id < y.id) {
      return -1;
    }
    if (x.id > y.id) {
      return 1;
    }
    return 0;
  }

  if (!loading) {
    products.sort((SortArrayAlpha));
    products.forEach((product) => {
      let tempPart = Object.freeze(parts[index]);
      tempPart = {
        _id: tempPart._id,
        id: tempPart.id,
        name: tempPart.name,
        price: tempPart.price,
        image: tempPart.image,
        link: tempPart.link,
        carBrand: tempPart.carBrand,
        amount: product.amount
      };
      // @ts-ignore
      carParts[index] = tempPart;
      // @ts-ignore
      priceTotal += parts[index].price * products[index].amount;
      index++;
    });
  }

  const [placeOrderInDB] = useMutation(INSERT_SHOPPING_CART);

  const placeOrder = async () => {
    if((userEmail=="" && !user) || formData.town=="" || formData.street=="" || formData.delivery=="" || formData.postCode==""){
      toast.error("Niektóre informacje dotyczące dostawy nie zostały wypełnione!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else {
      if (user?.email) {
        await placeOrderInDB({
          variables: { orderPrice: priceTotal, parts: products, userName: user?.name, deliveryDetails: formData }
        });
      } else {
        await placeOrderInDB({
          variables: { orderPrice: priceTotal, parts: products, userName: userEmail, deliveryDetails: formData }
        });
      }
      toast.success("Dziękujemy za złożenie zamówienia!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        onClose: () => {
          location.href = '/'
        }
      });
    }
  };
  return (
    <div className='bg-white'>
      <Navbar2 />
      <div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>Przedmioty znajdujące się w twoim
          koszyku</h2>

        <div className='mt-6 gap-y-10 gap-x-6 xl:gap-x-8'>
          {!loading && parts.map((product:any, index:number) => (
            <div key={product.id} className='flex flex-row py-6'>
              <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                <img className='w-full h-full object-center object-cover' src={product.image[0].link}
                     alt={product.name} />
              </div>

              <div className='ml-4 flex flex-1 flex-col'>
                <div>
                  <div className='flex justify-between text-base font-medium text-gray-900'>
                    <h3>
                      <a href={product.link}> {product.name} </a>
                    </h3>
                    <p className='ml-4'>{product.price + ' zł'}</p>
                  </div>
                  <p className='mt-1 text-sm text-gray-500'>{product.carBrand}</p>
                </div>
                <div className='flex flex-1 items-end justify-between text-sm'>
                  <p className='text-gray-500'>Ilość produktów: {carParts[index]?.amount}</p>

                  <div className='flex'>
                    <button
                      type='button'
                      className='font-medium text-indigo-600 hover:text-indigo-500'
                      onClick={() => {
                        const itemJSONData = localStorage.getItem('shoppingCart') || '{"items": []}';

                        const cart: LocalStorageCart = JSON.parse(itemJSONData);

                        let item = cart.items.find((item: LocalStorageItem) => item.id === product.id);
                        if (item && item.amount == 1) {
                          let cartIndex: number = 0;
                          let forIndex: number = 0;
                          cart.items.forEach((item: LocalStorageItem) => {
                            if (item.id != product.id) {
                              forIndex++;
                            } else {
                              cartIndex = forIndex;
                              forIndex++;
                            }
                          });
                          cart.items.splice(cartIndex, cartIndex + 1);
                          setCartLength(0);
                        } else if (item) {
                          item.amount--;
                          setCartLength(item.amount);
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
          ))}
          <div className='border-t border-gray-200 py-6 px-4 sm:px-6'>
            <div className='flex justify-between text-base font-medium text-gray-900'>
              <p>Cena produktów</p>
              <p>{priceTotal + ' zł'}</p>
            </div>
            <p className='mt-0.5 text-sm text-gray-500'>Koszty dostawy i podatek naliczany przy płatności.</p>
          </div>
        </div>
      </div>

      <div>
        <form id="formDelivery">
          <div className='shadow sm:rounded-md sm:overflow-hidden'>
              <div className='px-4 py-5 bg-white space-y-6 sm:p-6'>
                {!user &&<div className='grid grid-cols-3 gap-6'>
                <div className='col-span-3 sm:col-span-2'>
                  <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                    Email:
                  </label>
                  <div className='mt-1 flex rounded-md shadow-sm'>
                    <input
                      type='text'
                      name='email'
                      id='email'
                      className='focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
                      placeholder='przyklad@gmail.com'
                      onChange={(e)=>{ // @ts-ignore
                        setUserEmail(e.target.value)}}
                    />
                  </div>
                </div>
              </div>}
              <div className='grid grid-cols-3 gap-6'>
                <div className='col-span-3 sm:col-span-2'>
                  <label htmlFor='miejscowosc' className='block text-sm font-medium text-gray-700'>
                    Miejscowość:
                  </label>
                  <div className='mt-1 flex rounded-md shadow-sm'>
                    <input
                      type='text'
                      name='town'
                      id='miejscowosc'
                      className='focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
                      placeholder='Tarnów'
                      onChange={updateFormData}
                    />
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-3 gap-6'>
                <div className='col-span-3 sm:col-span-2'>
                  <label htmlFor='ulica' className='block text-sm font-medium text-gray-700'>
                    Ulica oraz numer domu:
                  </label>
                  <div className='mt-1 flex rounded-md shadow-sm'>
                    <input
                      type='text'
                      name='street'
                      id='ulica'
                      className='focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
                      placeholder='Krakowska 16'
                      onChange={updateFormData}
                    />
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-3 gap-6'>
                <div className='col-span-3 sm:col-span-2'>
                  <label htmlFor='kodPocztowy' className='block text-sm font-medium text-gray-700'>
                    Kod pocztowy:
                  </label>
                  <div className='mt-1 flex rounded-md shadow-sm'>
                    <input
                      type='text'
                      name='postCode'
                      id='kodPocztowy'
                      className='focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
                      placeholder='33-100'
                      onChange={updateFormData}
                    />
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-3 gap-6'>
                <div className='col-span-3 sm:col-span-2'>
                  <label htmlFor='dostawa' className='block text-sm font-medium text-gray-700'>
                    Sposób dostawy:
                  </label>
                  <div className='mt-1 flex rounded-md '>
                    <input
                      type='radio'
                      name='delivery'
                      value="kurier"
                      id='kurier'
                      onChange={updateFormData}
                      className='focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
                    />Przesyłka kurierska(+15zł)
                    <input
                      type='radio'
                      name='delivery'
                      value="paczkomat"
                      id='paczkomat'
                      onChange={updateFormData}
                      className='focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
                    />Paczkomat(+9zł)
                    <input
                      type='radio'
                      name='delivery'
                      value="odbior"
                      id='odbior'
                      onChange={updateFormData}
                      className='focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
                    />Odbiór w sklepie(+0zł)
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor='dodatkoweInformacje' className='block text-sm font-medium text-gray-700'>
                  Dodatkowe informacje:
                </label>
                <div className='mt-1'>
                            <textarea
                              id='dodatkoweInformacje'
                              name='description'
                              rows={3}
                              className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm text-gray-900 border border-gray-300 rounded-md'
                              placeholder='Opis'
                              defaultValue={''}
                              onChange={updateFormData}
                            />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className='px-4 py-3 bg-gray-50 text-right sm:px-6 flex items-center justify-center'>

        <button
          onClick={()=>{placeOrder()}}
          className='flex items-center justify-center rounded-md border border-transparent bg-gray-700 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-600'
        >
          Dodaj przedmiot
        </button>
        <ToastContainer/>
      </div>
    </div>
  );
};
export default Checkout;