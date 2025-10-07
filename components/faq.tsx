import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Какой размер люка мне нужен?",
    answer:
      "Размер люка зависит от размера ревизионного отверстия. Мы рекомендуем добавить 50-100мм к размеру отверстия для удобного монтажа. В нашем конфигураторе вы можете указать точные размеры.",
  },
  {
    question: "Как происходит монтаж?",
    answer:
      "Монтаж люка занимает 30-60 минут. В комплекте идет подробная инструкция и все необходимые крепежные элементы. Также мы предлагаем услуги профессионального монтажа.",
  },
  {
    question: "Какое покрытие выбрать?",
    answer:
      "Для влажных помещений рекомендуем порошковое покрытие или анодирование. Для сухих помещений подойдет любой вариант. Все покрытия долговечны и легко моются.",
  },
  {
    question: "Какие сроки изготовления?",
    answer:
      "Стандартные размеры — 3-5 рабочих дней. Нестандартные размеры — 7-10 рабочих дней. Доставка по Москве — 1-2 дня, по России — 3-7 дней.",
  },
  {
    question: "Есть ли гарантия?",
    answer:
      "Да, на все наши изделия предоставляется гарантия 5 лет. Гарантия покрывает производственные дефекты и проблемы с механизмами.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">Частые вопросы</h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Ответы на самые популярные вопросы о наших люках
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="leading-relaxed text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
