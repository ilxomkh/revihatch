"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"

const products = {
  transformer: {
    name: "Transformer",
    description: "Универсальная модель с возможностью открывания в любую сторону",
    basePrice: 850000,
    image: "/minimalist-invisible-wall-hatch-aluminum.jpg",
  },
  universal: {
    name: "Universal",
    description: "Классическая модель для стандартных задач",
    basePrice: 650000,
    image: "/industrial-wall-access-panel-white.jpg",
  },
  floor: {
    name: "Floor",
    description: "Напольная модель повышенной прочности",
    basePrice: 1200000,
    image: "/floor-access-hatch-industrial-design.jpg",
  },
  anodos: {
    name: "Anodos",
    description: "Премиум-модель с анодированным покрытием",
    basePrice: 1500000,
    image: "/premium-anodized-aluminum-hatch.jpg",
  },
}

const finishTypes = [
  { id: "powder", name: "Порошковое покрытие", priceMultiplier: 1.0 },
  { id: "anodized", name: "Анодирование", priceMultiplier: 1.3 },
  { id: "stainless", name: "Нержавеющая сталь", priceMultiplier: 1.5 },
]

interface ProductConfiguratorProps {
  initialModel: string
}

export function ProductConfigurator({ initialModel }: ProductConfiguratorProps) {
  const router = useRouter()
  const [selectedModel, setSelectedModel] = useState(initialModel)
  const [width, setWidth] = useState(600)
  const [height, setHeight] = useState(600)
  const [finish, setFinish] = useState("powder")
  const [quantity, setQuantity] = useState(1)

  const product = products[selectedModel as keyof typeof products] || products.transformer

  // Calculate price based on size, finish, and quantity
  const totalPrice = useMemo(() => {
    const sizeMultiplier = ((width * height) / (600 * 600)) * 0.5 + 0.5 // Size affects price
    const finishMultiplier = finishTypes.find((f) => f.id === finish)?.priceMultiplier || 1.0
    const unitPrice = Math.round(product.basePrice * sizeMultiplier * finishMultiplier)
    return unitPrice * quantity
  }, [width, height, finish, quantity, product.basePrice])

  const handleAddToCart = () => {
    const orderData = {
      model: selectedModel,
      modelName: product.name,
      width,
      height,
      finish: finishTypes.find((f) => f.id === finish)?.name,
      quantity,
      totalPrice,
    }
    // Store in localStorage for checkout
    localStorage.setItem("currentOrder", JSON.stringify(orderData))
    router.push("/checkout")
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Product Preview */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
          </CardContent>
        </Card>

        {/* Model Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Выбор модели</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedModel} onValueChange={setSelectedModel}>
              <div className="grid gap-4">
                {Object.entries(products).map(([key, prod]) => (
                  <div key={key} className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-muted/50">
                    <RadioGroupItem value={key} id={key} />
                    <Label htmlFor={key} className="flex-1 cursor-pointer">
                      <div className="font-semibold">{prod.name}</div>
                      <div className="text-sm text-muted-foreground">от {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'UZS', maximumFractionDigits: 0 }).format(prod.basePrice)}</div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>

      {/* Configuration Options */}
      <div className="space-y-6">
        {/* Size Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Размеры</CardTitle>
            <CardDescription>Укажите размеры в миллиметрах</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="width">Ширина (мм)</Label>
              <Input
                id="width"
                type="number"
                min="300"
                max="1500"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">Минимум: 300мм, Максимум: 1500мм</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Высота (мм)</Label>
              <Input
                id="height"
                type="number"
                min="300"
                max="1500"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">Минимум: 300мм, Максимум: 1500мм</p>
            </div>
          </CardContent>
        </Card>

        {/* Finish Type */}
        <Card>
          <CardHeader>
            <CardTitle>Тип покрытия</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={finish} onValueChange={setFinish}>
              <div className="space-y-3">
                {finishTypes.map((finishType) => (
                  <div
                    key={finishType.id}
                    className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-muted/50"
                  >
                    <RadioGroupItem value={finishType.id} id={finishType.id} />
                    <Label htmlFor={finishType.id} className="flex-1 cursor-pointer">
                      <div className="font-semibold">{finishType.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {finishType.priceMultiplier > 1
                          ? `+${Math.round((finishType.priceMultiplier - 1) * 100)}%`
                          : "Базовая цена"}
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Quantity */}
        <Card>
          <CardHeader>
            <CardTitle>Количество</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="flex-1 text-center">
                <div className="text-3xl font-bold">{quantity}</div>
                <div className="text-sm text-muted-foreground">шт.</div>
              </div>
              <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Price Summary */}
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Итоговая стоимость</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Модель:</span>
                <span className="font-medium">{product.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Размер:</span>
                <span className="font-medium">
                  {width} × {height} мм
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Покрытие:</span>
                <span className="font-medium">{finishTypes.find((f) => f.id === finish)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Количество:</span>
                <span className="font-medium">{quantity} шт.</span>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-semibold">Итого:</span>
                <span className="text-3xl font-bold">{new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'UZS', maximumFractionDigits: 0 }).format(totalPrice)}</span>
              </div>
            </div>
            <Button className="w-full" size="lg" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Оформить заказ
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
