import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { Bestsellers } from '@/types_realm';
import LoadingOverlay from '@/components/LoadingOverlay';
import SingleProductIcon from '@/components/SingleProductIcon';

export const FIND_BESTSELLERS = gql`
    query {
        parts (sortBy: ID_ASC ){
            _id
            id
            name
            price
            image
        }
    }
`;
const Bestsellers = () => {
  const router = useRouter()
  const { loading, data, error } = useQuery<{ parts: Bestsellers[] }>(FIND_BESTSELLERS, {
    variables: { query: { } }
  });
  const bestsellers = data ? data.parts : null;

  return (
    <div className="bg-white">
      <Navbar />
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 border-4 border-solid mt-32 shadow-2xl bg-gray-50 rounded-3xl">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Przedmioty kupowane najczęściej</h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {!loading && bestsellers.map((product) => (
              <SingleProductIcon product={product}/>
          ))}
          {loading && <LoadingOverlay />}
        </div>

      </div>
    </div>
  );
}
export default Bestsellers;