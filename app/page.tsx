import { LoginForm } from "@/features/login/components/Login-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0  bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img
              src="logo.png"
              className="w-32 mx-auto"
            />
          </div>
          <div className="mt-16 flex flex-col items-center">

            <LoginForm />

          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className=" w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                'url("auth/hero.jpg")'
            }}
          ></div>
        </div>
      </div>
    </div>

  )
}

