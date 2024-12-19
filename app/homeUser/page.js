"use client"

import { useState } from 'react'
import { User } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Bell, Search, Settings, LogOut, ChevronLeft, ChevronRight, X, ShieldOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"


export default function HomeUser() {
    const [searchQuery, setSearchQuery] = useState('')
    const [isDashboardOpen, setIsDashboardOpen] = useState(true)
    const [activeSection, setActiveSection] = useState('Dashboard')
    const [activeMain, setActiveMain] = useState('Home')
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [bookSuccessModal, setbookSuccessModal] = useState(false)
    const [showSuccessModall, setShowSuccessModall] = useState(false)
    const [selectedDoctor, setSelectedDoctor] = useState(null)
    const [selectedFood, setSelectedFood] = useState(null)
    const [profileImage, setProfileImage] = useState("/images/profil.jpg")
    const [selectedDoctorDetails, setSelectedDoctorDetails] = useState(null)
    const [selectedTime, setSelectedTime] = useState(null)
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedType, setSelectedType] = useState(null)
    const foodHistory = [
        { date: 'Today', items: [
          { name: 'Nasi Rawon', description: 'Kurang Persiasi!', portion: '2 Porsi', image: '/images/nasi-rawon.jpg' },
          { name: 'Nasi Goreng', description: 'Porsi aman!', portion: '1 Porsi', image: '/images/nasi-goreng.jpg' },
          { name: 'Mie Goreng', description: 'Porsi Aman!', portion: '1 Porsi', image: '/images/mie-goreng.jpg' },
        ]},
        { date: 'Yesterday', items: [
          { name: 'Nasi Goreng', description: 'Porsi aman!', portion: '1 Porsi', image: '/images/nasi-goreng.jpg' },
        ]},
    ]
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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleDoctorSelect = (doctorId) => {
    const doctor = doctors.find(d => d.id === doctorId)
    setSelectedDoctor(doctorId)
    setSelectedDoctorDetails(doctor)
    setActiveSection('doctorDetails')
  }

  const handleFoodSelect = (foodId) => {
    setSelectedFood(foodId)
  }

  const router = useRouter()

  const handleContinue = () => {
    router.push('/login')
  }
  

  
  const [foodItems, setRecordedFoods] = useState([
    {
      id: 1,
      name: "Nasi Goreng",
      description: "Porsi Aman",
      portion: "1 Porsi",
      image: "/images/nasigoreng.jpg"
    },
    {
      id: 2,
      name: "Nasi Rawon",
      description: "Kurang Persiasi",
      portion: "2 Porsi",
      image: "/images/nasirawon.jpeg"
    },
    {
      id: 3,
      name: "Mie Goreng",
      description: "Porsi Aman",
      portion: "1 Porsi",
      image: "/placeholder.svg?height=50&width=50"
    },
    {
      id: 4,
      name: "Ayam Goreng",
      description: "Porsi Aman",
      portion: "1 Porsi",
      image: "/placeholder.svg?height=50&width=50"
    },
    {
      id: 5,
      name: "Sayur Asem",
      description: "Porsi Aman",
      portion: "2 Porsi",
      image: "/placeholder.svg?height=50&width=50"
    },
    {
      id: 6,
      name: "Soto Ayam",
      description: "Porsi Aman",
      portion: "1 Porsi",
      image: "/placeholder.svg?height=50&width=50"
    },
    {
      id: 7,
      name: "Gado-gado",
      description: "Porsi Aman",
      portion: "1 Porsi",
      image: "/images/gado-gado.jpg"
    },
    {
      id: 8,
      name: "Rendang",
      description: "Porsi Aman",
      portion: "1 Porsi",
      image: "/placeholder.svg?height=50&width=50"
    }
  ])
  const appointmentTypes = ["Male", "Female", "Child"]
  const doctors = [
    {
      id: 1,
      name: 'Dr. Wisnu Satrio',
      spesialist: 'Endrokrinolog',
      gmail: 'wisnu@gmail.com',
      image: '/images/doctor-1.jpg',
      jadwal: ['senin', 'selasa', 'rabu', 'jumat', 'sabtu'],
    },
    {
      id: 2,
      name: 'Dr. Ananta Firdiansyah',
      spesialist: 'General',
      gmail: 'ananta@gmail.com',
      image: '/images/doctor-2.jpg',
      jadwal: ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00'],
    },
    {
      id: 3,
      name: 'Dr. Dhafi Muhammad',
      spesialist: 'Nutrition',
      gmail: 'dhafi@gmail.com',
      image: '/images/doctor-3.jpg',
      jadwal: ['09:00', '10:00', '11:00', '15:00', '16:00', '17:00'],
    },
    {
      id: 4,
      name: 'Dr. Aryo Wahyu',
      spesialist: 'Nutrition',
      gmail: 'aryo@gmail.com',
      image: '/images/dokterElnino.jpg',
      jadwal: ['09:00', '10:00'],
    },
    {
      id: 5,
      name: 'Dr. Arifin Hakim Suza',
      spesialist: 'Endokrinolog',
      gmail: 'hakim@gmail.com',
      image: '/images/dokterprof.jpg',
      jadwal: ['15:00', '16:00', '17:00'],
    },
    {
      id: 6,
      name: 'Dr. Sakie Suza',
      spesialist: 'Nutrition',
      gmail: 'Sakie@gmail.com',
      image: '/images/Giano.png',
      jadwal: ['09:00', '10:00', '15:00', '16:00'],
    },
    {
      id: 7,
      name: 'Dr. Naufal Arifin',
      spesialist: 'General',
      gmail: 'Naufala@gmail.com',
      image: '/images/doctor-7.jpg',
      jadwal: ['17:00'],
    },
    {
      id: 8,
      name: 'Dr. Naufal Hakim',
      spesialist: 'Nutrition',
      gmail: 'Naufal@gmail.com',
      image: '/images/doctor-8.jpg',
      jadwal: ['09:00', '10:00', '15:00', '16:00'],
    },
    {
      id: 9,
      name: 'Dr. Bintang Rizky',
      spesialist: 'Nutrition',
      gmail: 'Bintang@gmail.com',
      image: '/images/doctor-8.jpg',
      jadwal: ['15:00', '16:00', '17:00'],
    },
    {
      id: 10,
      name: 'Dr. Moza Qonita',
      spesialist: 'General',
      gmail: 'Moza@gmail.com',
      image: '/images/doctor-8.jpg',
      jadwal: ['09:00', '10:00'],
    }
  ]
  const sugarData = [
    { period: "Week 1", sugar: 315 },
    { period: "Week 2", sugar: 280 },
    { period: "Week 3", sugar: 350 },
    { period: "Week 4", sugar: 295 },
    { period: "Week 5", sugar: 310 },
  ]

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
            <Image src="/images/logo.png" alt="Glucose Diary Logo" width={24} height={24} />
          </div>
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            {/* <div className="relative">
              <Search className="absolute left-40 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search Record & Food History"
                className="w-full ml-36 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div> */}
          </form>
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
                        onClick={() => (handleSectionChange('recordFood'),handleHomeChange('Home'))}
                        className={`flex items-center w-full text-left ${
                        activeSection === 'recordFood' ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'
                        }`}
                    >
                        <Image src="/images/logo_recordfood.png" alt="" width={20} height={20} className="mr-2" />
                        Record Food
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => (handleSectionChange('foodHistory'),handleHomeChange('Home'))}
                        className={`flex items-center w-full text-left ${
                        activeSection === 'foodHistory' ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'
                        }`}
                    >
                        <Image src="/images/logo_foodHistory.png" alt="" width={20} height={20} className="mr-2" />
                        Food History
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => (handleSectionChange('consultDoctorSection1'),handleHomeChange('Home')) }
                        className={`flex items-center w-full text-left ${
                        activeSection === 'consultDoctorSection1' ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'
                        }`}
                    >
                        <Image src="/images/logo_konsul.png" alt="" width={20} height={20} className="mr-2" />
                        Booking Doctor
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

            {activeSection === 'recordFood' && (
              <div
              className={` ${
                  isDashboardOpen ? '' : 'ml-8'}
                  }  `}
              >
                {/* Food Input and Record Food Cards Side by Side */}
                <div className="mt-10 grid grid-cols-2 gap-8 mb-10 ">
                  {/* Food Input Card */}
                  <Card className="p-6 h-[280px]">
                    <h2 className="text-xl font-bold mb-3">Jenis Makanan</h2>
                    <Input placeholder="Makan apa hari ini?" className="mb-4" />
                    <div className="flex justify-between text-base">
                      {/* Kolom Kalori */}
                      <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold">0</span>
                        <span>gram</span>
                        <span>Kalori</span>
                      </div>
                      {/* Kolom Gula */}
                      <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold">0</span>
                        <span>gram</span>
                        <span>Gula</span>
                      </div>
                      {/* Kolom Karbohidrat */}
                      <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold">0</span>
                        <span>gram</span>
                        <span>Karbohidrat</span>
                      </div>
                    </div>
                    <Button className="w-full bg-orange-500 text-white hover:bg-gray-800 mt-7">
                      Submit
                    </Button>
                  </Card>

                  {/* Record Food Card - Scrollable Section */}
                  <Card className="p-6 h-[280px]"> {/* Set fixed height */}
                    <h2 className="text-xl font-bold mb-4">RECORD FOOD</h2>
                    <div className="h-[calc(280px-6rem)] overflow-y-auto pr-2"> {/* Calculate content height */}
                      {foodItems.map((item,index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border-b last:border-b-0"
                        >
                          <button
                            key={item.id}
                            onClick={() => handleFoodSelect(item.id)}
                            className={`flex items-center  p-2 rounded-lg mt-4 w-96 ${
                            selectedFood === item.id
                            ? 'border-2 border-orange-500 '
                            : 'border border-gray-200 hover:border-orange-200'
                            }`}
                          >
                            <div className="flex items-center gap-3 overflow-hidden">
                              <img
                                alt={item.name}
                                className="rounded-lg object-cover "
                                height="50"
                                src={item.image}
                                width="100"
                              />
                              <div>
                                <h3 className="font-semibold p-2">{item.name}</h3>
                              </div>
                            </div>
                          </button>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            )}
            
            {activeSection === 'foodHistory' && (
              <div
              className={` ${
                  isDashboardOpen ? '' : 'ml-8'}
                  }  `}
              >
                <div className="mt-10 grid grid-cols-2 gap-8 mb-10 ">
                <Card className="p-6 h-[280px]"> {/* Set fixed height */}
                  <div className="flex justify-between items-center ">
                    <h2 className="text-xl font-semibold mb-5">FOOD HISTORY</h2>
                    <button onClick={() => setShowSuccessModal(true)}className="relative mb-5">
                      <Image src="/images/logo_sort.png" alt="User Avatar" width={20} height={20}/>
                    </button>
                  </div>
                  <div className="h-[calc(280px-6rem)] overflow-y-auto pr-2">
                    {foodHistory.map((day, dayIndex) => (
                      <div key={dayIndex} className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">{day.date}</h3>
                        {day.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center space-x-4 bg-gray-50 p-2 rounded-lg mb-2">
                            <Image src={item.image} alt={item.name} width={60} height={60} className="rounded-md" />
                              <div className="flex-1">
                                <h4 className="font-semibold">{item.name}</h4>
                                <p className="text-sm text-gray-600">{item.description}</p>
                              </div>
                              <div className="text-sm font-semibold">{item.portion}</div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </Card>
                <Card className="p-6 h-[280px]"> {/* Set fixed height */}
                    <h2 className="text-xl font-bold mb-4">Sugar Consumption (Per 7-Day Period)</h2>
                    <div className="h-[calc(280px-6rem)] overflow-y-auto pr-2"> {/* Calculate content height */}
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={sugarData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="period" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="sugar"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    </div>
                  </Card>
                  </div>
              </div>
            )}

            {showSuccessModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-56 z-50">
                <div className="bg-white rounded-2xl p-6 w-80">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Sort by date</h3>
                    <button onClick={() => setShowSuccessModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex gap-2 space-4">
                    <input
                      type="date"
                      className="p-2 border border-gray-200 rounded-lg"
                    />
                    <button
                      className="flex-1 p-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                    >
                      Sort
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'consultDoctorSection1'&& (
              <div className="mt-8">
                <div
                  className={` ${
                  isDashboardOpen ? '' : 'ml-10'}
                  }`}
                >
                  <div className="bg-white border border-gray-200 rounded-lg p-4"> 
                    <div className="h-[250px] overflow-y-auto pr-2"> 
                      <div className="grid grid-cols-4 gap-3"> 
                        {doctors.map((doctor) => (
                          <button 
                            key={doctor.id}
                            onClick={() => (handleDoctorSelect(doctor.id),handleHomeChange('Home'))}
                            className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                            selectedDoctor === doctor.id
                            ? 'border-2 border-orange-500'
                            : 'border border-gray-200 hover:border-orange-200'
                            }`}
                          >
                            <div className="w-16 h-16 mb-2 rounded-lg overflow-hidden"> 
                              <Image
                                src={doctor.image}
                                alt={doctor.name}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <h3 className="font-semibold text-center text-sm">{doctor.name}</h3> {/* Update 2: Added text-sm */}
                            <p className="text-xs text-gray-600">{doctor.spesialist}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'doctorDetails' && selectedDoctorDetails && (
              <Card className=" mt-8 p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column - Doctor Info */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-64 h-64 mb-4">
                        <Image
                            src={selectedDoctorDetails.image}
                            alt={selectedDoctorDetails.name}
                            fill
                            className="rounded-lg object-cover"
                        />
                    </div>
                    <h2 className="text-2xl font-bold">{selectedDoctorDetails.name}</h2>
                    <p className="text-gray-600">{selectedDoctorDetails.spesialist} Specialist</p>
                  </div>
                  {/* Right Column - Booking Options */}
                  <div className="space-y-6">
                    {/* Working Hours */}
                    <div>
                        <h3 className="font-semibold mb-1">Working Hours</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedDoctorDetails.jadwal.map((time) => (
                            <Button
                              key={time}
                              variant={selectedTime === time ? "default" : "outline"}
                              onClick={() => setSelectedTime(time)}
                              className="w-24"
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                    </div>
                    {/* Schedule */}
                    {/* <div>
                      <h3 className="font-semibold mb-3">Schedules</h3>
                      <div className="flex gap-2">
                        {selectedDoctorDetails.dates.map(({ day, date }) => (
                          <Button
                            key={date}
                            variant={selectedDate === date ? "default" : "outline"}
                            onClick={() => setSelectedDate(date)}
                            className="w-20 h-12 flex flex-col"
                          >
                            <span className="text-sm">{day}</span>
                            <span>{date}</span>
                          </Button>
                        ))}
                      </div>
                    </div> */}
                    {/* Appointment Type */}
                    <div>
                      <h3 className="font-semibold mb-3">Appointment For</h3>
                      <div className="flex gap-2">
                        {appointmentTypes.map((type) => (
                          <Button
                            key={type}
                            variant={selectedType === type ? "default" : "outline"}
                            onClick={() => setSelectedType(type)}
                            className="w-24"
                          >
                            {type}
                          </Button>
                        ))}
                      </div>
                    </div>
                    {/* Book Now Button */}
                    <Button 
                        onClick={() => setbookSuccessModal(true)}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                        size="lg"
                    >
                        Book Now
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {bookSuccessModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-16 max-w-sm w-full text-center">
                  <Image src="/images/logo_succes.png" alt="Female" width={300} height={300}/>
                  <h2 className="text-xl font-bold flex items-center justify-center mb-4 mt-10">Book Success</h2>
                  <Button onClick={() => (handleSectionChange('consultDoctorSection1'),handleHomeChange('Home'),setbookSuccessModal(false))} className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    Back to Booking Doctor Menu
                  </Button>
                </div>
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

