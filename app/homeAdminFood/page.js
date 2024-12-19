"use client"

import { useState } from 'react'
import { User } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Bell, Settings, LogOut, ChevronLeft, ChevronRight, ShieldOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Home } from '@/components/Managefood'

export default function HomeAdmin() {
    const [searchQuery, setSearchQuery] = useState('')
    const [isDashboardOpen, setIsDashboardOpen] = useState(true)
    const [activeSection, setActiveSection] = useState('Dashboard')
    const [activeMain, setActiveMain] = useState('Home')
    const [showSuccessModall, setShowSuccessModall] = useState(false)
    const [profileImage, setProfileImage] = useState("/images/profil.jpg")

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
            <span className="font-semibold">Hi, Giano</span>
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
            <button
                onClick={() => (handleSectionChange('Dashboard'),handleHomeChange('Home'))}
                className={`flex items-center w-full text-left ${
                activeSection === 'Dashboard' ? 'text-orange-600' : 'text-gray-600 hover:text-orange-500'
                }`}
            >
              <h2 className="text-lg font-semibold mb-4">DASHBOARD</h2> 
            </button>
              <ul className="space-y-2">
                <li>
                    <button
                        onClick={() => (handleSectionChange('manageFood'),handleHomeChange('Home'))}
                        className={`flex items-center w-full text-left ${
                        activeSection === 'manageFood' ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'
                        }`}
                    >
                        <Image src="/images/logo_Manage.png" alt="" width={20} height={20} className="mr-2" />
                        Manage Food
                    </button>
                </li>
              </ul>
            </nav>
            <div className="mb-48">
              <h2 className="text-lg font-semibold mb-4 text-gray-500">ACCOUNT</h2>
              <ul className="space-y-2">
                <li>
                    <button
                        onClick={() => (handleSectionChange(''),handleHomeChange('settings')) }
                        className={`flex items-center w-full text-left ${
                        activeMain === 'settings' ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'
                        }`}
                    >
                        <Settings className="w-5 h-5 mr-2" />
                        Setting
                    </button>
                </li>
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
                className={` ${
                isDashboardOpen ? 'grid grid-cols-2 gap-8' : 'grid grid-cols-2 gap-8 ml-8'}
                }  `}
              >
                {/* Your Goal For Today */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h1 className="text-2xl font-bold mb-4">Hi, Giano</h1>
                  <p className="text-gray-600">Good Luck</p>
                </div>

                {/* Reminder */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">REMINDER</h2>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <Image src="/images/water.png" alt="Water" width={40} height={40} className="mx-auto mb-2" />
                      <p className="font-semibold">Water</p>
                      <p className="text-sm text-gray-600">4L</p>
                    </div>
                    <div className="text-center">
                      <Image src="/images/moon.png" alt="Sleep" width={40} height={40} className="mx-auto mb-2" />
                      <p className="font-semibold">Sleep</p>
                      <p className="text-sm text-gray-600">8h</p>
                    </div>
                    <div className="text-center">
                      <Image src="/images/calories.png" alt="Calories" width={52} height={40} className="mx-auto mb-2" />
                      <p className="font-semibold">Calories</p>
                      <p className="text-sm text-gray-600">1500kcal</p>
                    </div>
                    <div className="text-center">
                      <Image src="/images/carbohydrate.png" alt="Carbohydrate" width={42} height={40} className="mx-auto mb-2" />
                      <p className="font-semibold">Carbohydrate</p>
                      <p className="text-sm text-gray-600">80g</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'Dashboard'&& (
              <div className="mt-8">
                <div
                    className={` ${
                    isDashboardOpen ? 'grid grid-cols-2 gap-8' : 'grid grid-cols-2 gap-8 ml-10'}
                    }  `}
                >
                  <h2 className="text-xl font-semibold mb-4">FOOD INFORMATION!</h2>
                </div>
                <div
                    className={` ${
                    isDashboardOpen ? 'grid grid-cols-3 gap-4' : 'grid grid-cols-3 gap-4 ml-8'}
                    }  `}
                >
                  {[1, 2, 3].map((index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <Image src={`/images/food-info-${index}.jpg`} alt={`Food Information ${index}`} width={400} height={200} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <div className="flex justify-between text-sm">
                          <span>42 gram Kalori</span>
                          <span>12 gram Gula</span>
                          <span>15 gram Karbohidrat</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'manageFood' && (
              <div
              className={` ${
                  isDashboardOpen ? '' : 'ml-8'}
                  }  `}
              >
                <Home />
              </div>
            )}
            
            {activeMain === 'settings'&& (
              <div className="h-[600px] max-w-[1200px] mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Setting Header */}
                <div className="py-4 px-6 border-b">
                  <h1 className="font-medium">SETTING</h1>
                </div>
                <div className="flex">
                  {/* Sidebar */}
                  <div className="w-40 border-r p-6">
                    <div className="flex items-center gap-2 text-gray-700">
                      <User className="h-5 w-5" />
                      <span className="text-lg">Profile</span>
                    </div>
                  </div>
                  {/* Main Content */}
                  <div className="flex-1 p-6">
                    <div className="max-w-2xl space-y-6">
                      {/* Profile Picture Section */}
                      <div className="flex items-center gap-4">
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="h-12 w-12 rounded-full object-cover bg-gray-100"
                        />
                        <div className="flex gap-2 ">
                          <label className="cursor-pointer">
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                            <Button className="bg-[#FF5C35] hover:bg-[#FF5C35]/90 text-white rounded-full px-6 ml-32">
                              Change picture
                            </Button>
                          </label>
                          <Button
                            variant="outline"
                            className="text-[#FF5C35] border-[#FF5C35] rounded-full px-6 ml-10"
                            onClick={() => setProfileImage("/images/profile.kosong.png")}
                          >
                            Delete Picture
                          </Button>
                        </div>
                      </div>      
                      <div className="space-y-4 ">
                        <div className="space-y-2">
                          <label className="text-sm text-gray-500">Username</label>
                          <Input 
                            defaultValue="Giano" 
                            className="border-gray-200 rounded-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-gray-500">Gmail</label>
                          <Input 
                            defaultValue="SakieGiano" 
                            className="border-gray-200 rounded-full"
                          />
                          <p className="text-xs text-gray-400">Available change in 23/10/2025</p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-gray-500">Date Of Birthday</label>
                          <Input 
                            defaultValue="25-Mei-2004" 
                            className="border-gray-200 rounded-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-gray-500">Gender</label>
                          <Input 
                            defaultValue="Laki-Laki" 
                            className="border-gray-200 rounded-full"
                          />
                        </div>
                      </div>
                      {/* Save Button */}
                      <div className="flex justify-end">
                        <Button className="bg-[#FF5C35] hover:bg-[#FF5C35]/90 text-white rounded-full px-6">
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
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
                      Log Out Securly
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

