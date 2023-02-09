import { useRouter } from 'next/router';
import Navbar2 from '@/components/Navbar2';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { CategoryPart } from '@/types_realm';
import LoadingOverlay from '@/components/LoadingOverlay';
import SingleProductIcon from '@/components/SingleProductIcon';
import Button from '@/components/UI/Button';

export const FIND_CATEGORY_PARTS = gql`
    query FindCategoryParts($query: PartQueryInput!, $sortBy: PartSortByInput) {
        parts(query: $query, sortBy: $sortBy) {
            _id
            id
            name
            price
            image{
                link
            }
            carBrand
        }
    }
`;

const Category = () => {

  const router = useRouter();
  const { category } = router.query;
  const { loading, data } = useQuery<{ parts: CategoryPart[] }>(FIND_CATEGORY_PARTS, {
    variables: { query: { category: category } }
  });
  let categoryParts = data ? data.parts : null;

  const [sort, setSort] = useState(0);

  function sortParts(variant: number) {

    if (variant == 1) {
      // @ts-ignore
      categoryParts = [...categoryParts].sort((a,b) =>{
        if (a.price>b.price) return 1;
        else if (b.price>a.price) return -1;
        return 0;
      })
      setSort(1);

    } else if (variant == 2) {
      categoryParts = [...categoryParts].sort((a,b) =>{
        if (a.price>b.price) return 1;
        else if (b.price>a.price) return -1;
        return 0;
      })
      setSort(2);
    } else {
      categoryParts = [...categoryParts].sort((a,b) =>{
        if (a.price>b.price) return 1;
        else if (b.price>a.price) return -1;
        return 0;
      })
      setSort(3);
    }
  }

  useEffect(() => {
  }, [sort]);
  return (
    <div className='bg-white h-screen'>
      <Navbar2 />
      <div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>Przedmioty kategorii: {category}</h2>
        <div>Opcje sortowania:
          <div className='flex sm:mx-3 md:m-auto sm:w-4/5 h-[90px]'>
            <div className="overflow-hidden mr-2">
              <Button onClick={() => {
                sortParts(1);
              }}>Alfabetycznie</Button>
            </div>
            <div className="overflow-hidden">
              <Button onClick={() => {
                sortParts(2);
              }}>Cenowo</Button>
            </div>
            <div className="overflow-hidden ml-2 truncate">
              <Button onClick={() => {
                sortParts(3);
              }}>Marka samochodu</Button>
            </div>
          </div>
        </div>
        <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {!loading && categoryParts?.map((product) => (
            <SingleProductIcon product={product} key={product.id}/>
          ))}
          {loading &&
            <LoadingOverlay />}
        </div>
      </div>
    </div>
  );
};
export default Category;
