"use client"

import { useState, useEffect } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from 'axios'

export default function CreateAccount() {
  const [isClient, setIsClient] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Replace with your actual payload data
    const payload = {
      username: formData.username,
      password: formData.password,
    };
  
    // Encode payload as application/x-www-form-urlencoded
    const urlEncodedPayload = new URLSearchParams();
    for (const key in payload) {
      urlEncodedPayload.append(key, payload[key]);
    }
  
    try {
      const response = await axios.post('https://absolute-chicken-wsa-server-a1ecd4e0.koyeb.app/login', urlEncodedPayload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        withCredentials: true
      });
  
      if (response.status === 200) {
        console.log('Login successful:', response.data);
        setShowSuccessModal(true);
      } else {
        console.log('Login failed:', response.status, response.data);
      }
    } catch (error) {
      console.error('Error during login:', error.response || error.message);
    }
  };

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
        <div className="w-full max-w-md space-y-8 px-4">
          <div>
            <h2 className="text-3xl font-bold text-orange-500">Welcome Back!</h2>
            <p className="mt-2 text-sm text-gray-600">
              Don't have an account? <Link href="/register" className="text-blue-500 hover:underline">Create Account</Link>
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input 
              type="text" 
              name="username" 
              placeholder="Enter your username" 
              className="h-12 text-lg px-4" 
              required 
              onChange={handleInputChange} 
            />
            <Input 
              type="password" 
              name="password" 
              placeholder="Enter your password" 
              className="h-12 text-lg px-4" 
              required 
              onChange={handleInputChange} 
            />
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white" >Log in</Button>
            </form>
            <p className="mt-2 text-sm text-gray-600">
              Login as admin?<Link href="/loginAdmin" className="text-blue-500 hover:underline">Login</Link>
            </p>
        </div>
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-16 max-w-sm w-full text-center">
              <Image src="/images/logo_succes.png" alt="Female" width={300} height={300}/>
              <h2 className="text-xl font-bold flex items-center justify-center mb-4 mt-10">Login Success</h2>
              <Button onClick={ handleContinue} className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                CONTINUE
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}