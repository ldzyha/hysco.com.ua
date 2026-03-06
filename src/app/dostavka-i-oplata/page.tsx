import { Metadata } from 'next';
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  combineSchemas,
} from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'Доставка та оплата',
  description: 'Інформація про доставку та оплату електросамокатів через офіційного дистриб\'ютора. Nova Poshta по всій Україні.',
  alternates: { canonical: '/dostavka-i-oplata/' },
  openGraph: {
    type: 'website',
    url: 'https://hysco.com.ua/dostavka-i-oplata/',
    siteName: 'HYSCO',
    title: 'Доставка та оплата | HYSCO',
    description: 'Інформація про доставку та оплату електросамокатів через офіційного дистриб\'ютора. Nova Poshta по всій Україні.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Доставка та оплата - HYSCO' }],
  },
};

const deliveryFAQs = [
  {
    question: 'Які способи доставки доступні?',
    answer: 'Доставка організовується через офіційного дистриб\'ютора. Зазвичай використовується Nova Poshta — до відділення або кур\'єром до дверей по всій Україні.',
  },
  {
    question: 'Скільки коштує доставка?',
    answer: 'Вартість доставки розраховується за тарифами перевізника Nova Poshta. Точні умови уточнюйте у дистриб\'ютора при оформленні замовлення.',
  },
  {
    question: 'Які способи оплати доступні?',
    answer: 'Оплата здійснюється безпосередньо офіційному дистриб\'ютору. Зазвичай доступні: безготівковий розрахунок (картка Visa/Mastercard) та накладений платіж.',
  },
  {
    question: 'Як оформити замовлення?',
    answer: 'Залишіть заявку на сайті або зв\'яжіться з нами. Ми безкоштовно проконсультуємо вас та з\'єднаємо з офіційним дистриб\'ютором для оформлення замовлення.',
  },
];

const orderSteps = [
  { step: 1, title: 'Консультація', description: 'Залишаєте заявку — ми безкоштовно консультуємо' },
  { step: 2, title: 'З\'єднання', description: 'Ми з\'єднуємо вас з офіційним дистриб\'ютором' },
  { step: 3, title: 'Оформлення', description: 'Ви оформлюєте замовлення напряму з дистриб\'ютором' },
  { step: 4, title: 'Доставка', description: 'Дистриб\'ютор відправляє замовлення Nova Poshtою' },
];

const deliveryJsonLd = combineSchemas(
  generateWebPageSchema({
    title: 'Доставка та оплата | HYSCO',
    description: 'Інформація про доставку та оплату електросамокатів через офіційного дистриб\'ютора. Nova Poshta по всій Україні.',
    path: '/dostavka-i-oplata/',
  }),
  generateBreadcrumbSchema([
    { name: 'Головна', href: '/' },
    { name: 'Доставка та оплата', href: '/dostavka-i-oplata/' },
  ]),
  generateFAQSchema(deliveryFAQs)
);

export default function DeliveryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(deliveryJsonLd) }}
      />
      <main className="min-h-screen py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <header className="mb-10">
            <h1 className="text-3xl font-bold mb-3">Доставка та оплата</h1>
            <p className="text-gray-500 text-lg">
              Доставка організовується через офіційного дистриб&#39;ютора електросамокатів по всій Україні.
            </p>
          </header>

          <section className="mb-8 p-5 bg-blue-50 border border-blue-200 rounded-xl">
            <h4 className="font-semibold mb-2">Як це працює</h4>
            <p className="text-gray-700">
              Ми не продаємо товари напряму. Наша роль — безкоштовна консультація та з&#39;єднання вас
              з офіційним дистриб&#39;ютором. Доставка та оплата оформлюються безпосередньо через дистриб&#39;ютора.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Способи доставки</h2>
            <p className="text-gray-700 mb-4">Офіційний дистриб&#39;ютор зазвичай пропонує наступні способи доставки:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border rounded-xl">
                <h3 className="font-semibold mb-1">Nova Poshta — до відділення</h3>
                <p className="text-gray-500 text-sm mb-2">Доставка до будь-якого відділення по всій Україні</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>Терміни: 1-3 робочі дні</li>
                  <li>Вартість: за тарифами перевізника</li>
                </ul>
              </div>
              <div className="p-4 border rounded-xl">
                <h3 className="font-semibold mb-1">Nova Poshta — кур&#39;єр до дверей</h3>
                <p className="text-gray-500 text-sm mb-2">Доставка за адресою у зручний час</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>Терміни: 1-3 робочі дні</li>
                  <li>Вартість: тарифи + комісія за кур&#39;єрський сервіс</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Способи оплати</h2>
            <p className="text-gray-700 mb-4">Оплата здійснюється безпосередньо офіційному дистриб&#39;ютору:</p>
            <div className="space-y-3">
              <div className="p-4 border rounded-xl">
                <h4 className="font-semibold mb-1">Безготівковий розрахунок</h4>
                <p className="text-gray-500 text-sm">Оплата на рахунок офіційного дистриб&#39;ютора карткою Visa/Mastercard або банківським переказом.</p>
              </div>
              <div className="p-4 border rounded-xl">
                <h4 className="font-semibold mb-1">Накладений платіж</h4>
                <p className="text-gray-500 text-sm">Оплата при отриманні на відділенні Nova Poshta. Додатково сплачується комісія перевізника.</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Як замовити</h2>
            <div className="space-y-3">
              {orderSteps.map((item) => (
                <div key={item.step} className="flex gap-4 p-4 border rounded-xl">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-gray-500 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Важлива інформація</h2>
            <p className="text-gray-700 mb-2"><strong>Розміри упаковки:</strong> приблизно 130×35×60 см</p>
            <p className="text-gray-700 mb-2"><strong>Вага:</strong> 28-60 кг залежно від моделі</p>
            <p className="text-gray-700">При отриманні обов&#39;язково перевірте цілісність упаковки та товару у присутності представника перевізника.</p>
          </section>

          <section className="p-5 bg-gray-50 border rounded-xl">
            <h4 className="font-semibold mb-2">Потрібна консультація?</h4>
            <p className="text-gray-700">
              Телефон: <a href="tel:+380772770006" className="text-blue-600 hover:underline">+38 077 277 00 06</a><br />
              Telegram: <a href="https://t.me/scootify_eco" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@scootify_eco</a>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
