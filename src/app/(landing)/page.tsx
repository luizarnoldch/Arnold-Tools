import { User2Icon } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react'

type Props = {}

const LandingPage = (props: Props) => {
  return (
    <>
      <Head>
        <title>My Landing Page</title>
        <meta name="description" content="Welcome to our landing page" />
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900">
        {/* Header Section */}
        <header className="w-full py-6 bg-white shadow-md">
          <div className="container mx-auto px-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">BrandName</h1>
            <nav className="flex gap-4">
              <Link href="#features" className="hover:text-blue-500">Features</Link>
              <Link href="#about" className="hover:text-blue-500">About</Link>
              <Link href="#contact" className="hover:text-blue-500">Contact</Link>
              <Link href="/sign-in" className="hover:text-blue-500"><User2Icon /></Link>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center flex-1 text-center p-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Welcome to Our Product</h2>
          <p className="max-w-2xl text-lg text-gray-700 mb-8">
            Build your business with our innovative solution. Get started today and grow your success.
          </p>
          <div className="space-x-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
              Get Started
            </button>
            <button className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg shadow hover:bg-gray-300 transition">
              Learn More
            </button>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="w-full py-4 bg-gray-100 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} BrandName. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}

export default LandingPage
