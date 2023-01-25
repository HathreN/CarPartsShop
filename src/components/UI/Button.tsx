interface Params {
  onClick: () => void;
  children: React.ReactNode
}

export default function Button(params: Params) {
  return (
    <button
      onClick={params.onClick}
      className='mt-10 w-full bg-gray-700 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
    >
      {params.children}
    </button>
  );
}