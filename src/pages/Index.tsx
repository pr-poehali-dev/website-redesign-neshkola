import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
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
  'https://cdn.poehali.dev/projects/8b576231-af46-4008-b393-3acd1d3dd05f/files/0e73fea1-576d-49c4-b9bc-27011704dd30.jpg';

const NAV = [
  { label: 'О центре', href: '#about' },
  { label: 'Программы', href: '#programs' },
  { label: 'Расписание', href: '#schedule' },
  { label: 'Контакты', href: '#contacts' },
];

const PROGRAMS = [
  { icon: 'Palette', title: 'Творческая мастерская', age: '3–7 лет', color: 'bg-coral', desc: 'Рисование, лепка, аппликация — развиваем фантазию и мелкую моторику.' },
  { icon: 'BookOpen', title: 'Подготовка к школе', age: '5–7 лет', color: 'bg-teal', desc: 'Чтение, счёт, логика и письмо в игровой форме без скуки.' },
  { icon: 'Music', title: 'Музыка и ритмика', age: '2–6 лет', color: 'bg-berry', desc: 'Пение, танцы, музыкальные игры для гармоничного развития.' },
  { icon: 'Calculator', title: 'Ментальная арифметика', age: '6–10 лет', color: 'bg-sky', desc: 'Быстрый устный счёт и тренировка обоих полушарий мозга.' },
  { icon: 'Globe', title: 'Английский язык', age: '4–10 лет', color: 'bg-grass', desc: 'Живое общение, игры и песни — английский становится родным.' },
  { icon: 'Rocket', title: 'Робототехника', age: '7–12 лет', color: 'bg-sun', desc: 'Конструируем и программируем первых роботов своими руками.' },
];

const SCHEDULE = [
  { day: 'Понедельник', items: ['10:00 Творчество', '16:00 Подготовка к школе'] },
  { day: 'Вторник', items: ['11:00 Английский', '17:00 Робототехника'] },
  { day: 'Среда', items: ['10:00 Музыка и ритмика', '16:00 Ментальная арифметика'] },
  { day: 'Четверг', items: ['11:00 Творчество', '17:00 Английский'] },
  { day: 'Пятница', items: ['10:00 Подготовка к школе', '16:00 Робототехника'] },
  { day: 'Суббота', items: ['11:00 Семейный день', '13:00 Открытое занятие'] },
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
          <a href="#" className="flex items-center gap-2">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-display text-2xl font-extrabold rotate-[-6deg]">
              Н
            </span>
            <span className="font-display text-2xl font-extrabold tracking-tight">
              НЕ<span className="text-primary">ШКОЛА</span>
            </span>
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
      <section className="relative">
        <div className="absolute -top-10 -left-10 h-72 w-72 bg-sun/40 animate-blob" />
        <div className="absolute top-40 right-0 h-80 w-80 bg-teal/30 animate-blob" style={{ animationDelay: '2s' }} />
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
                <div className="font-display text-3xl font-extrabold text-secondary">8</div>
                <div className="text-sm font-bold text-foreground/60">направлений</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <div className="font-display text-3xl font-extrabold text-berry">7</div>
                <div className="text-sm font-bold text-foreground/60">лет опыта</div>
              </div>
            </div>
          </div>
          <div className="relative animate-scale-in">
            <div className="absolute inset-0 bg-secondary rounded-[3rem] rotate-6" />
            <img
              src={HERO_IMG}
              alt="Дети на развивающих занятиях"
              className="relative rounded-[3rem] shadow-2xl w-full object-cover aspect-square"
            />
            <div className="absolute -bottom-5 -left-5 bg-white rounded-3xl shadow-xl px-5 py-4 flex items-center gap-3 animate-float">
              <span className="text-3xl">🎨</span>
              <div>
                <div className="font-display font-extrabold leading-none">Записываемся!</div>
                <div className="text-xs text-foreground/60 font-bold">новый набор групп</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features / About */}
      <section id="about" className="container py-16 lg:py-24">
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
      <section id="programs" className="bg-secondary/10 py-16 lg:py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block rounded-full bg-secondary/20 px-4 py-2 font-bold text-secondary mb-4">
              8 направлений развития
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold">Наши программы</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMS.map((p) => (
              <div key={p.title} className="group bg-card rounded-3xl p-7 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${p.color} mb-5 group-hover:animate-wiggle`}>
                  <Icon name={p.icon} size={32} className="text-white" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-2xl font-extrabold">{p.title}</h3>
                </div>
                <span className="inline-block rounded-full bg-muted px-3 py-1 text-sm font-bold text-foreground/60 mb-3">
                  {p.age}
                </span>
                <p className="text-foreground/70">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section id="schedule" className="container py-16 lg:py-24">
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
      </section>

      {/* Signup */}
      <section id="signup" className="py-16 lg:py-24">
        <div className="container">
          <div className="relative overflow-hidden rounded-[3rem] bg-primary p-8 md:p-14 shadow-2xl">
            <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10" />
            <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-white/10" />
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
                      {PROGRAMS.map((p) => (
                        <SelectItem key={p.title} value={p.title}>
                          {p.title}
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
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-display text-2xl font-extrabold rotate-[-6deg]">
                Н
              </span>
              <span className="font-display text-2xl font-extrabold">НЕШКОЛА</span>
            </div>
            <p className="text-background/70 max-w-xs">
              Центр развития детей, где учиться — это радость, а каждый день — открытие.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl font-extrabold mb-4">Контакты</h3>
            <ul className="space-y-3 text-background/80">
              <li className="flex items-center gap-3">
                <Icon name="MapPin" size={20} className="text-accent" /> г. Псков, ул. Детская, 1
              </li>
              <li className="flex items-center gap-3">
                <Icon name="Phone" size={20} className="text-accent" /> +7 (8112) 00-00-00
              </li>
              <li className="flex items-center gap-3">
                <Icon name="Mail" size={20} className="text-accent" /> hello@neshkola60.ru
              </li>
              <li className="flex items-center gap-3">
                <Icon name="Clock" size={20} className="text-accent" /> Пн–Сб: 9:00 – 20:00
              </li>
            </ul>
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
