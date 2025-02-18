import { LoginForm } from "@/features/login/components/Login-form";

export default function Home() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
            <div className="flex items-center justify-center p-8">
                <LoginForm />
            </div>

            <div
                className="relative bg-cover bg-center hidden md:block"
                style={{
                    backgroundImage:
                        "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image001.jpg-26XxPsrlsGOEbJBcFm1OLawiEU7tog.jpeg')",
                }}
            >
                <div className="absolute bottom-8 left-8 right-8 bg-white bg-opacity-90 p-8 rounded-lg">
                    <div className="text-2xl font-medium mb-4">
                        "We've been using Untitled to kick start every new project and can't imagine working without it."
                    </div>
                    <div className="flex justify-between items-end">
                        <div>
                            <div className="font-medium">Andi Lane</div>
                            <div className="text-sm text-gray-600">Founder, Catalog</div>
                            <div className="text-sm text-gray-600">Web Design Agency</div>
                        </div>
                        <div className="text-yellow-400">★★★★★</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

