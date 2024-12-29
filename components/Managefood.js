"use client"

import { useState, useEffect} from 'react'
import { Pencil, Trash2, X } from 'lucide-react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import axiosInstance from "@/lib/axios"
import { LoadingSpinner } from "@/components/ui/loading"

export function Home() {
  const [data, setData] = useState([])
  const [foodImage, setFoodImage] = useState("/images/logo_inputPicture.png")
  const [foodName, setFoodName] = useState("")
  const [carbs, setCarbs] = useState("")
  const [cholesterol, setCholesterol] = useState("")
  const [sugar, setSugar] = useState("")
  const [editItem, setEditItem] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [loadingUpdateUser, setLoadingUpdateUser] = useState(false)
  const [loadingDeleteFood, setLoadingDeleteFood] = useState(null)
  
  const getFood = () => {
    axiosInstance.get('/food')
    .then(response =>{
      setData(response.data.payload)
    })
    .catch(error =>{
      console.error(error)
    });
  }

  useEffect(() => {
    getFood()
  }, []);

  const handleSubmitFood = (e) => {
    setLoadingUpdateUser(true)
    e.preventDefault()
    const payload = {
      name: foodName,
      sugarLevel: sugar
    }

    axiosInstance.post('/food', payload)
    .then(() => {
      alert("Food Berhasil Ditambahkan")
      getFood()
      setFoodName("")
      setSugar("")
      setLoadingUpdateUser(false)
    })
    .catch(error => {
      console.log(error)
      setLoadingUpdateUser(false)
    })
  }

  const handleDeleteFood = (id) => {
    setLoadingDeleteFood(id)
    axiosInstance.delete(`/food/${id}`)
    .then(response => {
      console.log(response.status)
      if (response.status != 200 || response.status != 201) {
        alert("Error occured, please try again")
      } else {
        alert("food berhasil dihapus")
        getFood()
      }
      setLoadingDeleteFood(null)
    })
    .catch(error =>{
      console.log("error gais")
      setLoadingDeleteFood(null)
    })
  }

  const handleUpdateFood = (id) => {
    const payload ={
      name: editItem.name,
      sugarLevel: editItem.sugarLevel
    }
    axiosInstance.put(`/food/${id}`,payload)
    .then(() =>{
      alert("berhasil diubah")
      getFood()
    })
    .catch(error => {
      console.log(error)

    })
    setShowEditModal(false)
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
            setFoodImage(reader.result)
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


  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Food Recording App</h1>
      <div className="grid grid-cols-2 gap-8 mb-10">
        {/* Insert Data Food Card */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">Insert data food</h2>
          <form onSubmit={handleSubmitFood} className="space-y-4">
            {/* Image Upload */}
            <div className="  w-52 border-dashed border-gray-200 rounded-lg p-4 text-center ml-24 ">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e)}
                className="hidden"
                id="food-image"
              />
              <label htmlFor="food-image" className="cursor-pointer">
                <div className="w-32 h-32 mx-auto">
                  <Image
                    src={foodImage}
                    alt="Food preview"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </label>
            </div>

            {/* Food Name Input */}
            <Input
              placeholder="Food Name"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              required
            />

            {/* Nutritional Values */}
            <Input
              type="decimal"
              placeholder="Sugar (g)"
              value={sugar}
              onChange={(e) => setSugar(e.target.value)}
              required
            />

            <Button disabled={loadingUpdateUser} type="submit" className="w-full bg-orange-500 text-white hover:bg-orange-600">
            {loadingUpdateUser ? <LoadingSpinner /> : " Submit"}
            </Button>
          </form>
        </Card>

        {/* Edit Data Food Card */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">Edit Data Food</h2>
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {data.length ? data.map((item, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                <Image
                  src={item.images}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">Sugar: {item.sugarLevel}g</p>
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
                    disabled = {loadingUpdateUser}
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteFood(item.foodID)}
                  >
                     {loadingDeleteFood == item.foodID ? <LoadingSpinner /> : <Trash2 className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )) : <LoadingSpinner />}
          </div>
        </Card>
      </div>

      {/* Edit Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Food Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Image Upload */}
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, true)}
                className="hidden"
                id="edit-food-image"
              />
              <label htmlFor="edit-food-image" className="cursor-pointer">
                <div className="w-32 h-32 mx-auto mb-2">
                  <Image
                    src={editItem?.image || "/images/nasigoreng.jpg"}
                    alt="Food preview"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <span className="text-sm text-gray-500">Input picture</span>
              </label>
            </div>

            {/* Food Name Input */}
            <Input
              placeholder="Food Name"
              value={editItem?.name || ""}
              onChange={(e) => setEditItem(editItem ? { ...editItem, name: e.target.value } : null)}
            />

            {/* Nutritional Values */}

            <Input
              type="number"
              placeholder="Sugar (g)"
              value={editItem?.sugarLevel || ""}
              onChange={(e) => setEditItem(editItem ? { ...editItem, sugar: Number(e.target.value) } : null)}
            />

            <Button
              onClick={() => handleUpdateFood(editItem.foodID)}
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

