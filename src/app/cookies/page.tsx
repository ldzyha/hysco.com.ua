import { Metadata } from 'next';
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
  combineSchemas,
} from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'Політика Cookies',
  description: 'Дізнайтеся, як HYSCO використовує cookies для покращення вашого досвіду на сайті.',
  alternates: { canonical: '/cookies/' },
  openGraph: {
    type: 'website',
    url: 'https://hysco.com.ua/cookies/',
    siteName: 'HYSCO',
    title: 'Політика Cookies | HYSCO',
    description: 'Дізнайтеся, як HYSCO використовує cookies для покращення вашого досвіду на сайті.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Політика Cookies - HYSCO' }],
  },
};

const cookiesJsonLd = combineSchemas(
  generateWebPageSchema({
    title: 'Політика Cookies | HYSCO',
    description: 'Дізнайтеся, як HYSCO використовує cookies для покращення вашого досвіду на сайті.',
    path: '/cookies/',
  }),
  generateBreadcrumbSchema([
    { name: 'Головна', href: '/' },
    { name: 'Політика Cookies', href: '/cookies/' },
  ])
);

const cookieTypes = [
  {
    name: 'Необхідні cookies',
    description: 'Забезпечують базову функціональність сайту: авторизацію, кошик, безпеку. Без них сайт не зможе працювати коректно.',
    required: true,
  },
  {
    name: 'Функціональні cookies',
    description: 'Запам\'ятовують ваші налаштування: мову, регіон, історію переглядів. Роблять використання сайту більш персоналізованим.',
    required: false,
  },
  {
    name: 'Аналітичні cookies',
    description: 'Допомагають нам зрозуміти, як відвідувачі взаємодіють з сайтом. Ми використовуємо цю інформацію для покращення функціональності та контенту.',
    required: false,
  },
];

export default function CookiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cookiesJsonLd) }}
      />
      <main className="min-h-screen py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <header className="mb-10">
            <h1 className="text-3xl font-bold mb-3">Політика використання Cookies</h1>
            <p className="text-gray-500 text-lg">
              Ми цінуємо вашу приватність та прозоро пояснюємо, як cookies допомагають покращити ваш досвід на сайті.
            </p>
          </header>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Що таке cookies?</h2>
            <p className="text-gray-700">
              Cookies — це невеликі текстові файли, які зберігаються у вашому браузері.
              Вони не містять особистих даних і не можуть завдати шкоди вашому пристрою.
              Натомість вони роблять ваш досвід на сайті значно кращим.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Які cookies ми використовуємо?</h2>
            <div className="space-y-3">
              {cookieTypes.map((type, index) => (
                <div key={index} className="p-4 border rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold">{type.name}</h4>
                    {type.required && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Обов&#39;язкові</span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm">{type.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Навіщо нам cookies?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border rounded-xl">
                <h3 className="font-semibold mb-1">Швидший досвід</h3>
                <p className="text-gray-500 text-sm">Cookies запам&#39;ятовують ваші налаштування та переваги для зручнішої роботи з сайтом.</p>
              </div>
              <div className="p-4 border rounded-xl">
                <h3 className="font-semibold mb-1">Безпека</h3>
                <p className="text-gray-500 text-sm">Ми використовуємо cookies для захисту від несанкціонованого доступу та підозрілої активності.</p>
              </div>
              <div className="p-4 border rounded-xl">
                <h3 className="font-semibold mb-1">Покращення сайту</h3>
                <p className="text-gray-500 text-sm">Аналітичні cookies допомагають нам знаходити та виправляти проблеми, покращувати навігацію.</p>
              </div>
              <div className="p-4 border rounded-xl">
                <h3 className="font-semibold mb-1">Проактивна підтримка</h3>
                <p className="text-gray-500 text-sm">Завдяки аналітиці ми можемо дізнатися про технічні проблеми та швидко їх вирішувати.</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Ви контролюєте свої cookies</h2>
            <p className="text-gray-700 mb-2">
              Ви можете видалити cookies у будь-який момент через налаштування браузера.
              Проте це може вплинути на функціональність сайту: налаштування скинуться, а деякі функції можуть не працювати.
            </p>
            <p className="text-gray-700">
              Якщо ви не згодні з використанням cookies, ви можете покинути сайт. Ми поважаємо ваш вибір.
            </p>
          </section>

          <section className="p-5 bg-gray-50 border rounded-xl">
            <h4 className="font-semibold mb-2">Маєте запитання?</h4>
            <p className="text-gray-700">
              Якщо у вас є питання щодо нашої політики cookies або обробки даних, зв&#39;яжіться з нами:{' '}
              <a href="tel:+380772770006" className="text-blue-600 hover:underline">+38 077 277 00 06</a> або{' '}
              <a href="https://t.me/scootify_eco" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Telegram</a>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
