import { useState } from 'react';
import Navbar2 from '@/components/Navbar2';

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    content: ""
  })
  // @ts-ignore
  const updateFormData = e =>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <div className="h-screen">
      <Navbar2/>
      <div className="mt-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Formularz Kontaktowy
          </p>
          <form id="formDelivery">
            <div className='shadow sm:rounded-md sm:overflow-hidden'>
              <div className='px-4 py-5 bg-white space-y-6 sm:p-6'>
                <div className='col-span-3 sm:col-span-2'>
                  <label htmlFor='email' className='block text-sm font-medium text-gray-700 flex'>
                    Email: <h2 className="text-red-600">*</h2>
                  </label>
                  <div className='mt-1 flex rounded-md shadow-sm'>
                    <input
                      type='text'
                      name='email'
                      id='email'
                      className='focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
                      placeholder='przyklad@gmail.com'
                      onChange={updateFormData}
                    />
                  </div>
                </div>
                <div className='col-span-3 sm:col-span-2'>
                  <label htmlFor='phoneNumber' className='block text-sm font-medium text-gray-700 flex'>
                    Numer telefonu: <h2 className="text-red-600">*</h2>
                  </label>
                  <div className='mt-1 flex rounded-md shadow-sm'>
                    <input
                      type='text'
                      name='phoneNumber'
                      id='phoneNumber'
                      className='focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
                      placeholder='123 456 789'
                      onChange={updateFormData}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor='content' className='block text-sm font-medium text-gray-700 flex'>
                    Treść zgłoszenia: <h2 className="text-red-600">*</h2>
                  </label>
                  <div className='mt-1'>
                            <textarea
                              id='content'
                              name='content'
                              rows={3}
                              className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm text-gray-900 border border-gray-300 rounded-md'
                              placeholder='Treść zgłoszenia ...'
                              defaultValue={''}
                              onChange={updateFormData}
                            />
                  </div>
                </div>
                <div className='px-4 py-3 text-right sm:px-6 flex items-center justify-center'>

                  <button
                    type='submit'
                    className='flex items-center justify-center rounded-md border border-transparent bg-gray-700 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-600'
                  >
                    Dodaj przedmiot
                  </button>
                </div>
                <div>
                  <label htmlFor='dodatkoweInformacje' className='block text-sm font-medium text-gray-700 flex'>
                    <h2 className="text-red-600">* </h2>oznacza obowiązkowe dane
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          </dl>
        </div>
      </div>
    </div>
  );
}

export default Contact;
