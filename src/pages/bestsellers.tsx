import Navbar2 from '@/components/Navbar2';
import LoadingOverlay from '@/components/LoadingOverlay';
import SingleProductIcon from '@/components/SingleProductIcon';
import useFetch from '@/utils/fetch';

const Bestsellers = () => {
  const { response: bestsellers, loading }:any = useFetch('/api/parts', {
    method: 'GET',
  });

  return (
    <div className='bg-white'>
      <Navbar2 />
      <div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>Przedmioty kupowane najczęściej</h2>

        <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {!loading && bestsellers && bestsellers.map((product:any) => (
            <SingleProductIcon product={product} key={product.id} />
          ))}
          {loading && <LoadingOverlay />}
        </div>

      </div>
    </div>
  );
};
export default Bestsellers;