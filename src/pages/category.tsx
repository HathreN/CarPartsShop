import { imageUrl } from '@/utils/Image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';
import * as Realm from 'realm-web';

const Category = () => {
  const [sort,setSort] = useState(0)
  function sortParts(variant: number){
    function SortArrayAlpha(x, y){
      if (x.name < y.name) {return -1;}
      if (x.name > y.name) {return 1;}
      return 0;
    } function SortArrayPrice(x, y){
      if (x.price < y.price) {return -1;}
      if (x.price > y.price) {return 1;}
      return 0;
    } function SortArrayAlphaCompany(x, y){
      if (x.carBrand < y.carBrand) {return -1;}
      if (x.carBrand > y.carBrand) {return 1;}
      return 0;
    } function SortArrayAlphab(x, y){
      if (x.name > y.name) {return -1;}
      if (x.name < y.name) {return 1;}
      return 0;
    } function SortArrayPriceb(x, y){
      if (x.price > y.price) {return -1;}
      if (x.price < y.price) {return 1;}
      return 0;
    } function SortArrayAlphaCompanyb(x, y){
      if (x.carBrand > y.carBrand) {return -1;}
      if (x.carBrand < y.carBrand) {return 1;}
      return 0;
    }
    if(variant==1){
     setParts(parts.sort(SortArrayAlpha));
      setSort(1)
      console.log(sort)
    } else if( variant==2){
      setParts(parts.sort(SortArrayPrice));
      setSort(2)
      console.log(sort)
    } else{
      setParts(parts.sort(SortArrayAlphaCompany));
      setSort(3)
      console.log(sort)
    }
  }

  const router = useRouter()
  const {category} = (router.query)
  const [parts, setParts] = useState([])

  useEffect(()=> {
    console.log('refresh')
    if(parts.length==0){load()}
  },[sort])

  async function load(){
    const REALM_APP_ID = "partsshop-iqmiv";
    const app = new Realm.App({id: REALM_APP_ID});
    const credentials = Realm.Credentials.anonymous()
    try{
      const user = await app.logIn(credentials);
      // @ts-ignore
      await setParts(await user.functions.getAllProducts());
    } catch (error){
      console.error(error)
    }
  }
  return (
    <div className="bg-white">
      <Navbar />
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Przedmioty kategorii: {category}</h2>
        <div>Opcje filtrowania:  <button className="border-solid border-4 rounded-full px-2 border-b-amber-500" onClick={()=>{
          sortParts(1)
        }}>alfabetycznie</button>
          <button className="border-solid border-4 rounded-full px-2 border-b-amber-500" onClick={()=>{
            sortParts(2)
          }}>cenowo</button>
          <button className="border-solid border-4 rounded-full px-2 border-b-amber-500" onClick={()=>{
            sortParts(3)
          }}>marki alfabetycznie</button>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {parts.map((product) => (
            category == product.category ?
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
                        {/*<a href={product.href}>*/}
                        {/*  <span aria-hidden="true" className="absolute inset-0" />*/}
                        {product.name}
                        {/*</a>*/}
                      </h3>
                      {/*<p className="mt-1 text-sm text-gray-500">{product.color}</p>*/}
                    </div>
                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                  </div>
                </div>
              </Link> : (
                false
              )
          ))}
        </div>
        </div>
      </div>
  );
};
export default Category;
