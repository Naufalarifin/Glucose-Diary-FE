"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft} from 'lucide-react'
import axiosInstance from '@/lib/axios'

export default function CreateAccount() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [agreed, setAgreed] = useState(false)
    const [gender, setGender] = useState('')
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      dateBirth: '',
    })
    const [isLoading, setLoading] = useState(false)
  
    const handleNextStep = () => {
      setStep(2)
    }
  
    const handlePrevStep = () => {
      setStep(1)
    }
  
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault()
        if (step === 1) {
          handleNextStep()
        } else {
          if (gender) {
            setLoading(true)
            const payload = {
              username: formData.firstName + formData.lastName,
              email: formData.email,
              password: formData.password,
              dateBirth: formData.dateBirth,
              gender: gender,
            }
            try {
              const response = await axiosInstance.post('/user', payload);
              if (response.status === 200) {
                setShowSuccessModal(true);
              }
            } catch (error) {
              if (error.response) {
                alert(error.response.data.message[0]);
              }
            }
          } else {
            alert("Please select a gender")
          }
          setLoading(false)
        }
      }

      const handleContinue = () => {
        router.push('/homeUser')
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
        {step === 1 ? (
            <>
          <div>
            <h2 className="text-3xl font-bold text-orange-500">Create Account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Log in</Link>
            </p>
          </div>
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
            <div className="flex gap-4">
              <Input type="text" name="firstName" placeholder="First Name" className="flex-1" required onChange={handleInputChange} />
              <Input type="text" name="lastName" placeholder="Last Name" className="flex-1" required onChange={handleInputChange} />
            </div>
            <Input type="email" name="email" placeholder="Enter your email" required onChange={handleInputChange} />
            <Input type="password" name="password" placeholder="Enter your password" required onChange={handleInputChange} />
            <div className="flex items-center">
              <Checkbox id="terms" checked={agreed} onCheckedChange={setAgreed} />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                Agree to our <Link href="/terms" className="text-orange-500 hover:underline">Terms of use</Link> and <Link href="/privacy" className="text-orange-500 hover:underline">Privacy Policy</Link>
              </label>
            </div>
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white" disabled={!agreed}>Next</Button>
          </form>
        </>
        ) : (
        <>
              <div className="flex items-center">
                <Button variant="ghost" onClick={handlePrevStep} className="p-0 hover:bg-transparent">
                  <ArrowLeft className="h-6 w-6 text-gray-500" />
                </Button>
                <h2 className="text-3xl font-bold text-orange-500 ml-4">Fill Data</h2>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Fill with your birth date and gender
              </p>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <Input type="date" name="dateBirth" placeholder="Date of birth" className="h-12 text-lg px-4" required onChange={handleInputChange} />
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Gender</p>
                  <div className="flex gap-4">
                    <div
                      className={`flex-1 flex flex-col items-center justify-center cursor-pointer border-2 ${
                        gender === 'male' ? 'border-black' : 'border-transparent'
                      } transition-colors duration-200 p-2 rounded-xl`}
                      onClick={() => setGender('male')}
                    >
                      <Image src="/images/logo_malee.png" alt="Male" width={70} height={70} />
                      <span className="mt-2">Male</span>
                    </div>
                    <div
                      className={`flex-1 flex flex-col items-center justify-center cursor-pointer border-2 ${
                        gender === 'female' ? 'border-black' : 'border-transparent'
                      } transition-colors duration-200 p-2 rounded-xl`}
                      onClick={() => setGender('female')}
                    >
                      <Image src="/images/logo_femalee.png" alt="Female" width={70} height={70} />
                      <span className="mt-2">Female</span>
                    </div>
                  </div>
                </div>
                <Button disabled={isLoading} type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">{isLoading ? "Loading..." : "Create Account"}</Button>
              </form>
            </>
          )}
        </div>
      </div>
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-16 max-w-sm w-full text-center">
            <Image src="/images/logo_succes.png" alt="Female" width={300} height={300}/>
            <h2 className="text-xl font-bold flex items-center mb-4 mt-10">Create Account Success</h2>
            <Button onClick={handleContinue} className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              CONTINUE
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
