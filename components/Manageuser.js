"use client"

import { useState } from 'react'
import { Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function HomeAdminUser() {
  const [userImage, setUserImage] = useState("/images/logo_inputPicture.png")
  const [userName, setUserName] = useState("")
  const [gmail, setGmail] = useState("")
  const [password, setPassword] = useState("")
  const [gender, setGender] = useState("")
  const [birthday, setBirthday] = useState("")
  const [editItem, setEditItem] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  
  const [showPassword, setShowPassword] = useState(false)
  const [showEditPassword, setShowEditPassword] = useState(false)

  const [userItems, setUserItems] = useState([
    {
        id: 1,
        name: "Naudal Arifin",
        gmail: "naudalarifin@gmail.com",
        password: "ksadk",
        gender: "male",
        birthday: "2000-01-01",
        image: '/images/User.jpg'
      },
      {
        id: 2,
        name: "Sakie Giano",
        gmail: "sakiegiano@gmail.com",
        password: "ksadk",
        gender: "male",
        birthday: "2000-01-01",
        image: '/images/User.jpg'
      },
      {
        id: 3,
        name: "Bintang Rizky",
        gmail: "bintangrizky@gmail.com",
        password: "ksadk",
        gender: "male",
        birthday: "2000-01-01",
        image: '/images/User.jpg'
      },
      {
        id: 4,
        name: "Alvito Naufal",
        gmail: "naufalhalim@gmail.com",
        password: "ksadk",
        gender: "male",
        birthday: "2000-01-01",
        image: '/images/User.jpg'
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
            setUserImage(reader.result)
          }
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newUser = {
      id: userItems.length + 1,
      name: userName,
      gmail: gmail,
      password: password,
      gender: gender,
      birthday: birthday,
      image: userImage
    }
    setUserItems([...userItems, newUser])
    // Reset form
    setUserImage("/placeholder.svg?height=100&width=100")
    setUserName("")
    setGmail("")
    setPassword("")
    setGender("")
    setBirthday("")
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

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">User Recording App</h1>
      <div className="grid grid-cols-2 gap-8 mb-10">
        {/* Insert Data User Card */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">Insert data user</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Image Upload */}
            <div className="w-52 border-dashed border-gray-200 rounded-lg p-4 text-center ml-24 ">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e)}
                className="hidden"
                id="user-image"
              />
              <label htmlFor="user-image" className="cursor-pointer">
                <div className="w-32 h-32 mx-auto">
                  <Image
                    src={userImage}
                    alt="User preview"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </label>
            </div>

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

            <Button type="submit" className="w-full bg-orange-500 text-white hover:bg-orange-600">
              Submit
            </Button>
          </form>
        </Card>

        {/* Edit Data User Card */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">Edit Data User</h2>
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {userItems.map((item) => (
              <div key={item.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.gmail}</p>
                  <p className="text-sm text-gray-600">Password: ******</p>
                  <p className="text-sm text-gray-600">{item.gender}</p>
                  <p className="text-sm text-gray-600">{item.birthday}</p>
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Image Upload */}
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, true)}
                className="hidden"
                id="edit-user-image"
              />
              <label htmlFor="edit-user-image" className="cursor-pointer">
                <div className="w-32 h-32 mx-auto mb-2">
                  <Image
                    src={editItem?.image || "/placeholder.svg?height=100&width=100"}
                    alt="User preview"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <span className="text-sm text-gray-500">Input picture</span>
              </label>
            </div>

            {/* User Name Input */}
            <Input
              placeholder="User Name"
              value={editItem?.name || ""}
              onChange={(e) => setEditItem(editItem ? { ...editItem, name: e.target.value } : null)}
            />

            <Input
              type="email"
              placeholder="Email"
              value={editItem?.gmail || ""}
              onChange={(e) => setEditItem(editItem ? { ...editItem, gmail: e.target.value } : null)}
            />
            <div className="relative">
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
            </div>
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
              value={editItem?.birthday || ""}
              onChange={(e) => setEditItem(editItem ? { ...editItem, birthday: e.target.value } : null)}
            />

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

