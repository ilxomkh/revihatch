"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { ProductConfigurator } from "@/components/product-configurator"

function ConfiguratorContent() {
  const searchParams = useSearchParams()
  const modelParam = searchParams.get("model")

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold tracking-tight">Конфигуратор люков</h1>
        <p className="text-lg text-muted-foreground">Настройте люк под ваши требования</p>
      </div>
      <ProductConfigurator initialModel={modelParam || "transformer"} />
    </main>
  )
}

export default function ConfiguratorPage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <ConfiguratorContent />
    </Suspense>
  )
}
