import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { imageUrl } from '@/utils/Image';
import { useEffect, useState } from 'react';
import * as Realm from 'realm-web';


const Bestsellers = () => {
  const router = useRouter()
  const {category} = (router.query)
  const [parts, setParts] = useState([])
  useEffect(()=> {
    load()
  },[])
  async function load(){
    const REALM_APP_ID = "partsshop-iqmiv";
    const app = new Realm.App({id: REALM_APP_ID});
    const credentials = Realm.Credentials.anonymous()
    try{
      const user = await app.logIn(credentials);
      // @ts-ignore
      await setParts(await user.functions.getAllParts());
    } catch (error){
      console.error(error)
    }
  }
  console.log(category);
  return (
    <div className="bg-white">
      <Navbar />
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Przedmioty kupowane najczęściej</h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {parts.map((product) => (
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
export default Bestsellers;