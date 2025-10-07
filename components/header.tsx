"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User, Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [isAuthed, setIsAuthed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsAuthed(localStorage.getItem("isAuthed") === "true")
  }, [])

  const completeAuth = () => {
    localStorage.setItem("isAuthed", "true")
    setIsAuthed(true)
    setIsAuthModalOpen(false)
    setIsOrderModalOpen(false)
    router.push("/checkout")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-1">
          <div className="flex h-8 w-auto px-1 items-center justify-center bg-primary">
            <span className="text-lg font-bold text-primary-foreground">REVI</span>
          </div>
          <span className="text-xl font-bold tracking-tight">ZOR</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/#products"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Продукция
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            О нас
          </Link>
          <Link
            href="/#reviews"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Отзывы
          </Link>
          <Link
            href="/#faq"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            FAQ
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{isLoginMode ? "Вход в аккаунт" : "Регистрация"}</DialogTitle>
                <DialogDescription>
                  {isLoginMode 
                    ? "Войдите в свой аккаунт для оформления заказов" 
                    : "Создайте аккаунт для быстрого оформления заказов"
                  }
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="example@mail.ru" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Пароль</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
                {!isLoginMode && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                    <Input id="confirmPassword" type="password" placeholder="••••••••" />
                  </div>
                )}
                <Button className="w-full">
                  {isLoginMode ? "Войти" : "Зарегистрироваться"}
                </Button>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsLoginMode(!isLoginMode)}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {isLoginMode ? "Нет аккаунта? Зарегистрироваться" : "Есть аккаунт? Войти"}
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={(e) => {
                  e.preventDefault()
                  if (isAuthed) {
                    router.push("/checkout")
                  } else {
                    setIsOrderModalOpen(true)
                  }
                }}
              >
                Заказать
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Вход в аккаунт</DialogTitle>
                <DialogDescription>
                  Войдите в свой аккаунт для оформления заказа
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="order-email">Email</Label>
                  <Input id="order-email" type="email" placeholder="example@mail.ru" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order-password">Пароль</Label>
                  <Input id="order-password" type="password" placeholder="••••••••" />
                </div>
                <Button className="w-full" onClick={completeAuth}>Войти и заказать</Button>
                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Нет аккаунта? Зарегистрироваться
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{isLoginMode ? "Вход в аккаунт" : "Регистрация"}</DialogTitle>
                <DialogDescription>
                  {isLoginMode 
                    ? "Войдите в свой аккаунт для оформления заказов" 
                    : "Создайте аккаунт для быстрого оформления заказов"
                  }
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mobile-email">Email</Label>
                  <Input id="mobile-email" type="email" placeholder="example@mail.ru" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile-password">Пароль</Label>
                  <Input id="mobile-password" type="password" placeholder="••••••••" />
                </div>
                {!isLoginMode && (
                  <div className="space-y-2">
                    <Label htmlFor="mobile-confirmPassword">Подтвердите пароль</Label>
                    <Input id="mobile-confirmPassword" type="password" placeholder="••••••••" />
                  </div>
                )}
                <Button className="w-full">
                  {isLoginMode ? "Войти" : "Зарегистрироваться"}
                </Button>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsLoginMode(!isLoginMode)}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {isLoginMode ? "Нет аккаунта? Зарегистрироваться" : "Есть аккаунт? Войти"}
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="mb-6">
                <h2 className="text-lg font-semibold">Меню</h2>
                <p className="text-sm text-muted-foreground">Навигация по сайту</p>
              </div>
              <div className="flex flex-col space-y-4">
                <Link
                  href="/#products"
                  className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Продукция
                </Link>
                <Link
                  href="/about"
                  className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  О нас
                </Link>
                <Link
                  href="/#reviews"
                  className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Отзывы
                </Link>
                <Link
                  href="/#faq"
                  className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
                <div className="pt-4 border-t">
                  <Button
                    className="w-full"
                    onClick={() => {
                      if (isAuthed) {
                        router.push("/checkout")
                      } else {
                        setIsOrderModalOpen(true)
                      }
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    Заказать
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Mobile Order Modal */}
        <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Вход в аккаунт</DialogTitle>
              <DialogDescription>
                Войдите в свой аккаунт для оформления заказа
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mobile-order-email">Email</Label>
                <Input id="mobile-order-email" type="email" placeholder="example@mail.ru" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile-order-password">Пароль</Label>
                <Input id="mobile-order-password" type="password" placeholder="••••••••" />
              </div>
              <Button className="w-full" onClick={completeAuth}>Войти и заказать</Button>
              <div className="text-center">
                <button
                  type="button"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Нет аккаунта? Зарегистрироваться
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  )
}
