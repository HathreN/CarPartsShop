import { imageUrl } from '@/utils/Image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const FIND_CATEGORY_PARTS = gql`
  query FindCategoryParts($query: PartQueryInput!) {
    parts(query: $query) {
      _id
      id
      name
      price
      image
      carBrand
    }
  }
`;

const Category = () => {

  const router = useRouter()
  const {category} = (router.query)
  const { loading, data } = useQuery(FIND_CATEGORY_PARTS, {
    variables: { query: { category: category } }
  });
  const categoryParts = data ? data.parts : null;
  console.log(JSON.stringify(categoryParts))

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
    } if(variant==1){
     setParts(categoryParts.sort(SortArrayAlpha));
      setSort(1)
    } else if( variant==2){
      setParts(categoryParts.sort(SortArrayPrice));
      setSort(2)
    } else{
      setParts(categoryParts.sort(SortArrayAlphaCompany));
      setSort(3)
    }
  }

  useEffect(()=> {
    console.log('refresh')
  },[sort])
  return (
    <div className="bg-white">
      <Navbar />
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Przedmioty kategorii: {category}</h2>
        <div>Opcje filtrowania:  <button className="border-solid border-4 rounded-full px-2 border-b-amber-500" onClick={()=>{
          sortParts(1)
        }} >alfabetycznie</button>
          <button className="border-solid border-4 rounded-full px-2 border-b-amber-500" onClick={()=>{
            sortParts(2)
          }} >cenowo</button>
          <button className="border-solid border-4 rounded-full px-2 border-b-amber-500" onClick={()=>{
            sortParts(3)
          }} >marki alfabetycznie</button>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {categoryParts && categoryParts.map((product) => (
              <Link href={{
                pathname: 'part',
                query: 'id='+ product.id }} key={product.id}>
                <div className="group relative border-solid border-2 border-b-amber-500 px-5" key={product.id}>
                  <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                    <img className="h-full object-center object-cover" src={imageUrl(router, product.image)} alt={product.name} />
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
              </Link>
          ))}
        </div>
        </div>
      </div>
  );
};
export default Category;
