import { useState } from 'react';

const Footer = () => {
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
    <div className="absolute bottom-0 w-screen">
      <footer className="bg-white dark:bg-gray-900">
        <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">© 2023 <a
          href="https://flowbite.com/">CarPartsShop™</a>.
        </span>
          <div className="flex mt-4 space-x-6 sm:justify-center md:mt-0">
            <a href="/about" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              O nas
              <span className="sr-only">Facebook page</span>
            </a>
            <a href="/contact" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Kontakt
              <span className="sr-only">Facebook page</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
