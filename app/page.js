"use client"

import { useState, useEffect } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CreateAccount() {
  const [isClient, setIsClient] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowSuccessModal(true)
  }

  const handleContinue = () => {
    router.push('/homeUser')
  }

  if (!isClient) {
    return null // or a loading spinner
  }

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute top-16 left-16 w-[250px] h-[250px] bg-orange-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <Image
          src="/images/logo.png"
          alt="Lightning bolt"
          width={100}
          height={100}
          className="absolute top-3 left-3 z-10"
        />
        <h1 className="text-4xl font-bold text-black absolute top-40 left-56">Glucose Diary</h1>
        <div className="absolute top-60 left-40 w-full z-20">
          <Image
            src="/images/logo_doc.png"
            alt="Medical professionals"
            width={300}
            height={400}
            className='rounded-full'
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[60%]">
          <Image
            src="/images/logo_backgroundd.png"
            alt="Background pattern"
            layout="fill"
            objectFit="cover"
            className="object-bottom"
          />
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
      <div className="container relative flex  justify-center">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-5xl font-semibold tracking-tight text-orange-500">
                Welcome To Glucose Diary!
              </h1>
            </div>
            <div className="flex flex-row gap-4 justify-center">
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Link href="/login">Log In</Link>
              </Button>
              <Button asChild variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                <Link href="/register">Create Account</Link>
              </Button>
            </div>
          </div>
      </div>
    </div>
      </div>
    </div>
  );
}