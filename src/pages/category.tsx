import { imageUrl } from '@/utils/Image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
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
            image
            carBrand
        }
    }
`;


const Category = () => {

  const router = useRouter();
  const { category } = router.query;
  console.log(category);
  const { loading, data } = useQuery<{ parts: CategoryPart[] }>(FIND_CATEGORY_PARTS, {
    variables: { query: { category: category } }
  });
  let categoryParts = data ? data.parts : null;
  const [sort, setSort] = useState(0);

  function sortParts(variant: number) {


    // if (variant == 1) {
    //   const dataName =  useQuery<{ parts: CategoryPart[] }>(FIND_CATEGORY_PARTS, {
    //     variables: { query: { category: category}, sortBy: 'PRICE_ASC' }
    //   });
    //   categoryParts = dataName ? dataName.parts : null;
    //   setSort(1);
    //
    // } else if (variant == 2) {
    //   const dataPrice =  useQuery<{ parts: CategoryPart[] }>(FIND_CATEGORY_PARTS, {
    //     variables: { query: { category: category}, sortBy: 'PRICE_ASC' }
    //   });
    //   categoryParts = dataPrice ? dataPrice.parts : null;
    //   setSort(2);
    // } else {
    //   const dataCarBrand =  useQuery<{ parts: CategoryPart[] }>(FIND_CATEGORY_PARTS, {
    //     variables: { query: { category: category}, sortBy: 'CARBRAND_ASC' }
    //   });
    //   categoryParts = dataCarBrand ? dataCarBrand.parts : null;
    //   setSort(3);
    // }
  }

  useEffect(() => {
    console.log('refresh');
  }, [sort]);
  return (
    <div className='bg-white'>
      <Navbar />
      <div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>Przedmioty kategorii: {category}</h2>
        <div>Opcje filtrowania:
          <Button onClick={() => {
            sortParts(1);
          }}>alfabetycznie</Button>
          <Button onClick={() => {
            sortParts(2);
          }}>cenowo</Button>
          <Button onClick={() => {
            sortParts(3);
          }}>marki alfabetycznie</Button>
        </div>
        <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {!loading && categoryParts.map((product) => (
            <SingleProductIcon product={product} />
          ))}
          {loading &&
            <LoadingOverlay />}
        </div>
      </div>
    </div>
  );
};
export default Category;
