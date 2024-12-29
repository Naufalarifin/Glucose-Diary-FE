"use client"

import { useState, useEffect } from 'react'
import { Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axiosInstance from "@/lib/axios"
import { LoadingSpinner } from "@/components/ui/loading"

export function HomeAdminUser() {
  const [data, setData] = useState([])
  const [userImage, setUserImage] = useState("/images/logo_inputPicture.png")
  const [userName, setUserName] = useState("")
  const [gmail, setGmail] = useState("")
  const [password, setPassword] = useState("")
  const [gender, setGender] = useState("")
  const [birthday, setBirthday] = useState("")
  const [images, setImages] = useState("")
  const [editItem, setEditItem] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showEditPassword, setShowEditPassword] = useState(false)
  const [loadingUpdateUser, setLoadingUpdateUser] = useState(false)
  const [loadingDeleteUser, setLoadingDeleteUser] = useState(null)

  const handleImageUpload = (e, isEdit = false) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          if (isEdit && editItem) {
            setEditItem({ ...editItem, image: reader.result })
          } else {
            setUserImage(reader.result)
          }
        }
      }
      reader.readAsDataURL(file)
    }
  }


  const handleEdit = (item) => {
    setEditItem(item)
    setShowEditModal(true)
  }

  const handleUpdate = () => {
    if (editItem) {
      setUserItems(userItems.map(item => 
        item.id === editItem.id ? editItem : item
      ))
      setShowEditModal(false)
      setEditItem(null)
    }
  }

  const handleDelete = (id) => {
    setUserItems(userItems.filter(item => item.id !== id))
  }

  const getUser = () => {
    axiosInstance.get('/user')
    .then(response =>{
      setData(response.data.payload)
    })
    .catch(error =>{
      console.error(error)
    });
  }

  useEffect(() => {
    getUser()
  }, []);

  const handleSubmitUser = (e) => {
    setLoadingUpdateUser(true)
    e.preventDefault()
    const payload = {
      username: userName,
      password: password,
      email: gmail,
      dateBirth: birthday,
      gender: gender,
      images: images
    }

    axiosInstance.post('/user', payload)
    .then(() => {
      alert("User Berhasil Ditambahkan")
      getUser()
      setUserName("")
      setGmail("")
      setPassword("")
      setBirthday("")
      setGender("")
      setImages("")
      setLoadingUpdateUser(false)
    })
    .catch(error => {
      console.log(error)
      setLoadingUpdateUser(false)
    })
  }

  const handleDeleteUser = (id) => {
    setLoadingDeleteUser(id)
    axiosInstance.delete(`/user/${id}`)
    .then(response => {
      console.log(response.status)
      if (response.status != 200) {
        alert("Error occured, please try again")
      } else {
        alert("user berhasil dihapus")
        getUser()
      }
      setLoadingDeleteUser(null)
    })
    .catch(error =>{
      console.log("error gais")
      setLoadingDeleteUser(null)
    })
  }

  const handleUpdateUser = (id) => {
    const payload ={
      username: editItem.username,
      password: editItem.password,
      email: editItem.email,
      dateBirth: editItem.dateBirth,
      gender: editItem.gender,
      images: editItem.images
    }
    axiosInstance.put(`/user/${id}`,payload)
    .then(() =>{
      alert("berhasil diubah")
      getUser()
    })
    .catch(error => {
      console.log(error)

    })
    setShowEditModal(false)
  }
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">User Recording App</h1>
      <div className="grid grid-cols-2 gap-8 mb-10">
        {/* Insert Data User Card */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">Insert data user</h2>
          <form onSubmit={handleSubmitUser} className="space-y-4">
            {/* Image Upload */}

            <Input
              placeholder="Url Images"
              value={images}
              onChange={(e) => setImages(e.target.value)}
              required
            />

            {/* User Name Input */}
            <Input
              placeholder="User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
              required
            />
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <Select value={gender} onValueChange={setGender} required>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="date"
              placeholder="Birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />

            <Button disabled={loadingUpdateUser} type="submit" className="w-full bg-orange-500 text-white hover:bg-orange-600">
            {loadingUpdateUser ? <LoadingSpinner /> : " Submit"}
            </Button>
          </form>
        </Card>

        {/* Edit Data User Card */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">Edit Data User</h2>
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {data.length ? data.map((item, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                 <Image
                  src={item?.images || "/images/profile.kosong.png"}
                  alt={item.username}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.username}</h3>
                  <p className="text-sm text-gray-600">{item.email}</p>
                  <p className="text-sm text-gray-600">Password: ******</p>
                  <p className="text-sm text-gray-600">{item.gender}</p>
                  <p className="text-sm text-gray-600">{item.dateBirth}</p>
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
                    onClick={() => handleDeleteUser(item.userId)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )): <LoadingSpinner />}
          </div>
        </Card>
      </div>

      {/* Edit Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
          
          
          <Input
              placeholder="Url Images"
              value={editItem?.images || ""}
              onChange={(e) => setEditItem(editItem ? { ...editItem, images: e.target.value } : null)}
            />

            {/* User Name Input */}
            <Input
              placeholder="User Name"
              value={editItem?.username || ""}
              onChange={(e) => setEditItem(editItem ? { ...editItem, username: e.target.value } : null)}
            />

            <Input
              type="email"
              placeholder="Email"
              value={editItem?.email || ""}
              onChange={(e) => setEditItem(editItem ? { ...editItem, email: e.target.value } : null)}
            />
            {/* <div className="relative">
              <Input
                type={showEditPassword ? "text" : "password"}
                placeholder="Password"
                value={editItem?.password || ""}
                onChange={(e) => setEditItem(editItem ? { ...editItem, password: e.target.value } : null)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => setShowEditPassword(!showEditPassword)}
              >
                {showEditPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div> */}
            <Select 
              value={editItem?.gender || ""} 
              onValueChange={(value) => setEditItem(editItem ? { ...editItem, gender: value } : null)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="date"
              placeholder="Birthday"
              value={editItem?.dateBirth || ""}
              onChange={(e) => setEditItem(editItem ? { ...editItem, dateBirth: e.target.value } : null)}
            />

            <Button
              onClick={() => handleUpdateUser(editItem.userId)}
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

