"use client"

import { useState, useEffect } from 'react'
import { User } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Bell, Settings, LogOut, ChevronLeft, ChevronRight, ShieldOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HomeAdminUser} from '@/components/Manageuser'
import axiosInstance from "@/lib/axios"

export default function HomeAdmin() {
    const [searchQuery, setSearchQuery] = useState('')
    const [isDashboardOpen, setIsDashboardOpen] = useState(true)
    const [activeSection, setActiveSection] = useState('manageUser')
    const [activeMain, setActiveMain] = useState('Home')
    const [showSuccessModall, setShowSuccessModall] = useState(false)
    const [profileImage, setProfileImage] = useState("/images/profil.jpg")
    const [adminData, setAdminData] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
          setProfileImage(reader.result)
        }
        reader.readAsDataURL(file)
      }
    }

  useEffect(() => {
        if (typeof window !== "undefined"){
          setAdminData(JSON.parse(localStorage.getItem("userData")))
        }
  }, [])
  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search functionality
    console.log('Searching for:', searchQuery)
  }

  const toggleDashboard = () => {
    setIsDashboardOpen(!isDashboardOpen)
  }

  const handleSectionChange = (section) => {
    setActiveSection(section)
  }

  const handleHomeChange = (section) => {
    setActiveMain(section)
  }

  const router = useRouter()

  const handleContinue = () => {
    axiosInstance.post('http://localhost:8080/logout')
    .then(() => {
      console.log("user logged out")
    })
    .catch((error) => {
      // Suppress 404 if user is successfully logged out
      if (error.response && error.response.status === 404) {
        console.warn('Ignore 404 on logout redirect');
      } else {
        console.error('Logout error:', error);
      }
    });
    router.push('/login')
  }
  
  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
            <Image src="/images/logo.png" alt="Glucose Diary Logo" width={24} height={24} />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative">
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full"></span>
          </button>
          <div className="flex items-center space-x-2">
            <img
                        src={profileImage}
                        alt="Profile"
                        className="rounded-full object-cover bg-gray-100"
                        width={32}
                        height={32}
            />
            <span className="font-semibold">Hi, {adminData ? adminData.username : ""}</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <button
          onClick={toggleDashboard}
          className={`absolute top-1/2 ${
            isDashboardOpen ? 'left-48 w-5 h-16 bg-orange-500 rounded-l-full flex items-center' : 'left-0 w-5 h-16 bg-orange-500 rounded-r-full flex items-center'
          }  justify-center transition-all duration-300 ease-in-out z-20`}
        >
          {isDashboardOpen ? (
            <ChevronLeft className="w-4 h-4 text-white" />

          ) : (
            <ChevronRight className="w-4 h-4 text-white" />
          )}
        </button>
        {/* Dashboard */}
        <aside className={`w-56 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${isDashboardOpen ? '' : '-ml-64'}`}>
          <div className="p-4 h-full flex flex-col">
            <nav className="flex-1">
              <ul className="space-y-2">
                <li>
                    <button
                        onClick={() => (handleSectionChange('manageUser'),handleHomeChange('Home'))}
                        className={`flex items-center w-full text-left ${
                        activeSection === 'manageUser' ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'
                        }`}
                    >
                        <Image src="/images/logo_Manage.png" alt="" width={20} height={20} className="mr-2" />
                        Manage User
                    </button>
                </li>
              </ul>
            </nav>
            <div className="mb-48">
              <h2 className="text-lg font-semibold mb-4 text-gray-500">ACCOUNT</h2>
              <ul className="space-y-2">
                <li>
                    <button onClick={() => setShowSuccessModall(true)}className="relative mb-5 flex items-center text-gray-600 hover:text-orange-500">
                        <LogOut className="w-5 h-5 mr-2" /> Logout   
                    </button>
                </li>
              </ul>
            </div>
          </div>
          {/* Dashboard Toggle Button */}

        </aside>

        {/* Main Content */}
        <main className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out`}>
          <div className="p-8">
            {activeMain === 'Home'&& (
              <div
                className={`w-full px-8`}
              >
                {/* Your Goal For Today */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h1 className="text-2xl font-bold mb-4">Hi, {adminData ? adminData.username : ""}</h1>
                  <p className="text-gray-600">Good Luck</p>
                </div>

              </div>
            )}

            {activeSection === 'manageUser' && (
              <div
              className={` ${
                  isDashboardOpen ? '' : 'ml-8'}
                  }  `}
              >
                <HomeAdminUser />
              </div>
            )}
            
            {showSuccessModall && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-56 z-50">
                <div className="bg-white rounded-2xl p-6 w-80">
                  <div className="flex items-center mt-7 ml-24">
                    <div className="w-16 h-16 rounded-full bg-[#FF5C35]/10 flex items-center justify-center">
                      <ShieldOff className="h-8 w-8 text-[#FF5C35]" />
                    </div>
                  </div>
                  <div className="flex items-center justify-center mt-5">
                    Ready to logout?
                  </div>
                  <div className="flex items-center text-center text-gray-500 text-sm ">
                    Your health data will be secured and your session will end.
                  </div>
                  <div className="flex space-4">
                    <button onClick={handleContinue}
                      className="flex-1 p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 mt-5"
                    >
                      Log Out Securely
                    </button>
                  </div>
                  <div className="flex space-4">
                    <button
                      onClick={() => setShowSuccessModall(false)} className="flex-1 p-2 border border-gray-200  text-orange-500 rounded-lg mt-5"
                    >
                      Stay Connected
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

