import Navbar2 from '@/components/Navbar2';

export default function Additem () {
  return (
    <div className=' md:mt-0 md:col-span-2'>
      <Navbar2/>
      <form action='#' method='POST'>
        <div className='shadow sm:rounded-md sm:overflow-hidden'>
          <div className='px-4 py-5 bg-white space-y-6 sm:p-6'>
            <div className='grid grid-cols-3 gap-6'>
              <div className='col-span-3 sm:col-span-2'>
                <label htmlFor='nazwaPrzedmiotu' className='block text-sm font-medium text-gray-700'>
                  Nazwa przedmiotu
                </label>
                <div className='mt-1 flex rounded-md shadow-sm'>
                  <input
                    type='text'
                    name='nazwaPrzedmiotu'
                    id='nazwaPrzedmiotu'
                    className='focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
                    placeholder='Olej 10w40'
                  />
                </div>
              </div>
            </div>
            <div className='grid grid-cols-3 gap-6'>
              <div className='col-span-3 sm:col-span-2'>
                <label htmlFor='kategoriaPrzedmiotu' className='block text-sm font-medium text-gray-700'>
                  kategoriaPrzedmiotu
                </label>
                <div className='mt-1 flex rounded-md shadow-sm'>
                  <input
                    type='text'
                    name='kategoriaPrzedmiotu'
                    id='kategoriaPrzedmiotu'
                    className='focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
                    placeholder='Płyny'
                  />
                </div>
              </div>
            </div>
            <div className='grid grid-cols-3 gap-6'>
              <div className='col-span-3 sm:col-span-2'>
                <label htmlFor='cenaPrzedmiotu' className='block text-sm font-medium text-gray-700'>
                  Cena Przedmiotu
                </label>
                <div className='mt-1 flex rounded-md shadow-sm'>
                  <input
                    type='number'
                    name='cenaPrzedmiotu'
                    id='cenaPrzedmiotu'
                    className='focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
                    placeholder='Cena w zł'
                  />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor='opis' className='block text-sm font-medium text-gray-700'>
                opis
              </label>
              <div className='mt-1'>
                            <textarea
                              id='about'
                              name='about'
                              rows={3}
                              className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm text-gray-900 border border-gray-300 rounded-md'
                              placeholder='Oryginalny zamiennik części do samochodów marki volkswagen'
                              defaultValue={''}
                            />
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Obrazy przedmiotu</label>
              <div
                className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
                <div className='space-y-1 text-center'>
                  {/*Image add*/}
                  <svg
                    className='mx-auto h-12 w-12 text-gray-400'
                    stroke='currentColor'
                    fill='none'
                    viewBox='0 0 48 48'
                    aria-hidden='true'
                  >
                    <path
                      d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                      strokeWidth={2}
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  <div className='flex text-sm text-gray-600'>
                    <label
                      htmlFor='file-upload'
                      className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
                    >
                      <span>Dodaj plik z komputera</span>
                      <input id='file-upload' name='file-upload' type='file' className='sr-only' />
                    </label>
                    <p className='pl-1'>lub przeciąg i upuść plik</p>
                  </div>
                  <p className='text-xs text-gray-500'>PNG, JPG, GIF do 10MB</p>
                </div>
              </div>
            </div>
          </div>
          <div className='px-4 py-3 bg-gray-50 text-right sm:px-6 flex items-center justify-center'>

            <button
              type='submit'
              className='flex items-center justify-center rounded-md border border-transparent bg-gray-700 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-600'
            >
              Dodaj przedmiot
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}