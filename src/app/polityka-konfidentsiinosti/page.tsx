import { Metadata } from 'next';
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
  combineSchemas,
} from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'Політика конфіденційності',
  description: 'Політика конфіденційності HYSCO. Дізнайтеся, як ми збираємо, використовуємо та захищаємо ваші персональні дані.',
  alternates: { canonical: '/polityka-konfidentsiinosti/' },
  openGraph: {
    type: 'website',
    url: 'https://hysco.com.ua/polityka-konfidentsiinosti/',
    siteName: 'HYSCO',
    title: 'Політика конфіденційності | HYSCO',
    description: 'Дізнайтеся, як HYSCO збирає, використовує та захищає ваші персональні дані.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Політика конфіденційності - HYSCO' }],
  },
};

const privacyJsonLd = combineSchemas(
  generateWebPageSchema({
    title: 'Політика конфіденційності | HYSCO',
    description: 'Дізнайтеся, як HYSCO збирає, використовує та захищає ваші персональні дані.',
    path: '/polityka-konfidentsiinosti/',
  }),
  generateBreadcrumbSchema([
    { name: 'Головна', href: '/' },
    { name: 'Політика конфіденційності', href: '/polityka-konfidentsiinosti/' },
  ])
);

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyJsonLd) }}
      />
      <main className="min-h-screen py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <header className="mb-10">
            <h1 className="text-3xl font-bold mb-3">Політика конфіденційності</h1>
            <p className="text-gray-500 text-lg">
              Дізнайтеся, як ми збираємо, використовуємо та захищаємо ваші персональні дані.
            </p>
          </header>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">1. Вступ</h2>
            <p className="text-gray-700 mb-2">HYSCO поважає вашу приватність та зобов&#39;язується захищати ваші персональні дані.</p>
            <p className="text-gray-700 mb-2">Ця політика пояснює, яку інформацію ми збираємо, як її використовуємо та захищаємо при використанні сайту hysco.com.ua.</p>
            <p className="text-gray-700">Використовуючи сайт, ви погоджуєтесь з умовами цієї політики.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">2. Яку інформацію ми збираємо</h2>
            <p className="text-gray-700 font-medium mb-2">Інформація, яку ви надаєте безпосередньо:</p>
            <ul className="list-disc pl-5 text-gray-600 mb-4 space-y-1">
              <li>Прізвище та ім&#39;я</li>
              <li>Номер телефону</li>
              <li>Адреса доставки</li>
              <li>Повідомлення через форму зворотного зв&#39;язку</li>
            </ul>
            <p className="text-gray-700 font-medium mb-2">Інформація, що збирається автоматично:</p>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>IP-адреса</li>
              <li>Тип браузера та пристрою</li>
              <li>Сторінки, які ви відвідуєте</li>
              <li>Час та дата відвідування</li>
              <li>Джерело переходу на сайт</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">3. Як ми використовуємо інформацію</h2>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Обробка та виконання замовлень</li>
              <li>Зв&#39;язок щодо замовлень та запитів</li>
              <li>Надання підтримки та консультацій</li>
              <li>Покращення сайту та сервісу</li>
              <li>Надсилання рекламної інформації (за вашою згодою)</li>
              <li>Виконання вимог законодавства</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">4. Кому ми передаємо дані</h2>
            <ul className="list-disc pl-5 text-gray-600 mb-4 space-y-1">
              <li>Служби доставки (Nova Poshta) — для відправки замовлень</li>
              <li>Платіжні системи — для обробки платежів</li>
              <li>Сервіси аналітики (Google Analytics, Firebase) — для аналізу роботи сайту</li>
              <li>Державні органи — у випадках, передбачених законодавством</li>
            </ul>
            <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
              <p className="text-gray-700 text-sm"><strong>Важливо:</strong> Ми не продаємо та не передаємо ваші персональні дані третім сторонам для маркетингових цілей.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">5. Захист даних</h2>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>HTTPS-шифрування з&#39;єднання</li>
              <li>Обмежений доступ до персональних даних</li>
              <li>Регулярні оновлення безпеки</li>
              <li>Шифрування конфіденційної інформації</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">6. Файли Cookies</h2>
            <p className="text-gray-700 mb-2">Сайт використовує cookies для забезпечення функціональності, збору статистики відвідувань та покращення користувацького досвіду.</p>
            <p className="text-gray-700 mb-2">Ви можете налаштувати свій браузер для блокування cookies, але це може вплинути на роботу сайту.</p>
            <p className="text-gray-700">Детальніше — на сторінці «Політика Cookies».</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">7. Ваші права</h2>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Запитувати інформацію про ваші персональні дані</li>
              <li>Вимагати виправлення неточної інформації</li>
              <li>Вимагати видалення ваших даних</li>
              <li>Відкликати згоду на обробку даних</li>
              <li>Відмовитися від отримання маркетингових повідомлень</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">8. Зберігання даних</h2>
            <p className="text-gray-700 mb-2">Персональні дані зберігаються протягом часу, необхідного для цілей, описаних у цій політиці, або відповідно до вимог законодавства.</p>
            <p className="text-gray-700">Дані замовлень зберігаються протягом гарантійного періоду плюс 3 роки.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">9. Діти</h2>
            <p className="text-gray-700 mb-2">Сайт не призначений для осіб молодше 18 років.</p>
            <p className="text-gray-700">Ми свідомо не збираємо персональні дані дітей.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">10. Зміни політики</h2>
            <p className="text-gray-700 mb-2">Ми можемо оновлювати цю політику.</p>
            <p className="text-gray-700">Актуальна версія завжди доступна на цій сторінці з зазначенням дати оновлення.</p>
          </section>

          <section className="p-5 bg-gray-50 border rounded-xl">
            <h4 className="font-semibold mb-2">Контакти з питань конфіденційності</h4>
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
