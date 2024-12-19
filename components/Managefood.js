"use client"

import { useState } from 'react'
import { Pencil, Trash2, X } from 'lucide-react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function Home() {
  const [foodImage, setFoodImage] = useState("/images/logo_inputPicture.png")
  const [foodName, setFoodName] = useState("")
  const [carbs, setCarbs] = useState("")
  const [cholesterol, setCholesterol] = useState("")
  const [sugar, setSugar] = useState("")
  const [editItem, setEditItem] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  
  const [foodItems, setFoodItems] = useState([
    {
      id: 1,
      name: "Nasi Goreng",
      description: "Porsi Aman",
      portion: "1 Porsi",
      image: "/images/nasigoreng.jpg",
      carbs: 45,
      cholesterol: 20,
      sugar: 2
    },
    {
      id: 2,
      name: "Nasi Rawon",
      description: "Kurang Persiasi",
      portion: "2 Porsi",
      image: "/images/nasirawon.jpeg",
      carbs: 35,
      cholesterol: 10,
      sugar: 5
    },
    {
      id: 3,
      name: "Mie Goreng",
      description: "Porsi Aman",
      portion: "1 Porsi",
      image: "/placeholder.svg?height=50&width=50",
      carbs: 60,
      cholesterol: 25,
      sugar: 6
    },
    {
      id: 4,
      name: "Ayam Goreng",
      description: "Porsi Aman",
      portion: "1 Porsi",
      image: "/placeholder.svg?height=50&width=50",
      carbs: 50,
      cholesterol: 40,
      sugar: 4
    },
    {
      id: 5,
      name: "Sayur Asem",
      description: "Porsi Aman",
      portion: "2 Porsi",
      image: "/placeholder.svg?height=50&width=50",
      carbs: 55,
      cholesterol: 15,
      sugar: 3
    },
    {
      id: 6,
      name: "Soto Ayam",
      description: "Porsi Aman",
      portion: "1 Porsi",
      image: "/placeholder.svg?height=50&width=50",
      carbs: 40,
      cholesterol: 30,
      sugar: 2,
    },
    {
      id: 7,
      name: "Gado-gado",
      description: "Porsi Aman",
      portion: "1 Porsi",
      image: "/images/gado-gado.jpg",
      carbs: 45,
      cholesterol: 20,
      sugar: 2
    },
    {
      id: 8,
      name: "Rendang",
      description: "Porsi Aman",
      portion: "1 Porsi",
      image: "/placeholder.svg?height=50&width=50",
      carbs: 45,
      cholesterol: 20,
      sugar: 2
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
            setFoodImage(reader.result)
          }
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newFood = {
      id: foodItems.length + 1,
      name: foodName,
      carbs: Number(carbs),
      cholesterol: Number(cholesterol),
      sugar: Number(sugar),
      image: foodImage
    }
    setFoodItems([...foodItems, newFood])
    // Reset form
    setFoodImage("/placeholder.svg?height=100&width=100")
    setFoodName("")
    setCarbs("")
    setCholesterol("")
    setSugar("")
  }

  const handleEdit = (item) => {
    setEditItem(item)
    setShowEditModal(true)
  }

  const handleUpdate = () => {
    if (editItem) {
      setFoodItems(foodItems.map(item => 
        item.id === editItem.id ? editItem : item
      ))
      setShowEditModal(false)
      setEditItem(null)
    }
  }

  const handleDelete = (id) => {
    setFoodItems(foodItems.filter(item => item.id !== id))
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Food Recording App</h1>
      <div className="grid grid-cols-2 gap-8 mb-10">
        {/* Insert Data Food Card */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">Insert data food</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              type="number"
              placeholder="Carbs (g)"
              value={carbs}
              onChange={(e) => setCarbs(e.target.value)}
              required
            />
            <Input
              type="number"
              placeholder="Cholesterol (mg)"
              value={cholesterol}
              onChange={(e) => setCholesterol(e.target.value)}
              required
            />
            <Input
              type="number"
              placeholder="Sugar (g)"
              value={sugar}
              onChange={(e) => setSugar(e.target.value)}
              required
            />

            <Button type="submit" className="w-full bg-orange-500 text-white hover:bg-orange-600">
              Submit
            </Button>
          </form>
        </Card>

        {/* Edit Data Food Card */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">Edit Data Food</h2>
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {foodItems.map((item) => (
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
                  <p className="text-sm text-gray-600">Carbs: {item.carbs}g</p>
                  <p className="text-sm text-gray-600">Cholesterol: {item.cholesterol}mg</p>
                  <p className="text-sm text-gray-600">Sugar: {item.sugar}g</p>
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
                    src={editItem?.image || "/placeholder.svg?height=100&width=100"}
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
              placeholder="Carbs (g)"
              value={editItem?.carbs || ""}
              onChange={(e) => setEditItem(editItem ? { ...editItem, carbs: Number(e.target.value) } : null)}
            />
            <Input
              type="number"
              placeholder="Cholesterol (mg)"
              value={editItem?.cholesterol || ""}
              onChange={(e) => setEditItem(editItem ? { ...editItem, cholesterol: Number(e.target.value) } : null)}
            />
            <Input
              type="number"
              placeholder="Sugar (g)"
              value={editItem?.sugar || ""}
              onChange={(e) => setEditItem(editItem ? { ...editItem, sugar: Number(e.target.value) } : null)}
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

