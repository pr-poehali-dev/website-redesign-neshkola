import { useState } from 'react';
import Icon from '@/components/ui/icon';

const PDF_URL = 'https://functions.poehali.dev/8cfcbdd9-9fe1-45b2-9a98-4d05f5e0c880';
import { Button } from '@/components/ui/button';
import GlossyBlob from '@/components/GlossyBlob';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/8b576231-af46-4008-b393-3acd1d3dd05f/files/1f5064ac-798f-4b57-bee4-c766928d559d.jpg';

const NAV = [
  { label: 'О центре', href: '#about' },
  { label: 'Программы', href: '#programs' },
  { label: 'Расписание', href: '#schedule' },
  { label: 'Контакты', href: '#contacts' },
];

const PROGRAM_GROUPS = [
  {
    category: 'Подготовка к школе',
    icon: 'BookOpen',
    color: 'bg-primary',
    items: [
      'Подготовка к школе / Экспресс',
      'Подготовка к школе 2 года',
      'Подготовка к школе — индивидуально',
      'Учусь читать (4–5 лет)',
      'Учусь читать (6–7 лет)',
      'Техника чтения (читающие дети)',
    ],
  },
  {
    category: 'Школьные предметы',
    icon: 'GraduationCap',
    color: 'bg-secondary',
    items: [
      'Русский язык + ВПР + коррекция почерка',
      'Математика: 2, 3, 4 класс',
      'Ментальная арифметика',
      'Развитие памяти (мнемотехника)',
      'Школа внимания',
    ],
  },
  {
    category: 'Английский язык',
    icon: 'Globe',
    color: 'bg-sky',
    items: [
      'Английский язык — группа 2 раза в неделю',
      'Английский язык — группа 1 раз в неделю',
      'Английский язык — индивидуально',
      'Английский язык — индивидуально 1 раз в неделю',
    ],
  },
  {
    category: 'Творчество',
    icon: 'Palette',
    color: 'bg-berry',
    items: [
      'ИЗО студия / Креативное рисование',
      'Школа настроения',
      'Песочная анимация',
      'Интерьерная картина',
      'Пластилинка',
    ],
  },
  {
    category: 'Нейро-направления 🆕',
    icon: 'Brain',
    color: 'bg-grass',
    items: [
      'Нейробика',
      'Нейролепка',
      'Песочная сказка',
    ],
  },
  {
    category: 'Психология и помощь',
    icon: 'Heart',
    color: 'bg-teal',
    items: [
      'Сам себе психолог',
      'Сам себе психолог для подростков',
      'Психолог',
      'Логопед',
      'Репетитор — индивидуально',
      'Репетитор — мини-группа (2–3 чел)',
    ],
  },
];

const ALL_PROGRAMS = PROGRAM_GROUPS.flatMap(g => g.items);

const SCHEDULE = [
  { day: 'Понедельник', items: ['9:00 Логопед (инд.)', '10:00 Учусь читать 4–5 лет', '16:00 Подготовка к школе', '17:30 Английский (группа)'] },
  { day: 'Вторник', items: ['10:00 ИЗО студия', '11:30 Нейробика', '16:00 Ментальная арифметика', '17:30 Психолог (инд.)'] },
  { day: 'Среда', items: ['9:00 Логопед (инд.)', '10:00 Подготовка к школе', '16:00 Английский (группа)', '17:30 Русский язык + ВПР'] },
  { day: 'Четверг', items: ['10:00 Пластилинка', '11:30 Школа внимания', '16:00 Математика 2–4 класс', '17:30 Английский (инд.)'] },
  { day: 'Пятница', items: ['9:00 Логопед (инд.)', '10:00 Техника чтения', '16:00 Нейролепка', '17:30 Ментальная арифметика'] },
  { day: 'Суббота', items: ['10:00 Песочная сказка', '11:30 ИЗО / Креативное рисование', '13:00 Подготовка к школе (экспресс)', '14:30 Сам себе психолог'] },
];

const FEATURES = [
  { icon: 'Users', title: 'Опытные педагоги', desc: 'Команда с профильным образованием и любовью к детям.' },
  { icon: 'Heart', title: 'Уютная атмосфера', desc: 'Светлые залы, безопасные материалы, забота в каждой детали.' },
  { icon: 'Sparkles', title: 'Авторские методики', desc: 'Современные программы, проверенные сотнями счастливых детей.' },
  { icon: 'Smile', title: 'Малые группы', desc: 'До 8 детей в группе — внимание каждому ребёнку.' },
];

function Index() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [program, setProgram] = useState('');
  const [pdfLoading, setPdfLoading] = useState(false);

  const handleDownloadPdf = async () => {
    setPdfLoading(true);
    try {
      const res = await fetch(PDF_URL);
      if (!res.ok) throw new Error('Ошибка генерации');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'neshkola-buklет.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      toast({ title: 'Ошибка', description: 'Не удалось скачать буклет. Попробуйте позже.', variant: 'destructive' });
    } finally {
      setPdfLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Заявка принята! 🎉',
      description: 'Мы свяжемся с вами в ближайшее время для подтверждения записи.',
    });
    setName('');
    setPhone('');
    setProgram('');
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <a href="#" className="flex items-center">
            <img
              src="https://cdn.poehali.dev/projects/8b576231-af46-4008-b393-3acd1d3dd05f/bucket/e5babbce-f0f4-42e1-86af-262f415f38e3.png"
              alt="НЕШКОЛА — территория знаний"
              className="h-12 w-auto object-contain"
            />
          </a>
          <nav className="hidden md:flex items-center gap-7">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="font-bold text-foreground/70 hover:text-primary transition-colors">
                {n.label}
              </a>
            ))}
          </nav>
          <Button asChild className="rounded-full font-bold shadow-lg shadow-primary/30">
            <a href="#signup">Записаться</a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <GlossyBlob size={200} color="#00B33C" className="-top-12 -left-14 opacity-60" delay={0} />
        <GlossyBlob size={140} color="#7B3FA0" className="top-32 right-8 opacity-50" delay={1.5} slow />
        <GlossyBlob size={90}  color="#00B33C" className="bottom-10 left-1/3 opacity-40" delay={3} slow />
        <div className="container relative grid lg:grid-cols-2 gap-10 items-center py-16 lg:py-24">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 font-bold text-accent-foreground mb-6">
              <Icon name="Star" size={18} /> Центр развития детей в Пскове
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6">
              Здесь дети <span className="text-primary">учатся</span> с{' '}
              <span className="text-secondary">удовольствием</span>!
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 mb-8 max-w-lg">
              Развивающие занятия для детей от 2 до 12 лет. Творчество, знания и дружба —
              в яркой и доброй атмосфере НЕШКОЛЫ.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full text-lg font-bold h-14 px-8 shadow-xl shadow-primary/30 hover-scale">
                <a href="#signup">Записаться на занятие</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full text-lg font-bold h-14 px-8 border-2 border-foreground/20 hover-scale">
                <a href="#programs">Наши программы</a>
              </Button>
            </div>
            <div className="flex items-center gap-6 mt-10">
              <div>
                <div className="font-display text-3xl font-extrabold text-primary">500+</div>
                <div className="text-sm font-bold text-foreground/60">счастливых детей</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <div className="font-display text-3xl font-extrabold text-secondary">30+</div>
                <div className="text-sm font-bold text-foreground/60">программ</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <div className="font-display text-3xl font-extrabold text-berry">7</div>
                <div className="text-sm font-bold text-foreground/60">лет опыта</div>
              </div>
            </div>
          </div>
          <div className="relative animate-scale-in flex items-center justify-center">
            <div className="absolute inset-0 rounded-[3rem] bg-primary rotate-3 opacity-20" />
            <img
              src="https://cdn.poehali.dev/projects/8b576231-af46-4008-b393-3acd1d3dd05f/bucket/b16e2d03-cfcb-4562-a981-fa961fe6ba40.png"
              alt="Персонажи НЕШКОЛЫ"
              className="relative w-full object-contain drop-shadow-2xl animate-float"
              style={{ maxHeight: '580px' }}
            />
            <div className="absolute -bottom-2 -left-2 bg-white rounded-3xl shadow-xl px-5 py-4 flex items-center gap-3 animate-float" style={{ animationDelay: '1s' }}>
              <span className="text-3xl">🚀</span>
              <div>
                <div className="font-display font-extrabold leading-none">Записываемся!</div>
                <div className="text-xs text-foreground/60 font-bold">новый набор групп</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features / About */}
      <section id="about" className="relative overflow-hidden container py-16 lg:py-24">
        <GlossyBlob size={110} color="#7B3FA0" className="top-0 right-0 opacity-35" delay={2} slow />
        <GlossyBlob size={75}  color="#00B33C" className="bottom-4 left-0 opacity-30" delay={0.8} />
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-4">
            Почему выбирают <span className="text-primary">НЕШКОЛУ</span>
          </h2>
          <p className="text-lg text-foreground/70">
            Мы создали место, где каждый ребёнок раскрывает свои таланты и с радостью бежит на занятия.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="bg-card rounded-3xl p-7 shadow-lg hover:-translate-y-2 transition-transform duration-300"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent mb-5">
                <Icon name={f.icon} size={28} className="text-accent-foreground" />
              </div>
              <h3 className="font-display text-xl font-extrabold mb-2">{f.title}</h3>
              <p className="text-foreground/70">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="relative overflow-hidden bg-secondary/10 py-16 lg:py-24">
        <GlossyBlob size={160} color="#00B33C" className="-top-10 -right-10 opacity-25" delay={1} slow />
        <GlossyBlob size={100} color="#7B3FA0" className="bottom-0 left-10 opacity-20" delay={3.5} />
        <div className="container relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block rounded-full bg-secondary/20 px-4 py-2 font-bold text-secondary mb-4">
              6 направлений • 30+ программ
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold">Наши программы</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAM_GROUPS.map((g) => (
              <div key={g.category} className="group bg-card rounded-3xl p-7 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${g.color} mb-5 group-hover:animate-wiggle`}>
                  <Icon name={g.icon} size={32} className="text-white" />
                </div>
                <h3 className="font-display text-xl font-extrabold mb-4">{g.category}</h3>
                <ul className="space-y-2">
                  {g.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-foreground/75">
                      <Icon name="ChevronRight" size={16} className="text-primary mt-0.5 shrink-0" />
                      <span className="text-sm font-semibold">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section id="schedule" className="relative overflow-hidden container py-16 lg:py-24">
        <GlossyBlob size={130} color="#00B33C" className="top-8 -right-8 opacity-30" delay={0.5} />
        <GlossyBlob size={85}  color="#7B3FA0" className="bottom-8 left-4 opacity-25" delay={2.2} slow />
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-4">Расписание занятий</h2>
          <p className="text-lg text-foreground/70">Выберите удобный день — и приходите за новыми открытиями!</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SCHEDULE.map((s, i) => (
            <div
              key={s.day}
              className={`rounded-3xl p-6 shadow-lg ${i % 2 === 0 ? 'bg-card' : 'bg-accent/40'}`}
            >
              <div className="flex items-center gap-2 mb-4">
                <Icon name="CalendarDays" size={22} className="text-primary" />
                <h3 className="font-display text-xl font-extrabold">{s.day}</h3>
              </div>
              <ul className="space-y-2">
                {s.items.map((it) => (
                  <li key={it} className="flex items-center gap-2 font-bold text-foreground/75">
                    <Icon name="Clock" size={16} className="text-secondary" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleDownloadPdf}
            disabled={pdfLoading}
            className="inline-flex items-center gap-3 rounded-full bg-secondary text-white font-display font-extrabold text-lg px-8 h-14 shadow-xl shadow-secondary/30 hover:scale-105 hover:shadow-2xl transition-all duration-300 disabled:opacity-60 disabled:scale-100"
          >
            {pdfLoading ? (
              <>
                <Icon name="Loader" size={22} className="animate-spin" />
                Генерируем буклет...
              </>
            ) : (
              <>
                <Icon name="Download" size={22} />
                Скачать полный буклет (PDF)
              </>
            )}
          </button>
        </div>
      </section>

      {/* Signup */}
      <section id="signup" className="py-16 lg:py-24">
        <div className="container">
          <div className="relative overflow-hidden rounded-[3rem] bg-primary p-8 md:p-14 shadow-2xl">
            <GlossyBlob size={180} color="#ffffff" className="-top-16 -right-16 opacity-15" delay={0} slow />
            <GlossyBlob size={220} color="#3db87a" className="-bottom-20 -left-16 opacity-20" delay={2} />
            <GlossyBlob size={90}  color="#ffffff" className="top-1/2 right-1/4 opacity-10" delay={1} slow />
            <div className="relative grid lg:grid-cols-2 gap-10 items-center">
              <div className="text-primary-foreground">
                <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-4">
                  Запишитесь на занятие
                </h2>
                <p className="text-lg text-primary-foreground/90 mb-6 max-w-md">
                  Оставьте заявку — мы подберём программу под вашего ребёнка и подтвердим запись
                  по email или SMS.
                </p>
                <div className="flex items-center gap-3 font-bold">
                  <Icon name="Gift" size={24} />
                  Первое пробное занятие — бесплатно!
                </div>
              </div>
              <form onSubmit={handleSubmit} className="bg-card rounded-3xl p-7 shadow-xl space-y-4">
                <div>
                  <label className="font-bold text-sm mb-1.5 block">Имя ребёнка и родителя</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Например, Маша и Анна"
                    required
                    className="rounded-xl h-12 border-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-sm mb-1.5 block">Телефон</label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (___) ___-__-__"
                    required
                    className="rounded-xl h-12 border-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-sm mb-1.5 block">Программа</label>
                  <Select value={program} onValueChange={setProgram}>
                    <SelectTrigger className="rounded-xl h-12 border-2">
                      <SelectValue placeholder="Выберите направление" />
                    </SelectTrigger>
                    <SelectContent>
                      {ALL_PROGRAMS.map((p) => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" size="lg" className="w-full rounded-xl h-13 text-lg font-bold h-12">
                  Отправить заявку
                </Button>
                <p className="text-xs text-center text-foreground/50">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts / Footer */}
      <footer id="contacts" className="bg-foreground text-background py-14">
        <div className="container grid md:grid-cols-3 gap-10">
          <div>
            <div className="mb-4">
              <img
                src="https://cdn.poehali.dev/projects/8b576231-af46-4008-b393-3acd1d3dd05f/bucket/e5babbce-f0f4-42e1-86af-262f415f38e3.png"
                alt="НЕШКОЛА"
                className="h-14 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-background/70 max-w-xs">
              Центр развития детей, где учиться — это радость, а каждый день — открытие.
            </p>
          </div>
          <div className="space-y-5">
            <div>
              <p className="font-extrabold text-background/90 mb-1">ЧУ ДПО УЦ «ЗНАНИЯ»</p>
              <ul className="space-y-2 text-background/75">
                <li className="flex items-start gap-3">
                  <Icon name="MapPin" size={18} className="text-accent shrink-0 mt-0.5" />
                  Псков, Ольгинская набережная, 9а, 3 этаж
                </li>
                <li className="flex items-center gap-3">
                  <Icon name="Phone" size={18} className="text-accent shrink-0" />
                  <a href="tel:+79113531001" className="hover:text-primary transition-colors">+7 (911) 353-10-01</a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-extrabold text-background/90 mb-1">ИП Захарова А. Н.</p>
              <ul className="space-y-2 text-background/75">
                <li className="flex items-start gap-3">
                  <Icon name="MapPin" size={18} className="text-accent shrink-0 mt-0.5" />
                  Псков, ул. Инженерная, 125
                </li>
                <li className="flex items-center gap-3">
                  <Icon name="Phone" size={18} className="text-accent shrink-0" />
                  <a href="tel:+79113531000" className="hover:text-primary transition-colors">+7 (911) 353-10-00</a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="font-display text-xl font-extrabold mb-4">Мы в соцсетях</h3>
            <div className="flex gap-3">
              {['Send', 'Phone', 'Mail'].map((ic) => (
                <a
                  key={ic}
                  href="#"
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background/10 hover:bg-primary transition-colors"
                >
                  <Icon name={ic} size={22} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="container mt-10 pt-6 border-t border-background/15 text-background/50 text-sm">
          © 2026 НЕШКОЛА — центр развития детей. Все права защищены.
        </div>
      </footer>
    </div>
  );
}

export default Index;