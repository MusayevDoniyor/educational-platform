export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  isLocked?: boolean;
  isCompleted?: boolean;
  duration: string;
  level: string;
  questions: Question[];
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "JavaScript asoslari",
    description:
      "JavaScript dasturlash tilining asosiy tushunchalari va sintaksisi",
    videoUrl: "https://www.youtube.com/embed/zJuDsji3IbE?si=VjkX7R-zOW6O-t40",
    isLocked: false,
    isCompleted: false,
    duration: "45 daqiqa",
    level: "Boshlang'ich",
    questions: [
      {
        question: "JavaScript'da o'zgaruvchi qanday e'lon qilinadi?",
        options: [
          "var x = 10;",
          "let x = 10;",
          "const x = 10;",
          "Barcha to'g'ri",
        ],
        correctAnswer: "Barcha to'g'ri",
        explanation:
          "JavaScript'da o'zgaruvchilarni e'lon qilishning uch xil usuli mavjud: var, let va const. Har biri o'ziga xos xususiyatlarga ega.",
      },
      {
        question: "JavaScript'da funksiya qanday yaratiladi?",
        options: [
          "function myFunction() {}",
          "const myFunction = () => {}",
          "const myFunction = function() {}",
          "Barcha to'g'ri",
        ],
        correctAnswer: "Barcha to'g'ri",
        explanation:
          "JavaScript'da funksiyalarni yaratishning bir necha usullari mavjud: function declaration, arrow function va function expression.",
      },
      {
        question: "JavaScript'da massiv metodlari qaysilar?",
        options: [
          "push(), pop(), shift(), unshift()",
          "map(), filter(), reduce()",
          "forEach(), find(), includes()",
          "Barcha to'g'ri",
        ],
        correctAnswer: "Barcha to'g'ri",
        explanation:
          "JavaScript'da massivlar uchun ko'plab foydali metodlar mavjud: push/pop (oxiriga qo'shish/olish), shift/unshift (boshiga qo'shish/olish), map/filter/reduce (ma'lumotlarni qayta ishlash) va boshqalar.",
      },
      {
        question: "JavaScript'da obyektlar qanday yaratiladi?",
        options: [
          "const obj = {}",
          "const obj = new Object()",
          "const obj = Object.create(null)",
          "Barcha to'g'ri",
        ],
        correctAnswer: "Barcha to'g'ri",
        explanation:
          "JavaScript'da obyektlarni yaratishning bir necha usullari mavjud: literal notation, Object constructor va Object.create() metodi.",
      },
    ],
  },
  {
    id: 2,
    title: "HTML va CSS asoslari",
    description: "HTML va CSS yordamida veb-sahifalar yaratish",
    videoUrl: "https://www.youtube.com/embed/WVHcX-oYlgA?si=4hrQ7m9e0SeoDVr5",
    isLocked: true,
    isCompleted: false,
    duration: "60 daqiqa",
    level: "Boshlang'ich",
    questions: [
      {
        question: "HTML'da sahifa strukturasi qanday elementlardan iborat?",
        options: [
          "html, head, body",
          "header, main, footer",
          "div, span, p",
          "Barcha to'g'ri",
        ],
        correctAnswer: "Barcha to'g'ri",
        explanation:
          "HTML sahifasi html, head va body elementlaridan iborat bo'ladi. Boshqa elementlar esa body ichida joylashadi.",
      },
      {
        question: "CSS'da stillar qanday qo'llaniladi?",
        options: [
          "Inline styles",
          "Internal stylesheet",
          "External stylesheet",
          "Barcha to'g'ri",
        ],
        correctAnswer: "Barcha to'g'ri",
        explanation:
          "CSS stillarini qo'llashning uch xil usuli mavjud: inline, internal va external stylesheet.",
      },
      {
        question: "CSS'da pozitsiyalash qanday amalga oshiriladi?",
        options: [
          "position: static, relative, absolute, fixed",
          "display: flex, grid, block, inline",
          "float: left, right, none",
          "Barcha to'g'ri",
        ],
        correctAnswer: "Barcha to'g'ri",
        explanation:
          "CSS'da elementlarni pozitsiyalashning bir necha usullari mavjud: position xususiyati, display xususiyati va float xususiyati.",
      },
      {
        question: "CSS'da media query nima uchun ishlatiladi?",
        options: [
          "Responsive dizayn yaratish uchun",
          "Printer uchun stillar yaratish uchun",
          "Dark mode yaratish uchun",
          "Barcha to'g'ri",
        ],
        correctAnswer: "Barcha to'g'ri",
        explanation:
          "Media query'lar turli qurilmalar va muhitlar uchun maxsus stillar yaratish imkonini beradi: responsive dizayn, printer versiyasi, dark mode va boshqalar.",
      },
    ],
  },
  {
    id: 3,
    title: "React asoslari",
    description: "React yordamida zamonaviy veb-ilovalar yaratish",
    videoUrl: "https://www.youtube.com/embed/IZDV9YHDF58?si=SQKc5yvpzbVJLeiX",
    isLocked: true,
    isCompleted: false,
    duration: "90 daqiqa",
    level: "O'rta",
    questions: [
      {
        question: "React komponenti nima?",
        options: [
          "JavaScript funksiyasi",
          "HTML elementi",
          "CSS klass",
          "Barcha to'g'ri",
        ],
        correctAnswer: "JavaScript funksiyasi",
        explanation:
          "React komponenti - bu JavaScript funksiyasi bo'lib, u UI elementlarini qaytaradi.",
      },
      {
        question: "React'da state qanday yaratiladi?",
        options: [
          "useState hook",
          "useEffect hook",
          "useContext hook",
          "Barcha to'g'ri",
        ],
        correctAnswer: "useState hook",
        explanation:
          "React'da state useState hook yordamida yaratiladi va boshqariladi.",
      },
      {
        question: "React'da props nima?",
        options: [
          "Komponentlar orasida ma'lumot uzatish vositasi",
          "Komponent ichki holati",
          "Komponent nomi",
          "Komponent turi",
        ],
        correctAnswer: "Komponentlar orasida ma'lumot uzatish vositasi",
        explanation:
          "Props - bu komponentlar orasida ma'lumot uzatish vositasi. Ular komponentga tashqaridan uzatiladi va o'zgartirilmasligi kerak.",
      },
      {
        question: "React'da useEffect hook'i nima uchun ishlatiladi?",
        options: [
          "Yon ta'sirlarni boshqarish uchun",
          "Holatni boshqarish uchun",
          "Props'larni boshqarish uchun",
          "Komponent nomini o'zgartirish uchun",
        ],
        correctAnswer: "Yon ta'sirlarni boshqarish uchun",
        explanation:
          "useEffect hook'i komponentda yon ta'sirlarni boshqarish uchun ishlatiladi. Masalan, API so'rovlari, DOM manipulyatsiyalari va boshqa yon ta'sirlar.",
      },
    ],
  },
];
