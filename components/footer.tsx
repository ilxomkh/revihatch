import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/40">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/minimalist-invisible-wall-hatch-aluminum.jpg"
          alt="Невидимый настенный ревизионный люк"
          fill
          className="object-cover object-[center_80%]"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 text-white">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-auto px-1 items-center justify-center bg-primary">
                <span className="text-lg font-bold text-primary-foreground">
                  REVI
                </span>
              </div>
              <span className="text-xl font-bold tracking-tight">ZOR</span>
            </div>
            <p className="text-sm leading-relaxed text-white/80">
              Премиальные ревизионные люки для идеальной интеграции в интерьер
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Продукция</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link
                  href="/configurator?model=transformer"
                  className="hover:text-white"
                >
                  Transformer
                </Link>
              </li>
              <li>
                <Link
                  href="/configurator?model=universal"
                  className="hover:text-white"
                >
                  Universal
                </Link>
              </li>
              <li>
                <Link
                  href="/configurator?model=floor"
                  className="hover:text-white"
                >
                  Floor
                </Link>
              </li>
              <li>
                <Link
                  href="/configurator?model=anodos"
                  className="hover:text-white"
                >
                  Anodos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Компания</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="#about" className="hover:text-white">
                  О нас
                </Link>
              </li>
              <li>
                <Link href="#reviews" className="hover:text-white">
                  Отзывы
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white">
                  Вход
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Контакты</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>+9989 906-81-80</li>
              <li>info@revizor.ru</li>
              <li>
                г. Ташкент, Бектемирский район, рынок “Куйлюк”, магазин 36-А
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/20 pt-8 text-center text-sm text-white/70">
          <p>© 2025 Revizor. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
