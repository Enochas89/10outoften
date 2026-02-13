import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  Users,
  Tent,
  Mountain,
  CheckCircle2,
  Menu,
  X,
  Instagram,
  Facebook,
  Sun,
} from 'lucide-react';

const NAV_ITEMS = ['Home', 'Expeditions', 'About', 'Contact'];

const INITIAL_EVENTS = [
  {
    id: 1,
    date: new Date(2025, 1, 15),
    title: 'Summit & Sausage Sizzle',
    location: 'Eagle Peak',
    type: 'Hiking',
  },
  {
    id: 2,
    date: new Date(2025, 1, 22),
    title: 'Dad & Lad Camping',
    location: 'Pine Ridge',
    type: 'Camping',
  },
  {
    id: 3,
    date: new Date(2025, 2, 5),
    title: 'River Kayaking',
    location: 'Blue Creek',
    type: 'Water',
  },
  {
    id: 4,
    date: new Date(2025, 2, 12),
    title: 'Wilderness First Aid 101',
    location: 'Clubhouse',
    type: 'Workshop',
  },
];

export default function App() {
  const [currentDate, setCurrentDate] = useState(
    new Date(INITIAL_EVENTS[0].date.getFullYear(), INITIAL_EVENTS[0].date.getMonth(), 1),
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState(null);

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const prevMonth = () =>
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));

  const nextMonth = () =>
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus(null), 5000);
    }, 1500);
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);
    const days = [];

    for (let i = 0; i < startDay; i += 1) {
      days.push(
        <div
          key={`pad-${i}`}
          className="h-24 border border-stone-200/60 bg-stone-50 md:h-32"
          aria-hidden="true"
        />,
      );
    }

    for (let day = 1; day <= totalDays; day += 1) {
      const dayEvents = INITIAL_EVENTS.filter((event) => {
        const eventDate = event.date;
        return (
          eventDate.getDate() === day &&
          eventDate.getMonth() === month &&
          eventDate.getFullYear() === year
        );
      });

      days.push(
        <div
          key={day}
          className="relative h-24 overflow-hidden border border-stone-200/80 bg-white p-2 transition-colors hover:bg-emerald-50 md:h-32"
        >
          <span className="font-mono text-sm text-stone-400">{day}</span>
          <div className="mt-1 space-y-1">
            {dayEvents.map((event) => (
              <div
                key={event.id}
                className="truncate rounded bg-emerald-600 px-1.5 py-0.5 text-[10px] font-medium text-white shadow-sm md:text-xs"
                title={`${event.title} - ${event.location}`}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>,
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-emerald-200">
      <nav className="fixed z-50 w-full border-b border-stone-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <a href="#home" className="flex items-center gap-2">
              <div className="rounded-lg bg-emerald-600 p-2">
                <Mountain className="h-6 w-6 text-white" />
              </div>
              <span className="font-hero text-xl uppercase italic tracking-tight text-stone-900">
                10/10 <span className="text-emerald-600">Dads</span>
              </span>
            </a>

            <div className="hidden items-center gap-8 md:flex">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-semibold text-stone-600 transition-colors hover:text-emerald-600"
                >
                  {item}
                </a>
              ))}
              <a
                href="#contact"
                className="rounded-full bg-emerald-600 px-6 py-2 text-sm font-bold text-white shadow-md shadow-emerald-200 transition-all hover:scale-105 hover:bg-emerald-700"
              >
                Join the Pack
              </a>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="p-2 text-stone-600"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="space-y-4 border-b border-stone-200 bg-white p-4 shadow-xl md:hidden">
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="block text-lg font-bold text-stone-800 hover:text-emerald-600"
              >
                {item}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="inline-block rounded-full bg-emerald-600 px-6 py-2 text-sm font-bold text-white"
            >
              Join the Pack
            </a>
          </div>
        )}
      </nav>

      <header id="home" className="relative overflow-hidden bg-white px-4 pb-24 pt-40">
        <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-emerald-100/50 blur-[100px]" />
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-sm font-bold text-emerald-700">
            <Sun className="h-4 w-4 text-emerald-500" />
            <span>EST. 2024 - THE PREMIER OUTDOORS CLUB FOR DADS</span>
          </div>
          <h1 className="font-hero mb-6 text-6xl leading-[0.9] tracking-tight text-stone-900 md:text-8xl">
            LESS SCREEN TIME.
            <br />
            <span className="text-emerald-600">MORE PEAK TIME.</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-xl font-medium leading-relaxed text-stone-600">
            Building a community of fathers who value wilderness, adventure, and teaching the next
            generation that &quot;outdoorsy&quot; isn&apos;t just a vibe, it&apos;s a lifestyle.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#expeditions"
              className="group flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-100 transition-all hover:bg-emerald-700"
            >
              View Calendar
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#about"
              className="rounded-xl border-2 border-stone-200 bg-white px-8 py-4 text-lg font-bold text-stone-800 transition-all hover:bg-stone-50"
            >
              Our Manifesto
            </a>
          </div>
        </div>
      </header>

      <section id="about" className="bg-stone-100/50 px-4 py-24">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          {[
            {
              icon: <Mountain />,
              title: 'No Dad Left Behind',
              desc: 'From beginner hikes to multi-day alpine summits, we scale to your level.',
            },
            {
              icon: <Tent />,
              title: 'Family Expeditions',
              desc: 'Special events designed to get the kids off the iPad and into the mud.',
            },
            {
              icon: <Users />,
              title: 'Brotherhood',
              desc: 'Real conversations by the campfire. No judgment, just good vibes.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm transition-all hover:border-emerald-400 hover:shadow-md"
            >
              <div className="mb-4 w-fit rounded-2xl bg-emerald-50 p-3 text-emerald-600">{item.icon}</div>
              <h3 className="mb-3 text-2xl font-bold text-stone-900">{item.title}</h3>
              <p className="leading-relaxed text-stone-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="expeditions" className="mx-auto max-w-7xl px-4 py-24">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-hero mb-2 text-4xl uppercase italic text-stone-900">
              Expedition Calendar
            </h2>
            <p className="font-medium text-stone-600">
              Lock in your next adventure. RSVP required for all gear-heavy trips.
            </p>
            <a
              href="https://license.gooutdoorstennessee.com/Event/Calendar.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700 transition-colors hover:bg-emerald-100"
            >
              View Tennessee Outdoor Events
            </a>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-stone-200 bg-white p-2 shadow-sm">
            <button
              onClick={prevMonth}
              className="rounded-lg p-2 text-stone-600 transition-colors hover:bg-stone-100"
              aria-label="Previous month"
            >
              <ChevronLeft />
            </button>
            <span className="min-w-[160px] text-center font-bold uppercase tracking-widest text-emerald-700">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
            <button
              onClick={nextMonth}
              className="rounded-lg p-2 text-stone-600 transition-colors hover:bg-stone-100"
              aria-label="Next month"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 overflow-hidden rounded-xl border-l border-t border-stone-200 bg-white shadow-xl shadow-stone-200/50">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName) => (
            <div
              key={dayName}
              className="border-b border-r border-stone-200 bg-stone-50 p-4 text-center text-xs font-bold uppercase tracking-tighter text-stone-400"
            >
              {dayName}
            </div>
          ))}
          {renderCalendar()}
        </div>

        <div className="mt-8 flex flex-wrap gap-6 text-sm font-medium text-stone-500">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-emerald-600" />
            Upcoming Expedition
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-stone-300" />
            Regular Meetup
          </div>
        </div>
      </section>

      <section id="contact" className="border-y border-emerald-100 bg-emerald-50/50 px-4 py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-16 md:grid-cols-2">
          <div>
            <h2 className="font-hero mb-6 text-5xl uppercase italic text-stone-900">Join the Pack</h2>
            <p className="mb-10 text-xl font-medium leading-relaxed text-stone-600">
              Whether you&apos;re looking for gear recommendations, want to lead a trip, or just want to
              grab coffee and talk about the trail, hit us up.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
                  <Mail className="text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900">Email Us</h4>
                  <p className="text-sm text-stone-600">basecamp@tenoutoftendadsclub.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
                  <MapPin className="text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900">Base Camp</h4>
                  <p className="text-sm text-stone-600">PNW & Beyond</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-2xl shadow-emerald-900/5">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="ml-1 text-xs font-bold uppercase tracking-wider text-stone-400">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 p-4 outline-none transition-all placeholder:text-stone-300 focus:ring-2 focus:ring-emerald-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="ml-1 text-xs font-bold uppercase tracking-wider text-stone-400">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@trail.com"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 p-4 outline-none transition-all placeholder:text-stone-300 focus:ring-2 focus:ring-emerald-400"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="ml-1 text-xs font-bold uppercase tracking-wider text-stone-400">
                  Message
                </label>
                <textarea
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your outdoor experience..."
                  className="w-full resize-none rounded-xl border border-stone-200 bg-stone-50 p-4 outline-none transition-all placeholder:text-stone-300 focus:ring-2 focus:ring-emerald-400"
                />
              </div>
              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full rounded-xl bg-emerald-600 py-4 font-bold text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-700 disabled:bg-stone-300"
              >
                {formStatus === 'sending' ? 'Sending Signal...' : 'Send Message'}
              </button>

              {formStatus === 'success' && (
                <div className="flex items-center justify-center gap-2 font-bold text-emerald-600">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Signal received! We&apos;ll reach out soon.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-white px-4 py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-emerald-600 p-1.5">
              <Mountain className="h-4 w-4 text-white" />
            </div>
            <span className="font-hero text-sm uppercase italic tracking-tight text-stone-900">
              10/10 Dads Club
            </span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-stone-400 transition-colors hover:text-emerald-600" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-stone-400 transition-colors hover:text-emerald-600" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-stone-400 transition-colors hover:text-emerald-600" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
            (c) {new Date().getFullYear()} Ten Out Of Ten Dads Club. No dad left behind.
          </p>
        </div>
      </footer>
    </div>
  );
}
