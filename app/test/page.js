'use client'

import { Bell, LogOut, Droplets, Moon, Flame, Wheat, Pencil, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-30 h-full w-64 border-r bg-background flex flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b px-6">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-orange-500 p-2">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-6 px-6 py-6">
          <div>
            <h4 className="mb-2 text-sm font-semibold text-orange-500">
              DASHBOARD
            </h4>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-orange-500"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              Manage Account
            </Button>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold text-muted-foreground">
              ACCOUNT
            </h4>
          </div>
        </nav>

        {/* Logout button at the bottom */}
        <div className="mt-auto p-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pl-64">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b px-6">
          <h1 className="text-xl font-semibold">Hi, Giano</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>GN</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="p-6">
          {/* Goals Section */}
          <section className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Your Goal For Today</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Good Luck</p>
              </CardContent>
            </Card>
          </section>

          {/* Reminders Section */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">REMINDER</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="flex items-center gap-4 p-6">
                  <Droplets className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Water</p>
                    <p className="text-2xl font-bold">4L</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-4 p-6">
                  <Moon className="h-8 w-8 text-indigo-500" />
                  <div>
                    <p className="text-sm font-medium">Sleep</p>
                    <p className="text-2xl font-bold">8h</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-4 p-6">
                  <Flame className="h-8 w-8 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium">Calories</p>
                    <p className="text-2xl font-bold">1500kcal</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-4 p-6">
                  <Wheat className="h-8 w-8 text-yellow-500" />
                  <div>
                    <p className="text-sm font-medium">Carbohydrate</p>
                    <p className="text-2xl font-bold">80g</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* User Management Section */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Insert User Form */}
            <Card>
              <CardHeader>
                <CardTitle>Insert Data User</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <Input placeholder="Username" />
                  <Input type="password" placeholder="Password" />
                  <Input type="email" placeholder="Email" />
                  <div className="grid grid-cols-2 gap-4">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input type="date" placeholder="Birth" />
                  </div>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">Submit</Button>
                </form>
              </CardContent>
            </Card>

            {/* Manage Users List */}
            <Card>
              <CardHeader>
                <CardTitle>Manage Account User</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Naudal Arifin",
                      email: "naudalarifin@gmail.com",
                      joined: "Aug 12, 2020 at 12:08 PM"
                    },
                    {
                      name: "Sakie Giano",
                      email: "sakiegiano@gmail.com",
                      joined: "Aug 12, 2020 at 12:08 PM"
                    },
                    {
                      name: "Bintang Rizky",
                      email: "bintangrizky@gmail.com",
                      joined: "Aug 12, 2020 at 12:08 PM"
                    },
                    {
                      name: "Alvito Naufal",
                      email: "naufalhalim@gmail.com",
                      joined: "Aug 12, 2020 at 12:08 PM"
                    }
                  ].map((user, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <p className="text-xs text-muted-foreground">Joined: {user.joined}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}