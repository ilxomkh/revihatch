"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2 } from "lucide-react"
import { AddressMap } from "@/components/address-map"

interface OrderData {
  model: string
  modelName: string
  width: number
  height: number
  finish: string
  quantity: number
  totalPrice: number
}

export default function CheckoutPage() {
  const router = useRouter()
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    comment: "",
  })

  useEffect(() => {
    const stored = localStorage.getItem("currentOrder")
    if (stored) {
      setOrderData(JSON.parse(stored))
    } else {
      router.push("/configurator")
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate order submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Store order in localStorage (mock database)
    const orders = JSON.parse(localStorage.getItem("orders") || "[]")
    const newOrder = {
      id: Date.now().toString(),
      ...orderData,
      customer: formData,
      status: "new",
      createdAt: new Date().toISOString(),
    }
    orders.push(newOrder)
    localStorage.setItem("orders", JSON.stringify(orders))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Clear current order
    localStorage.removeItem("currentOrder")
  }

  const handleAddressSelect = (address: string, lat: number, lng: number) => {
    setFormData({ ...formData, address })
  }

  if (isSuccess) {
    return (
      <main className="container mx-auto px-4 py-12">
        <Card className="mx-auto max-w-2xl">
          <CardContent className="pt-12 text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-green-100 p-4">
                <CheckCircle2 className="h-16 w-16 text-green-600" />
              </div>
            </div>
            <h1 className="mb-4 text-3xl font-bold">Заказ успешно оформлен!</h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Мы получили ваш заказ и свяжемся с вами в ближайшее время для подтверждения деталей.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button onClick={() => router.push("/")} size="lg">
                На главную
              </Button>
              <Button onClick={() => router.push("/configurator")} variant="outline" size="lg">
                Новый заказ
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    )
  }

  if (!orderData) {
    return null
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold tracking-tight">Оформление заказа</h1>
        <p className="text-lg text-muted-foreground">Заполните контактные данные для завершения заказа</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Контактные данные</CardTitle>
                  <CardDescription>Укажите ваши контактные данные для связи</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Имя <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Иван Иванов"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Телефон <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="example@mail.ru"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Адрес доставки</CardTitle>
                  <CardDescription>Укажите адрес для доставки заказа</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <AddressMap onAddressSelect={handleAddressSelect} initialAddress={formData.address} />

                  <div className="space-y-2">
                    <Label htmlFor="address">
                      Полный адрес <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Город, улица, дом, квартира"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comment">Комментарий к заказу</Label>
                    <Textarea
                      id="comment"
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      placeholder="Дополнительная информация, пожелания по доставке"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Оформление..." : "Подтвердить заказ"}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Ваш заказ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Модель:</span>
                    <span className="font-medium">{orderData.modelName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Размер:</span>
                    <span className="font-medium">
                      {orderData.width} × {orderData.height} мм
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Покрытие:</span>
                    <span className="font-medium">{orderData.finish}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Количество:</span>
                    <span className="font-medium">{orderData.quantity} шт.</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="mb-4 flex items-baseline justify-between">
                    <span className="text-lg font-semibold">Итого:</span>
                    <span className="text-2xl font-bold">{orderData.totalPrice.toLocaleString()} ₽</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Окончательная стоимость будет рассчитана после подтверждения заказа менеджером
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
    </main>
  )
}
