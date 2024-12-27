"use client"

import { useState, useEffect } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import axiosInstance from "@/lib/axios"
import { LoadingSpinner } from "@/components/ui/loading"

export function Home() {
  const [data, setData] = useState([])
  const [doctorImage, setDoctorImage] = useState("/images/logo_inputPicture.png")
  const [doctorName, setDoctorName] = useState("")
  const [gmail, setGmail] = useState("")
  const [spesialist, setSpesialist] = useState("")
  const [jadwal, setJadwal] = useState([])
  const [editItem, setEditItem] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [LoadingSubmitDoctor, setLoadingSubmitDoctor] = useState(false) 
  const [loadingDeleteDoctor, setLoadingDeleteDoctor] = useState(null)
  const [doctorItems, setDoctorItems] = useState([
    
    {
      id: 1,
      name: 'Dr. Wisnu Satrio',
      spesialist: 'Endrokrinolog',
      gmail: 'wisnu@gmail.com',
      image: '/images/doctor-1.jpg',
      jadwal: ['09:00', '10:00', '11:00', '15:00', '16:00'],
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
  ])

  const getDoctor = () => {
    axiosInstance.get('/doctor')
    .then(response =>{
      setData(response.data.payload)
    })
    .catch(error =>{
      console.log(error)
    });
  }

  useEffect(() => {
    getDoctor()
  }, []);

  const handleSubmitDoctor = (e) => {
    setLoadingSubmitDoctor(true)
    e.preventDefault()
    const payload = {
      name: doctorName,
      email: gmail,
      speciality: spesialist,
      practiceDay: jadwal
    }

    axiosInstance.post('/doctor', payload)
    .then(() => {
      alert("Doctor Berhasil Ditambahkan")
      getDoctor()
      setDoctorName("")
      setGmail("")
      setSpesialist("")
      setLoadingSubmitDoctor(false)
    })
    .catch(error => {
      console.log(error)
      setLoadingSubmitDoctor(false)
    })
  }

  const handleImageUpload = (e, isEdit = false) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          if (isEdit && editItem) {
            setEditItem({ ...editItem, image: reader.result })
          } else {
            setDoctorImage(reader.result)
          }
        }
      }
      reader.readAsDataURL(file)
    }
  }


  const handleUpdateDoctor = (id) => {
    const payload ={
      name: editItem.name,
      email: editItem.gmail,
      speciality: editItem.spesialist,
      practiceDay: editItem.jadwal
    }
    axiosInstance.put(`/doctor/${id}`,payload)
    .then(() =>{
      alert("berhasil diubah")
      getDoctor()
    })
    .catch(error => {
      console.log(error)

    })
    setShowEditModal(false)
  }

  const handleEdit = (item) => {
    setEditItem(item)
    setShowEditModal(true)
  }


  const handleDeleteDoctor = (id) => {
    setLoadingDeleteDoctor(id)
    axiosInstance.delete(`/doctor/${id}`)
    .then(response => {
      console.log(response.status)
      if (response.status != 200 || response.status != 201) {
        alert("Error occured, please try again")
      } else {
        alert("doctor berhasil dihapus")
        getDoctor()
      }
      setLoadingDeleteDoctor(null)
    })
    .catch(error =>{
      console.log("error gais")
      setLoadingDeleteDoctor(null)
    })
  }

  const generateTimeSlots = () => {
    const slots = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu']
    return slots
  }

  const timeSlots = generateTimeSlots()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Doctor Recording App</h1>
      <div className="grid grid-cols-2 gap-8 mb-10">
        {/* Insert Data Doctor Card */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">Insert data doctor</h2>
          <form onSubmit={handleSubmitDoctor} className="space-y-4">
            {/* Image Upload */}
            <div className="w-52 border-dashed border-gray-200 rounded-lg p-4 text-center ml-24 ">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e)}
                className="hidden"
                id="doctor-image"
              />
              <label htmlFor="doctor-image" className="cursor-pointer">
                <div className="w-32 h-32 mx-auto">
                  <Image
                    src={doctorImage}
                    alt="Doctor preview"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </label>
            </div>

            {/* Doctor Name Input */}
            <Input
              placeholder="Doctor Name"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              required
            />

            {/* Email Input */}
            <Input
              type="email"
              placeholder="Email"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
              required
            />

            {/* Specialist Input */}
            <Input
              type="text"
              placeholder="Specialist"
              value={spesialist}
              onChange={(e) => setSpesialist(e.target.value)}
              required
            />

            {/* Schedule Input */}
            <Input
              type="text"
              placeholder="jadwal"
              value={jadwal}
              onChange={(e) => setJadwal(e.target.value)}
              required
            />
            {/* <div className="space-y-2">
              <label className="text-sm font-medium">Jadwal</label>
              <div className="grid grid-cols-6 gap-2 max-h-60 overflow-y-auto">
                {timeSlots.map((time) => (
                  <label key={time} className="flex items-center space-x-2">
                    <Checkbox
                      checked={jadwal.includes(time)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setJadwal([...jadwal, time])
                        } else {
                          setJadwal(jadwal.filter(t => t !== time))
                        }
                      }}
                    />
                    <span className="text-sm">{time}</span>
                  </label>
                ))}
              </div>
            </div> */}

            <Button type="submit" className="w-full bg-orange-500 text-white hover:bg-orange-600">
              Submit
            </Button>
          </form>
        </Card>

        {/* Edit Data Doctor Card */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">Edit Data Doctor</h2>
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {data.length ? data.map((item, index) => (
              <div key={index} className="flex items-start space-x-4 p-2 border rounded-lg">
                <Image
                  src={item.images}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.speciality}</p>
                  <p className="text-sm text-gray-600">{item.email}</p>
                  <p className="text-sm text-gray-600">
                    Jadwal: {item.practiceDay}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(item)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteDoctor(item.doctorId)}
                  >
                     {loadingDeleteDoctor == item.doctorId ? <LoadingSpinner /> : <Trash2 className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )) : <LoadingSpinner />}
          </div>
        </Card>
      </div>

      {/* Edit Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Doctor Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Image Upload */}
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, true)}
                className="hidden"
                id="edit-doctor-image"
              />
              <label htmlFor="edit-doctor-image" className="cursor-pointer">
                <div className="w-32 h-32 mx-auto mb-2">
                  <Image
                    src={editItem?.image || "/images/logo_malee.png"}
                    alt="Doctor preview"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <span className="text-sm text-gray-500">Input picture</span>
              </label>
            </div>

            {/* Doctor Name Input */}
            <Input
              placeholder="Doctor Name"
              value={editItem?.name || ""}
              onChange={(e) => setEditItem(editItem ? { ...editItem, name: e.target.value } : null)}
            />

            {/* Email Input */}
            <Input
              type="email"
              placeholder="Email"
              value={editItem?.email || ""}
              onChange={(e) => setEditItem(editItem ? { ...editItem, gmail: e.target.value } : null)}
            />

            {/* Specialist Input */}
            <Input
              type="text"
              placeholder="Specialist"
              value={editItem?.speciality || ""}
              onChange={(e) => setEditItem(editItem ? { ...editItem, spesialist: e.target.value } : null)}
            />

            {/* Schedule Input */}
            <Input
              type="text"
              placeholder="jadwal"
              value={editItem?.practiceDay || ""}
              onChange={(e) => setEditItem(editItem ? { ...editItem, jadwal: e.target.value } : null)}
            />
            {/* <div className="space-y-2">
              <label className="text-sm font-medium">Jadwal</label>
              <div className="grid grid-cols-6 gap-2 max-h-60 overflow-y-auto">
                {timeSlots.map((time) => (
                  <label key={time} className="flex items-center space-x-2">
                    <Checkbox
                      checked={editItem?.jadwal?.includes(time) || false}
                      onCheckedChange={(checked) => {
                        if (editItem) {
                          const updatedJadwal = checked
                            ? [...(editItem.jadwal || []), time]
                            : (editItem.jadwal || []).filter((t) => t !== time);
                          setEditItem({ ...editItem, jadwal: updatedJadwal })
                        }
                      }}
                    />
                    <span className="text-sm">{time}</span>
                  </label>
                ))}
              </div>
            </div> */}

            <Button
              onClick={() => handleUpdateDoctor(editItem.doctorId)}
              className="w-full bg-orange-500 text-white hover:bg-orange-600"
            >
              Update
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

