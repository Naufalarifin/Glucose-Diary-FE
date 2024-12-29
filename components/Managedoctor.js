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
  const [images, setImages] = useState("")
  const [doctorImage, setDoctorImage] = useState("/images/logo_inputPicture.png")
  const [doctorName, setDoctorName] = useState("")
  const [gmail, setGmail] = useState("")
  const [spesialist, setSpesialist] = useState("")
  const [jadwal, setJadwal] = useState([])
  const [editItem, setEditItem] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [LoadingSubmitDoctor, setLoadingSubmitDoctor] = useState(false) 
  const [loadingDeleteDoctor, setLoadingDeleteDoctor] = useState(null)

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
      practiceDay: jadwal,
      images: images
    }

    axiosInstance.post('/doctor', payload)
    .then(() => {
      alert("Doctor Berhasil Ditambahkan")
      getDoctor()
      setDoctorName("")
      setGmail("")
      setSpesialist("")
      setJadwal("")
      setImages("")
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
      email: editItem.email,
      speciality: editItem.speciality,
      practiceDay: editItem.practiceDay,
      images: editItem.images
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
      if (response.status != 200) {
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

            <Input
              placeholder="Url Images"
              value={images}
              onChange={(e) => setImages(e.target.value)}
              required
            />

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

            <Input
              placeholder="Url Images"
              value={editItem?.images || ""}
              onChange={(e) => setEditItem(editItem ? { ...editItem, images: e.target.value } : null)}
            />
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
              onChange={(e) => setEditItem(editItem ? { ...editItem, email: e.target.value } : null)}
            />

            {/* Specialist Input */}
            <Input
              type="text"
              placeholder="Specialist"
              value={editItem?.speciality || ""}
              onChange={(e) => setEditItem(editItem ? { ...editItem, speciality: e.target.value } : null)}
            />

            {/* Schedule Input */}
            <Input
              type="text"
              placeholder="jadwal"
              value={editItem?.practiceDay || ""}
              onChange={(e) => setEditItem(editItem ? { ...editItem, practiceDay: e.target.value } : null)}
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

