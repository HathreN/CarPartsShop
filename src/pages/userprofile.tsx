import Navbar2 from '@/components/Navbar2';
import { useUser } from '@auth0/nextjs-auth0';

export default () => {
  const { user, isLoading } :any = useUser();
  if(!isLoading) {
    return (
      <div>
        <Navbar2 />
        <div className="h-screen bg-gray-100 flex flex-wrap items-center  justify-center  ">
          <div
            className="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3    bg-white  shadow-lg    transform   duration-200 easy-in-out">
            <div className=" h-32 overflow-hidden">
              <img className="w-full"
                   src="https://images.unsplash.com/photo-1500520198921-6d4704f98092?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ac4bc726064d0be43ba92476ccae1a75&auto=format&fit=crop&w=1225&q=80"
                   alt="" />
            </div>
            <div className="flex justify-center px-5  -mt-12">
              <img className="h-32 w-32 bg-white p-2 rounded-full"
                   src={user.picture}
                   alt="" />

            </div>
            <div className=" ">
              <div className="text-center px-14">
                <h2 className="text-gray-800 text-3xl font-bold">{user.nickname}</h2>
                <a className="text-gray-400 mt-2 hover:text-blue-500" href="https://www.instagram.com/immohitdhiman/"
                   target="BLANK()">{user.email}</a>
                <p className="mt-2 text-gray-500 text-sm">Użytkownik dołączył: {(user.updated_at)?.substring(0,10)}</p>
              </div>
              <hr className="mt-6" />
              <div className="flex  bg-gray-50 ">
                <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                  <p><span className="font-semibold">2.5 k </span> Followers</p>
                </div>
                <div className="border"></div>
                <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                  <p><span className="font-semibold">2.0 k </span> Following</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return 0
  }
};