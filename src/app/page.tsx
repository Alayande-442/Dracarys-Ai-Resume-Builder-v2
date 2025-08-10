import Image from "next/image";
import logo from "@/assets/main-logo.jpeg";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-100 px-5 py-12 text-center text-gray-900 md:flex-row md:text-start lg:gap-12">
      <div className="max-w-prose space-y-3">
        <Image
          src={logo}
          alt="Logo"
          width={150}
          height={150}
          className="mx-auto md:ms-0"
        />
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Build your{" "}
          <span className="inline-block text-purple-800">standout resume</span>{" "}
          in minutes
        </h1>
      </div>
    </main>
  );
}
