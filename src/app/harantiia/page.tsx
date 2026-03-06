import { Metadata } from 'next';
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  combineSchemas,
} from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'Гарантія та сервіс',
  description: 'Офіційна гарантія на електросамокати від дистриб\'ютора. Технічна підтримка та консультації. HYSCO з\'єднує вас з офіційними дистриб\'юторами.',
  alternates: { canonical: '/harantiia/' },
  openGraph: {
    type: 'website',
    url: 'https://hysco.com.ua/harantiia/',
    siteName: 'HYSCO',
    title: 'Гарантія та сервіс | HYSCO',
    description: 'Офіційна гарантія на електросамокати від дистриб\'ютора. Технічна підтримка та консультації.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Гарантія та сервіс - HYSCO' }],
  },
};

const warrantyFAQs = [
  {
    question: 'Який термін гарантії на електросамокати?',
    answer: 'Офіційна гарантія надається через офіційного дистриб\'ютора. Термін гарантії встановлюється дистриб\'ютором відповідно до умов виробника.',
  },
  {
    question: 'Хто надає гарантію?',
    answer: 'Гарантія надається офіційним дистриб\'ютором. Ми допомагаємо з\'єднати вас з дистриб\'ютором для вирішення гарантійних питань.',
  },
  {
    question: 'Що покриває гарантія?',
    answer: 'Гарантія покриває виробничі дефекти матеріалів, електронні компоненти (контролер, дисплей), двигун та трансмісію, батарею, гальмівну систему, підвіску, освітлення та сигналізацію.',
  },
  {
    question: 'Як отримати технічну підтримку?',
    answer: 'Зв\'яжіться з нами через Telegram (@scootify_eco) або за телефоном (+38 077 277 00 06). Ми проконсультуємо вас та за потреби з\'єднаємо з офіційним дистриб\'ютором.',
  },
];

const coveredItems = [
  'Виробничі дефекти матеріалів',
  'Електронні компоненти (контролер, дисплей)',
  'Двигун та трансмісія',
  'Батарея',
  'Гальмівна система',
  'Підвіска',
  'Освітлення та сигналізація',
];

const notCoveredItems = [
  'Механічні пошкодження від ударів та падінь',
  'Пошкодження від неправильної експлуатації',
  'Природний знос витратних матеріалів (шини, гальмівні колодки)',
  'Використання неоригінальних запчастин',
  'Самостійний ремонт з порушенням інструкцій',
  'Пошкодження від екстремальних температур',
  'Косметичні дефекти (подряпини, сколи)',
];

const warrantyJsonLd = combineSchemas(
  generateWebPageSchema({
    title: 'Гарантія та сервіс | HYSCO',
    description: 'Офіційна гарантія на електросамокати від дистриб\'ютора. Технічна підтримка та консультації.',
    path: '/harantiia/',
  }),
  generateBreadcrumbSchema([
    { name: 'Головна', href: '/' },
    { name: 'Гарантія та сервіс', href: '/harantiia/' },
  ]),
  generateFAQSchema(warrantyFAQs)
);

export default function WarrantyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(warrantyJsonLd) }}
      />
      <main className="min-h-screen py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <header className="mb-10">
            <h1 className="text-3xl font-bold mb-3">Гарантія та сервіс</h1>
            <p className="text-gray-500 text-lg">
              Офіційна гарантія від дистриб&#39;ютора. HYSCO з&#39;єднує вас з офіційними дистриб&#39;юторами безкоштовно.
            </p>
          </header>

          <section className="mb-8 p-5 bg-blue-50 border border-blue-200 rounded-xl">
            <h4 className="font-semibold mb-2">Як працює гарантія</h4>
            <p className="text-gray-700">
              Гарантія на електросамокати надається офіційним дистриб&#39;ютором.
              Ми допомагаємо з&#39;єднати вас з дистриб&#39;ютором для вирішення будь-яких гарантійних питань.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Умови гарантії від дистриб&#39;ютора</h2>
            <p className="text-gray-700 mb-2">
              <strong>Термін гарантії:</strong> встановлюється офіційним дистриб&#39;ютором відповідно до умов виробника.
            </p>
            <p className="text-gray-700">
              Гарантійне та післягарантійне обслуговування здійснюється через офіційного дистриб&#39;ютора та авторизовані сервісні центри.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-green-700">Що покриває гарантія</h2>
            <ul className="space-y-2">
              {coveredItems.map((item, index) => (
                <li key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-red-700">Що не покриває гарантія</h2>
            <ul className="space-y-2">
              {notCoveredItems.map((item, index) => (
                <li key={index} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
                  <span className="text-red-500 font-bold">✕</span>
                  <span className="text-gray-500">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Наша підтримка</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border rounded-xl">
                <h3 className="font-semibold mb-1">Безкоштовна консультація</h3>
                <p className="text-gray-500 text-sm">Допомагаємо з вибором моделі та відповідаємо на технічні питання</p>
              </div>
              <div className="p-4 border rounded-xl">
                <h3 className="font-semibold mb-1">Дистанційна діагностика</h3>
                <p className="text-gray-500 text-sm">Допоможемо виявити проблему через відеозв&#39;язок</p>
              </div>
              <div className="p-4 border rounded-xl">
                <h3 className="font-semibold mb-1">Замовлення запчастин</h3>
                <p className="text-gray-500 text-sm">Допоможемо замовити оригінальні запчастини через дистриб&#39;ютора</p>
              </div>
              <div className="p-4 border rounded-xl">
                <h3 className="font-semibold mb-1">Відеоінструкції</h3>
                <p className="text-gray-500 text-sm">Покрокові інструкції для самостійного обслуговування</p>
              </div>
            </div>
          </section>

          <section className="p-5 bg-gray-50 border rounded-xl">
            <h4 className="font-semibold mb-2">Потрібна допомога?</h4>
            <p className="text-gray-700">
              Telegram: <a href="https://t.me/scootify_eco" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@scootify_eco</a><br />
              Телефон: <a href="tel:+380772770006" className="text-blue-600 hover:underline">+38 077 277 00 06</a>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
