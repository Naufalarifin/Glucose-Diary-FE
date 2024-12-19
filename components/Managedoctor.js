"use client"

import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

export function Home() {
  const [doctorImage, setDoctorImage] = useState("/images/logo_inputPicture.png")
  const [doctorName, setDoctorName] = useState("")
  const [gmail, setGmail] = useState("")
  const [spesialist, setSpesialist] = useState("")
  const [jadwal, setJadwal] = useState([])
  const [editItem, setEditItem] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  
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

  const handleSubmit = (e) => {
    e.preventDefault()
    const newDoctor = {
      id: doctorItems.length + 1,
      name: doctorName,
      gmail: gmail,
      spesialist: spesialist,
      jadwal: jadwal,
      image: doctorImage
    }
    setDoctorItems([...doctorItems, newDoctor])
    // Reset form
    setDoctorImage("/placeholder.svg?height=100&width=100")
    setDoctorName("")
    setGmail("")
    setSpesialist("")
    setJadwal([])
  }

  const handleEdit = (item) => {
    setEditItem(item)
    setShowEditModal(true)
  }

  const handleUpdate = () => {
    if (editItem) {
      setDoctorItems(doctorItems.map(item => 
        item.id === editItem.id ? editItem : item
      ))
      setShowEditModal(false)
      setEditItem(null)
    }
  }

  const handleDelete = (id) => {
    setDoctorItems(doctorItems.filter(item => item.id !== id))
  }

  const generateTimeSlots = () => {
    const slots = []
    for (let i = 0; i < 24; i++) {
      slots.push(`${i.toString().padStart(2, '0')}:00`)
      slots.push(`${i.toString().padStart(2, '0')}:30`)
    }
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
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="space-y-2">
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
            </div>

            <Button type="submit" className="w-full bg-orange-500 text-white hover:bg-orange-600">
              Submit
            </Button>
          </form>
        </Card>

        {/* Edit Data Doctor Card */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">Edit Data Doctor</h2>
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {doctorItems.map((item) => (
              <div key={item.id} className="flex items-start space-x-4 p-2 border rounded-lg">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.spesialist}</p>
                  <p className="text-sm text-gray-600">{item.gmail}</p>
                  <p className="text-sm text-gray-600">
                    Jadwal: {item.jadwal.join(', ')}
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
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
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
                    src={editItem?.image || "/placeholder.svg?height=100&width=100"}
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
              value={editItem?.gmail || ""}
              onChange={(e) => setEditItem(editItem ? { ...editItem, gmail: e.target.value } : null)}
            />

            {/* Specialist Input */}
            <Input
              type="text"
              placeholder="Specialist"
              value={editItem?.spesialist || ""}
              onChange={(e) => setEditItem(editItem ? { ...editItem, spesialist: e.target.value } : null)}
            />

            {/* Schedule Input */}
            <div className="space-y-2">
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
            </div>

            <Button
              onClick={handleUpdate}
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

