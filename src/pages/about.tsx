import { AnnotationIcon, GlobeAltIcon, LightningBoltIcon, ScaleIcon } from '@heroicons/react/outline'
import Navbar2 from '@/components/Navbar2';

const features = [
  {
    name: 'Duży wybór części',
    description:
      'Ogrom oferowanych przez nas produktów wynika z uzyskania partnerstwa z wieloma firmami motoryzacyjnymi',
    icon: GlobeAltIcon,
  },
  {
    name: 'Łatwy do obsługi interfejs',
    description:
      'Nasza strona zaprojektowana została dla pasjonatów co oznacza brak bezsensownych reklam oraz niepotrzebnych stron',
    icon: ScaleIcon,
  },
  {
    name: 'Prędkość złożenia zamówienia',
    description:
      'Po potwierdzeniu złożenia zamówienia zostaje ono natychmiastowo przesłane do bazy zamówień dzięki czemu nasi pracownicy mogą skompletować twoje zamówienie niemalże natychmiast',
    icon: LightningBoltIcon,
  },
  {
    name: 'Prędkość dostawy zamówienia',
    description:
      'Dzięki naszej współpracy z firmą kurierską DHL paczki z naszych placówek odbierane są dwa razy w ciągu jednego dnia od poniedziąłku do piątku dzięki czemu zamówienia szybko dostarczane są do klientów',
    icon: AnnotationIcon,
  },
  {
    name: 'Szybka pomoc obsługi',
    description:
      'Jeśli masz jakieś pytanie skontaktuj się z obsługą a postarją się oni w szybki sposób odpowiedzieć na twoje pytanie',
    icon: AnnotationIcon,
  },
]

const About = () => {

  return (
    <div>
      <Navbar2 />
      <div className="mt-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-gray-800 font-semibold tracking-wide uppercase">O nas :</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            MotorSportShop
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Nasza firma została założona w 2015 roku i to już od wtedy pomagamy realizować marzenia naszych klientów.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gray-800 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

export default About;

