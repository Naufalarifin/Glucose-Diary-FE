"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { LoadingSpinner } from "@/components/ui/loading"
import axiosInstance from "@/lib/axios"
import { ChevronLeft, ChevronRight, LogOut, Settings, ShieldOff, User } from 'lucide-react'
import moment from "moment"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { use, useEffect, useRef, useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function HomeUser() {
    const [data, setData] = useState([])
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
    const [selectedType, setSelectedType] = useState(null)
    const [searchFood, setSearchFood] = useState("")
    const [detailUser, setDetailUser] = useState(null)
    const [loadingUpdateUser, setLoadingUpdateUser] = useState(false)
    const [userData, setUserData] = useState(null)
    const [doctorData, setdoctorData] = useState(null)
    const [bookDoctorData, setBookDoctor] = useState(null)
    const [foodHistory, setFoodHistory] = useState(null)
    const [weeklySugar, setWeeklySugar] = useState(0)
    const [userAnalyze, setUserAnalyze] = useState("")
    const fileInputRef = useRef(null)

  const handleChangeImage = () => {
    fileInputRef.current.click(); // Trigger the file input click
  };
  
    useEffect(() => {
      axiosInstance.get('/food')
      .then(response =>{
        setData(response.data.payload)
      })
      .catch(error =>{
        console.error(error)
      });
    }, []);


    useEffect(() => {
      if (typeof window !== "undefined"){
        setUserData(JSON.parse(localStorage.getItem("userData")))
      }
    }, [])

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
    const doctor = doctorData.find(d => d.doctorId === doctorId)
    setSelectedDoctor(doctorId)
    setSelectedDoctorDetails(doctor)
    setActiveSection('doctorDetails')
  }

  const handleFoodSelect = (food) => {
    setSelectedFood(food)
  }

  const router = useRouter()

  const handleContinue = () => {
    router.push('/login')
  }
  

 
  const sugarData = [
    { period: "Week 1", sugar: 315 },
    { period: "Week 2", sugar: 280 },
    { period: "Week 3", sugar: 350 },
    { period: "Week 4", sugar: 295 },
    { period: "Week 5", sugar: 310 },
  ]

  const filteredFood = data.filter(item => 
    item.name.toLowerCase().includes(searchFood.toLowerCase())
  )

  const getFormattedDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmitFoodRecord = () => {
    const payload = {
      recordDate: getFormattedDate(),
      food: selectedFood,
      user: userData
    }

    axiosInstance.post('/food-record', payload)
    .then(() => {
      alert("Food Record Berhasil Ditambahkan")
    })
    .catch(error => {
      console.log(error)
    })
  }

  const getUserDetail = () => {
    axiosInstance.get(`/user/${userData.userId}`)
    .then(response => {
      localStorage.setItem("userData", JSON.stringify(response.data.payload))
      setDetailUser(response.data.payload)
    })
    .catch(error => {
      console.log(error)
    })
  }

  const putUserDetail = () => {
    setLoadingUpdateUser(true)
    const payload ={
      username : detailUser.username,
      email: detailUser.email,
      dateBirth: detailUser.dateBirth,
      gender: detailUser.gender,
      password: detailUser.password,
      images: detailUser.images
    }
    axiosInstance.put(`/user/${detailUser.userId}`, payload)
    .then(() => {
      alert("Data Berhasil Diubah")
      setLoadingUpdateUser(false)
      getUserDetail()
      location.reload()
    })
    .catch(error => {
      console.log(error)
      setLoadingUpdateUser(false)
    })
  }
  
  const handleChangeUserData = (name, value) => {
    detailUser[name] = value
  }

  const handleProfileChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newImage = e.target.result
        setProfileImage(newImage)
      }
      reader.readAsDataURL(file)
    }
  }

  const getDoctor = () => {
    axiosInstance.get(`/doctor`)
    .then(response => {
      setdoctorData(response.data.payload)
    })
    .catch(error => {
      console.log(error)
    })
  }

  const getBookDoctor = () => {
    axiosInstance.get(`/book-doctor`)
    .then(response => {
      setBookDoctor(response.data.payload
        .filter(record => record.user.userId === userData.userId))
    })
    .catch(error => {
      console.log(error)
    })
  }

  const handleSubmitBookDoctor = () => {
    const payload = {
      bookingDate: getFormattedDate(),
      doctor: selectedDoctorDetails,
      user: userData
    }

    axiosInstance.post('/book-doctor', payload)
    .then(() => {
      setbookSuccessModal(true)
    })
    .catch(error => {
      console.log(error)
    })
  }

  
  const modelPintar = async () => {
    const sugarThreshold = 200;
    const age = userData ? new Date().getFullYear() - new Date(userData.dateBirth).getFullYear() : 0;

    if (userData) {
      await axiosInstance.get(`/food-record/week-data`)
      .then(response => {
        const sugarLevelSum = response.data.payload
          .filter(record => record.user.userId === userData.userId) // Filter records by userId
          .reduce((sum, record) => sum + record.food.sugarLevel, 0);
        setWeeklySugar(sugarLevelSum)
      })
      .catch(error => {
        console.log(error)
      })
    
      if (weeklySugar > sugarThreshold) {
          if (age > 70) {
              if (weeklySugar > sugarThreshold * 2) {
                  setUserAnalyze("Usia di atas 70 tahun dengan konsumsi gula sangat tinggi meningkatkan risiko gagal ginjal, penyakit jantung, dan diabetes akut.");
              } else {
                  setUserAnalyze("Usia di atas 70 tahun dengan konsumsi gula tinggi meningkatkan risiko komplikasi metabolisme. Kurangi gula segera.");
              }
          } else if (age > 60) {
              if (weeklySugar > sugarThreshold * 1.8) {
                  setUserAnalyze("Usia 60–70 tahun dengan konsumsi gula tinggi meningkatkan risiko serangan jantung dan komplikasi kronis.");
              } else {
                  setUserAnalyze("Konsumsi gula berlebih di usia ini meningkatkan risiko tekanan darah tinggi dan resistensi insulin.");
              }
          } else if (age > 50) {
              if (gender.equalsIgnoreCase("Female") && weeklySugar > sugarThreshold * 1.5) {
                  setUserAnalyze("Wanita di usia 50-an berisiko osteoporosis dan diabetes akibat konsumsi gula tinggi.");
              } else if (gender.equalsIgnoreCase("Male") && weeklySugar > sugarThreshold * 1.4) {
                  setUserAnalyze("Pria di usia 50-an dengan konsumsi gula tinggi berisiko gangguan metabolisme dan hipertensi.");
              } else {
                  setUserAnalyze("Konsumsi gula Anda terlalu tinggi. Risiko diabetes meningkat di usia 50-an.");
              }
          } else if (age > 40) {
              if (weeklySugar > sugarThreshold * 1.5) {
                  setUserAnalyze("Usia 40-an dengan konsumsi gula tinggi meningkatkan risiko obesitas dan resistensi insulin.");
              } else if (gender.equalsIgnoreCase("Female")) {
                  setUserAnalyze("Wanita di usia 40-an berisiko gangguan hormonal akibat gula berlebih.");
              } else {
                  setUserAnalyze("Pria di usia 40-an berisiko perlemakan hati dengan konsumsi gula tinggi.");
              }
          } else if (age > 30) {
              if (weeklySugar > sugarThreshold * 1.3) {
                  setUserAnalyze("Konsumsi gula tinggi di usia 30-an dapat memicu gangguan metabolisme dan penumpukan lemak.");
              } else {
                  setUserAnalyze("Konsumsi gula berlebih di usia ini dapat meningkatkan risiko penyakit jangka panjang.");
              }
          } else if (age > 20) {
              if (weeklySugar > sugarThreshold * 1.2) {
                  setUserAnalyze("Usia 20-an dengan konsumsi gula tinggi berisiko gangguan pankreas dan resistensi insulin.");
              } else {
                  setUserAnalyze("Konsumsi gula tinggi di usia muda dapat memengaruhi fungsi tubuh jangka panjang.");
              }
          } else {
              if (weeklySugar > sugarThreshold) {
                  setUserAnalyze("Remaja dengan konsumsi gula tinggi berisiko obesitas, kerusakan gigi, dan gangguan kesehatan lainnya.");
              } else {
                  setUserAnalyze("Konsumsi gula Anda masih terlalu tinggi untuk usia muda. Kurangi makanan manis.");
              }
          }
      } else if (weeklySugar > sugarThreshold * 0.8) {
          if (age < 20) {
              setUserAnalyze("Konsumsi gula sedikit tinggi untuk usia remaja. Kurangi konsumsi makanan manis.");
          } else if (age > 40) {
              setUserAnalyze("Konsumsi gula Anda sedikit di atas ambang aman. Pertimbangkan pengurangan gula lebih lanjut.");
          } else {
              setUserAnalyze("Konsumsi gula sedikit tinggi, tetapi masih dalam batas wajar. Tetap perhatikan pola makan.");
          }
      } else if (weeklySugar < sugarThreshold * 0.5) {
          if (age > 60) {
              setUserAnalyze("Konsumsi gula rendah untuk usia di atas 60 tahun. Ini baik untuk kesehatan jangka panjang.");
          } else if (age > 30) {
              setUserAnalyze("Konsumsi gula Anda rendah. Ini menunjukkan pola makan yang sehat.");
          } else {
              setUserAnalyze("Konsumsi gula rendah baik untuk usia muda. Pastikan energi cukup untuk aktivitas harian.");
          }
      } else {
          setUserAnalyze("Konsumsi gula Anda berada dalam batas aman. Pertahankan pola makan ini.");
      }
    }
  }
  
  const getFoodHistory = () => {
    axiosInstance.get(`/food-record`)
    .then(response => {
      setFoodHistory(response.data.payload
        .filter(record => record.user.userId === userData.userId))
    })
    .catch(error => {
      console.log(error)
    })
  }

  const processDataForChart = (data) => {
    if (data) {
      const grouped = {};
      
      data.forEach((record) => {
        const recordDate = moment(record.recordDate);
        const weekOfMonth = Math.ceil(recordDate.date() / 7); // Calculate week in the month
        // const monthYear = recordDate.format("MMMM yyyy");
        const week = `Week ${weekOfMonth}`; // Format as "Week X of Month Year"
  
        if (!grouped[week]) {
          grouped[week] = { sugarSum: 0, count: 0 };
        }
        grouped[week].sugarSum += record.food.sugarLevel;
        grouped[week].count += 1;
      });
  
      return Object.entries(grouped).map(([week, { sugarSum, count }]) => ({
        period: week,
        sugar:sugarSum,
      }));
    }
  };

  useEffect(() => {
    modelPintar()
  }, [userData])

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
                        src={userData ? userData.images : null}
                        alt="Profile"
                        className="rounded-full object-cover bg-gray-100"
                        width={32}
                        height={32}
            />
            <span className="font-semibold">Hi,{userData ? userData.username : ""}</span>
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
                        onClick={() => (handleSectionChange('recordFood'),handleHomeChange(''))}
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
                        onClick={() => (handleSectionChange('foodHistory'),handleHomeChange(''),getFoodHistory())}
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
                        onClick={() => (handleSectionChange('consultDoctorSection1'),handleHomeChange('HDoctor'), getDoctor(), getBookDoctor()) }
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
                        onClick={() => (handleSectionChange(''),handleHomeChange('settings'), getUserDetail()) }
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
        <main className={`flex-1 overflow-y-auto  duration-300 `}>
          <div className="p-8">
            {activeMain === 'Home'&& (
              <div
                className={` ${
                isDashboardOpen ? 'grid grid-cols-2 gap-8' : 'grid grid-cols-2 gap-8 ml-8'}
                }  `}
              >
                {/* Your Goal For Today */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h1 className="text-2xl font-bold mb-4">Hi, {userData ? userData.username : ""}</h1>
                  <p className="text-gray-600">Good Luck</p>
                </div>

                {/* Reminder */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">MODEL PINTAR</h2>
                  <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-4">
                    <div className="text-center">
                      <p className="font-semibold">Age</p>
                      <p className="text-lg">{userData ? new Date().getFullYear() - new Date(userData.dateBirth).getFullYear() : 0}</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">Weekly Sugar</p>
                      <p className="text-lg">{weeklySugar}gr</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">Sugar Threshold</p>
                      <p className="text-lg">200gr</p>
                    </div>
                  </div>
                  <p className="font-normal">{userAnalyze}</p>
                </div>
              </div>
            )}
             {activeMain === 'HDoctor'&& (
              <div
                className={` ${
                isDashboardOpen ? 'grid grid-cols-2 gap-8' : 'grid grid-cols-2 gap-8 ml-8'}
                }  `}
              >
                {/* Your Goal For Today */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h1 className="text-2xl font-bold mb-4">Hi, {userData ? userData.username : ""}</h1>
                  <p className="text-gray-600">Good Luck</p>
                </div>

                {/* Reminder */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">STATUS BOOKING</h2>
                  <div className="flex w-full gap-2">
                    {bookDoctorData && bookDoctorData.map((item, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 flex gap-4 min-w-full">
                        <div className="w-24 h-24 mb-2 rounded-lg overflow-hidden"> 
                          <Image
                            src={item.doctor.images}
                            alt={item.doctor.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col items-start">
                          <div className="p-1 bg-black text-white text-xs rounded-lg">Booked</div>
                          <h3 className="font-semibold text-center text-base">{item.doctor.name}</h3> {/* Update 2: Added text-sm */}
                          <p className="text-sm text-gray-600">{item.doctor.speciality}</p>
                          <p className="text-sm text-gray-600">{item.bookingDate}</p>
                        </div>
                      </div>
                    ))}
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
                  {data.length ? data.map((item, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <Image src={item.images} alt={`Food Information ${index}`} width={400} height={200} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <div className="flex justify-between text-sm">
                          <span>{item.name}</span>
                          {/* <span>42 gram Kalori</span> */}
                          <span>{item.sugarLevel} gram Gula</span>
                          {/* <span>15 gram Karbohidrat</span> */}
                        </div>
                      </div>
                    </div>
                  )) : <LoadingSpinner />}
                </div>
              </div>
            )}
            
        
            {activeSection === 'recordFood' && (
             <div
             className={` ${
                 isDashboardOpen ? '' : 'ml-8'}
                 }  `}
             >
             <div className="grid grid-cols-2 gap-8 ">
             {/* Left Column */}
             <div className="space-y-8">
               {/* Welcome Section */}
               <div className="bg-white border border-gray-200 rounded-lg p-6 h-48">
                 <h1 className="text-2xl font-bold mb-4">Hi, {userData ? userData.username : ""}</h1>
                 <p className="text-gray-600">Good Luck</p>
               </div>
     
               {/* Chart Section */}
               <div className="bg-white border border-gray-200 rounded-lg p-6">
               <h2 className="text-xl font-bold mb-3">Jenis Makanan</h2>
                         <Input placeholder="Makan apa hari ini?" className="mb-4"  onChange={(e) => setSearchFood(e.target.value)} />
                         <div className="flex justify-between text-base">
                           <div className="flex flex-col items-center">
                             {/* <span className="text-2xl font-bold">0</span>
                             <span>gram</span>
                             <span>Kalori</span> */}
                           </div>
                           <div className="flex flex-col items-center">
                             <span className="text-2xl font-bold">{selectedFood ? selectedFood.sugarLevel : 0}</span>
                             <span>gram</span>
                             <span>Gula</span>
                           </div>
                         <div className="flex flex-col items-center">
                         {/* <span className="text-2xl font-bold">0</span>
                         <span>gram</span>
                         <span>Karbohidrat</span> */}
                       </div>
                      </div>
                   <Button className="w-full bg-orange-500 text-white hover:bg-gray-800 mt-7" onClick={handleSubmitFoodRecord}>
                       Submit
                   </Button>
               </div>
             </div>
     
             {/* Right Column - Food History */}
             <div className="bg-white border border-gray-200 rounded-lg p-6">
             <h2 className="text-xl font-bold mb-4">RECORD FOOD</h2>
                         <div className="h-[calc(400px)] overflow-y-auto pr-2"> {/* Calculate content height */}
                           {filteredFood.length && filteredFood.map((item, index) => (
                             <div
                               key={index}
                               className="flex items-center justify-between p-3 border-b last:border-b-0"
                             >
                               <button
                                 key={item.id}
                                 onClick={() => handleFoodSelect(item)}
                                 className={`flex items-center  p-2 rounded-lg mt-4 w-96 ${selectedFood &&
                                 selectedFood.foodID === item.foodID
                                 ? 'border-2 border-orange-500 '
                                 : 'border border-gray-200 hover:border-orange-200'
                                 }`}
                               >
                                 <div className="flex items-center gap-3 overflow-hidden">
                                   <img
                                     alt={item.name}
                                     className="rounded-lg object-cover "
                                     height="50"
                                     src={item.images}
                                     width="100"
                                   />
                                   <div className="flex flex-col items-start">
                                     <h3 className="font-semibold">{item.name}</h3>
                                     <span className="text-left">{item.sugarLevel}</span>
                                   </div>
                                 </div>
                               </button>
                             </div>
                           ))}
                         </div>
             </div>
           </div>
             </div>
            )}
            
         {activeSection === 'foodHistory' && (
        <div
        className={` ${
            isDashboardOpen ? '' : 'ml-8'}
            }  `}
        >
        <div className="grid grid-cols-2 gap-8 ">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 h-48">
            <h1 className="text-2xl font-bold mb-4">Hi, {userData ? userData.username : ""}</h1>
            <p className="text-gray-600">Good Luck</p>
          </div>

          {/* Chart Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">Sugar Consumption (Per 7-Day Period)</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={processDataForChart(foodHistory)}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="period" 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    ticks={[0, 90, 180, 270, 360]}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "10px",
                    }} 
                    labelStyle={{ fontWeight: "bold" }} 
                    formatter={(value) => `${value} gr`}
                  />
                  <Line
                    type="monotone"
                    dataKey="sugar"
                    stroke="#000"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#000" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column - Food History */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">FOOD HISTORY</h2>
            <button onClick={() => setShowSuccessModal(true)}>
              <Image 
                src="/images/logo_sort.png" 
                alt="Sort" 
                width={20} 
                height={20}
              />
            </button>
          </div>

          <div className="space-y-8">
            {foodHistory && foodHistory.map((item, index) => (
              <div key={index}>
                {/* <h3 className="text-sm font-medium text-gray-500 mb-4">{day.date}</h3> */}
                <div key={index} className="flex items-start gap-4">
                  <Image
                    src={item.food.images}
                    alt={item.food.name}
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-lg">{item.food.name}</h4>
                    <p className="font-medium text-base">{item.food.sugarLevel}gr</p>
                    <p className="font-medium text-sm text-gray-400">{item.recordDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
        </div>
      )}

{showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Sort Options</h2>
            <div className="space-y-2">
              <button 
                className="w-full text-left p-2 hover:bg-gray-100 rounded-lg"
                onClick={() => setShowSuccessModal(false)}
              >
                Sort by Date
              </button>
              <button 
                className="w-full text-left p-2 hover:bg-gray-100 rounded-lg"
                onClick={() => setShowSuccessModal(false)}
              >
                Sort by Name
              </button>
              <button 
                className="w-full text-left p-2 hover:bg-gray-100 rounded-lg"
                onClick={() => setShowSuccessModal(false)}
              >
                Sort by Portion
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
                        {doctorData && doctorData.map((doctor) => (
                          <button 
                            key={doctor.doctorId}
                            onClick={() => (handleDoctorSelect(doctor.doctorId),handleHomeChange('HDoctor'))}
                            className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                            selectedDoctor === doctor.doctorId
                            ? 'border-2 border-orange-500'
                            : 'border border-gray-200 hover:border-orange-200'
                            }`}
                          >
                            <div className="w-16 h-16 mb-2 rounded-lg overflow-hidden"> 
                              <Image
                                src={doctor.images}
                                alt={doctor.name}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <h3 className="font-semibold text-center text-sm">{doctor.name}</h3> {/* Update 2: Added text-sm */}
                            <p className="text-xs text-gray-600">{doctor.speciality}</p>
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
                            src={selectedDoctorDetails.images}
                            alt={selectedDoctorDetails.name}
                            fill
                            className="rounded-lg object-cover"
                        />
                    </div>
                    <h2 className="text-2xl font-bold">{selectedDoctorDetails.name}</h2>
                    <p className="text-gray-600">{selectedDoctorDetails.speciality} Specialist</p>
                  </div>
                  {/* Right Column - Booking Options */}
                  <div className="space-y-6">
                    {/* Working Hours */}
                    <div>
                        <h3 className="font-semibold mb-1">Working Day</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedDoctorDetails.practiceDay.split(",").map((time) => (
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
                    {/* Book Now Button */}
                    <Button 
                        onClick={() => handleSubmitBookDoctor()}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                        size="lg"
                        disabled={bookDoctorData.length > 0}
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
                  <Button onClick={() => (handleSectionChange('consultDoctorSection1'),handleHomeChange('HDoctor'),setbookSuccessModal(false), getBookDoctor())} className="w-full bg-orange-500 hover:bg-orange-600 text-white">
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
                          src={userData ? userData.images : null}
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
                            <Button onClick={handleChangeImage} className="bg-[#FF5C35] hover:bg-[#FF5C35]/90 text-white rounded-full px-6 ml-32">
                              Change picture
                            </Button>
                            <input
                              type="file"
                              ref={fileInputRef}
                              style={{ display: 'none' }}
                              accept="image/*"
                              onChange={handleProfileChange}
                            />
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
                            defaultValue={detailUser && detailUser.username}
                            className="border-gray-200 rounded-full"
                            onChange={(e) => handleChangeUserData("username", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-gray-500">Gmail</label>
                          <Input 
                            defaultValue={detailUser && detailUser.email} 
                            className="border-gray-200 rounded-full"
                            onChange={(e) => handleChangeUserData("email", e.target.value)}
                          />
                          <p className="text-xs text-gray-400">Available change in 23/10/2025</p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-gray-500">Date Of Birthday</label>
                          <Input 
                            defaultValue={detailUser && detailUser.dateBirth}
                            className="border-gray-200 rounded-full"
                            onChange={(e) => handleChangeUserData("dateBirth", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-gray-500">Gender</label>
                          <Input 
                            defaultValue={detailUser && detailUser.gender}
                            className="border-gray-200 rounded-full"
                            onChange={(e) => handleChangeUserData("gender", e.target.value)}
                          />
                        </div>
                      </div>
                      {/* Save Button */}
                      <div className="flex justify-end">
                        <Button disabled={loadingUpdateUser} className="bg-[#FF5C35] hover:bg-[#FF5C35]/90 text-white rounded-full px-6" onClick={putUserDetail}>
                          {loadingUpdateUser ? <LoadingSpinner /> : "Save Changes"}
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

