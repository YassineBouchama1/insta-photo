/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { LoginForm } from "@/features/login/components/Login-form";
import TestimonialSlider from "@/features/login/components/TestimonialSlider";
const testimonials = [
  {
    quote: "We've been using Untitled to kick start every new project and can't imagine working without it.",
    author: "Andi Lane",
    role: "Founder, Catalog",
    company: "Web Design Agency",
    rating: 5
  },
  {
    quote: "The best solution for anyone who wants to work a flexible schedule but still earn a full-time income.",
    author: "Sarah Chen",
    role: "CEO, TechStart",
    company: "Software Company",
    rating: 5
  },
  {
    quote: "This platform has transformed how we approach our projects and collaborate with clients.",
    author: "Michael Roberts",
    role: "Director, CreativeHub",
    company: "Design Studio",
    rating: 5
  }
];
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
            className=" w-full bg-cover bg-center bg-no-repeat relative flex items-end"
            style={{
              backgroundImage:
                'url("auth/hero.jpg")'
            }}
          >


            

              <TestimonialSlider testimonials={testimonials} />

   


          </div>





        </div>
      </div>
    </div>

  )
}

