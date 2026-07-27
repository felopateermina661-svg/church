import { FaChurch, FaCross, FaUserTie, FaFacebook, FaWhatsapp, FaPhoneAlt, FaCode } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionTitle } from "./F/Head";
import { FaPlus } from "react-icons/fa";
import church from "./img/church.jpg";
import SundaySchool from "./F/SundaySchool";
import { ArrowLeft, Music2, ChevronDown } from "lucide-react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import DailyMessage from "./F/DailyMessage";
import './App.css';

const masses = [
  { day: "قداس الأحد", time: "6:00 صباحًا" },
  { day: "قداس الأربعاء", time: "6:00 صباحًا" },
  { day: "قداس الجمعة", time: "6:00 صباحًا" },
  { day: "عشية السبت", time: "7:00 مساءً" },
  { day: "تسبحة الثلاثاء", time: "7:00 مساءً" },
];

const news = [{
  id: 1,
  title: "نهضة الانبا كاراس",
  des: " بداية نهصة الانبا كاراس السائح وذالك يوم السبت المقبل الساعة 6 مساءاً",
  date: "5/7/2026",
}]

const committee = {
  title: "اللجنة الإلكترونية",
  icon: "💻",
  desc: "المسؤولة عن إدارة الموقع الإلكتروني ومحتوى الكنيسة على وسائل التواصل الاجتماعي.",
  supervisor: "بيشوي سعد الله",
  webDev: "فيلوباتير مينا",
  members: ["أم أمير", "سيمون"],
};

const joinPhone = "+20 12 01048760";
const joinPhoneDigits = "201201048760"; // نفس الرقم من غير مسافات أو علامة +

// المايسترو المسؤول عن العزف والإشراف العام على كل الكورالات
const maestro = {
  name: "الأستاذ سعيد",
  role: "عازف بيانو ومشرف عام على كل كورالات الكنيسة",
  directLeads: ["كورال السيدات"], // الكورال اللي بيقوده بنفسه بشكل مباشر
};

const choirs = [
  { name: "كورال السيدات", icon: "🎤", supervisor: "الأستاذ سعيد" },
  { name: "كورال الإعدادي والثانوي", icon: "🎶", supervisor: "تاسوني مارينا" },
  { name: "كورال الشباب", icon: "🎵", supervisor: "يُعلن قريبًا" },
];

const services = [
  {
    id: 1,
    title: "مدارس الأحد",
    desc: "تعليم الأطفال وتنمية حياتهم الروحية.",
    icon: "📖",
  },
  {
    id: 2,
    title: "اجتماع إعدادي",
    desc: "اجتماع أسبوعي للمرحلة الإعدادية.",
    icon: "🧒",
  },
  {
    id: 3,
    title: "اجتماع ثانوي",
    desc: "لقاءات روحية وشبابية لطلاب الثانوية.",
    icon: "🎓",
  },
  {
    id: 4,
    title: "اجتماع الشباب",
    desc: "اجتماعات روحية وترانيم ومناقشات.",
    icon: "🧑‍🤝‍🧑",
  },
  {
    id: 5,
    title: "اجتماع الحكماء",
    desc: "لقاءات روحية لكبار السن.",
    icon: "👴",
  },
  {
    id: 6,
    title: "إجتماع السيدات",
    desc: "اجتماع روحي ملئ بالصلوات والترانيم والفقرات الروحية",
    icon: "👱🏻‍♀️",
  },
  {
    id: 7,
    title: "اجتماع دراسة الكتاب",
    desc: "دراسة أسبوعية متعمقة في الكتاب المقدس وتفسيره.",
    icon: "📚",
  },
];

function Home() {
  
  const [isOpen, setIsOpen] = useState(false);
  const [maestroOpen, setMaestroOpen] = useState(false);
  const navigate = useNavigate();

  const image = church;

  return (


    <motion.div 
    initial={{opacity: 0, y: 20}}
    animate={{ opacity: 1, y: 0}}
    transition={{ duration: 0.8, ease: "easeOut",}}
   className="bg-gray-100" >

      <div className="fixed top-0 left-0 w-full z-50">
        {/* شريط الكاهن والمعلم */}
        <div className="h-8 bg-gradient-to-l from-yellow-600 via-yellow-500 to-yellow-600 flex items-center justify-between px-4 text-[#1A2744]">
          <div className="flex items-center gap-1.5">
            <FaCross className="text-sm" />
            <span className="text-[11px] md:text-sm font-extrabold">
              القس بافلوس سمير
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] md:text-sm font-extrabold">
              المعلم جرجس عياد
            </span>
            <FaUserTie className="text-sm" />
          </div>
        </div>

        <header className="bg-[#1A2744] h-16 flex items-center px-4 justify-between w-full">

  <button onClick={() => setIsOpen(!isOpen)} className="text-white text-3xl mr-3 cursor-pointer">
    <HiMenu />
  </button>

  <div className="flex items-center gap-2">

    <h2 className="text-white text-sm font-bold leading-5">
      كنيسة السيدة العذراء مريم
      <br />
      والأنبا كاراس السائح
    </h2>
    <FaChurch className="text-yellow-500 text-4xl" />
  </div>

</header>
      </div>

    {isOpen && (
  <div className="fixed top-24 left-0 w-full bg-[#243654] text-white shadow-lg z-40">
    <ul className="flex flex-col">
      <li className="p-4 border-b border-gray-600 hover:bg-[#32476e] cursor-pointer">
        <a href="#home">الرئيسيه</a>
      </li>

      <li className="p-4 border-b border-gray-600 hover:bg-[#32476e] cursor-pointer">
        <a href="#about">عن الكنيسة</a>
      </li>

      <li className="p-4 border-b border-gray-600 hover:bg-[#32476e] cursor-pointer">
        <a href="#G">مواعيد القداسات</a>
      </li>

      <li className="p-4 border-b border-gray-600 hover:bg-[#32476e] cursor-pointer">
        <a href="#service">الخدمات</a>
      </li>

      <li className="p-4 hover:bg-[#32476e] cursor-pointer">
        <a href="#contact">تواصل معنا</a>
      </li>
    </ul>
  </div>
)}
      <motion.section initial={{opacity: 0, y: 40}}
      
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: false, amount: 0.3}}
      transition={{duration: 0.8, ease: "easeOut",}}

       id="home"
        className="relative h-[450px] md:h-[600px] bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h2 className="text-white text-4xl font-bold mb-4">
              كنيسة السيدة العذراء مريم والانبا كاراس السائح  
          </h2>

          <p className="text-white text-xl">
            أهلاً بكم في الموقع الرسمي للكنيسة
          </p>

          <button className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl transition">
            اعرف أكثر
          </button>
        </div>
      </motion.section>

      {/* عن الكنيسة — محتوى مبدئي بسيط، عدّله زي ما يناسبكم */}
      <motion.section
        id="about"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-16 bg-white"
      >
        <div className="max-w-5xl mx-auto px-4">
          <SectionTitle title="عن الكنيسة" subtitle="من نحن" />

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="text-gray-600 leading-relaxed text-center max-w-3xl mx-auto mb-10"
          >
            كنيسة السيدة العذراء مريم والأنبا كاراس السائح بيت روحي لكل أبناء
            المنطقة، بتخدم أجيال مختلفة من الأطفال للكبار من خلال القداسات
            ومدارس الأحد والاجتماعات الأسبوعية. (ده كلام مبدئي بسيط، كمّله
            إنت زي ما يناسبكم).
          </motion.p>

          <div className="grid sm:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="bg-gray-50 rounded-2xl p-6 text-center border-t-4 border-yellow-500"
            >
              <div className="text-4xl mb-3">⛪</div>
              <h3 className="font-bold text-[#1A2744] mb-2">نشأة الكنيسة</h3>
              <p className="text-gray-500 text-sm">
                اكتب هنا نبذة عن تاريخ إنشاء الكنيسة وأهم محطاتها.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-gray-50 rounded-2xl p-6 text-center border-t-4 border-yellow-500"
            >
              <div className="text-4xl mb-3">🕊️</div>
              <h3 className="font-bold text-[#1A2744] mb-2">رسالتنا</h3>
              <p className="text-gray-500 text-sm">
                اكتب هنا رسالة الكنيسة وهدفها الروحي والخدمي.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="bg-gray-50 rounded-2xl p-6 text-center border-t-4 border-yellow-500"
            >
              <div className="text-4xl mb-3">🤝</div>
              <h3 className="font-bold text-[#1A2744] mb-2">خدماتنا</h3>
              <p className="text-gray-500 text-sm">
                اكتب هنا نبذة عن الخدمات والاجتماعات اللي بتقدمها الكنيسة.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <DailyMessage />

      <motion.section id="G"
      initial={{opacity: 0, y: 50}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1]}}
       
       className="py-16 bg-gray-100">

  <div className="max-w-5xl mx-auto px-4">
     
    <motion.h2
    initial={{ opacity: 0, y: 60 }}
   whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: false, amount: 0.3 }}
   transition={{
  duration: 0.8,
  ease: "easeOut",
}}
    className="text-3xl font-bold text-center text-[#1A2744] mb-10">
    <SectionTitle title="مواعيد القداسات والعشيات" subtitle="القداسات والعشيات" />
    </motion.h2>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

      {masses.map((m, index) => (
        <motion.div
          key={m.day}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: 0.8,
            delay: index * 0.1,
            ease: "easeOut",
          }}
          className="bg-white rounded-2xl shadow-lg p-6 text-center hover:scale-105 transition"
        >
          <h3 className="text-xl font-bold text-yellow-500 mb-3">
            {m.day}
          </h3>

          <p className="text-gray-900 font-black">
            {m.time}
          </p>
        </motion.div>
      ))}

    </div>

  </div>
 </motion.section>

   <div className="flex justify-center my-10 bg-gray-100">
  <button
  className="w-20 h-20 rounded-full bg-yellow-500 text-white flex items-center justify-center text-3xl shadow-2xl hover:rotate-90 hover:scale-110 transition-all duration-300"
  >
        <FaPlus />
      </button>
   </div>
  <SectionTitle title="اخر الاخبار" subtitle="اخبار الكنيسة" />
  <div className="flex overflow-x-auto gap-4 px-4 pb-4 snap-x snap-mandatory">
  
  {news.map((item, index) => (

    <motion.div initial={{opacity: 0, y: 40}}
    whileInView={{opacity: 1, y: 0}}
    viewport={{once: false, amount: 0.3}}
    transition={{duration: 0.6, delay: index * 0.6,}}

      key={item.id}
      className="relative min-w-[300px] bg-gradient-to-br from-[#1A2744] to-[#0F1B33] rounded-2xl shadow-2xl p-7 snap-center flex-shrink-0 border-2 border-yellow-500 overflow-hidden"
    >
      <span className="absolute top-0 right-0 bg-yellow-500 text-[#1A2744] text-xs font-black px-4 py-1.5 rounded-bl-2xl">
        ✨ جديد
      </span>

      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute -bottom-8 -left-8 w-28 h-28 bg-yellow-500/20 rounded-full blur-2xl pointer-events-none"
      />

      <h3 className="relative text-2xl font-extrabold text-white mt-5 mb-1">{item.title}</h3>
      <p className="relative text-yellow-400 font-bold mb-3">{item.date}</p>
      <p className="relative text-gray-200 leading-relaxed">{item.des}</p>

    </motion.div>
  ))}
</div>
    <SectionTitle title="الإجتماعات والخدمات" subtitle="الخدمات الاسبوعية" />
  <div className="grid grid-cols-2 lg:grid-cols-3 gap-6" id="service">
    
  {services.map((item) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="bg-[#F8FAFC] rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center border-t-4 border-yellow-500">
      <div className="text-5xl mb-4">{item.icon}</div>

      <h3 className="text-xl font-bold text-[#1A2744] mb-3">
        {item.title}
      </h3>

      <p className="text-gray-600">
        {item.desc}
      </p>
    </motion.div>
    
  ))}
</div>

  {/* اللجنة الإلكترونية — كارت مميز بمشرف وأعضاء */}
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.3 }}
    transition={{ duration: 0.8 }}
    className="relative max-w-4xl mx-auto mt-8 bg-gradient-to-br from-[#1A2744] via-[#22335c] to-[#0F1B33] rounded-3xl shadow-2xl p-8 overflow-hidden border border-yellow-500/40"
  >
    <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl" />

    <div className="relative flex items-center gap-3 mb-3">
      <span className="text-4xl">{committee.icon}</span>
      <h3 className="text-2xl font-extrabold text-white">{committee.title}</h3>
    </div>

    <p className="relative text-gray-300 mb-6">{committee.desc}</p>

    <div className="relative flex flex-wrap items-center gap-3 mb-6">
      <div className="flex items-center gap-3 bg-yellow-500 rounded-2xl px-5 py-3 w-fit shadow-lg">
        <FaUserTie className="text-[#1A2744] text-xl" />
        <div className="text-right leading-tight">
          <p className="text-[10px] font-bold text-[#1A2744]/70">المشرف</p>
          <p className="text-[#1A2744] font-extrabold">{committee.supervisor}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-white/10 border border-yellow-500/50 rounded-2xl px-5 py-3 w-fit">
        <FaCode className="text-yellow-500 text-xl" />
        <div className="text-right leading-tight">
          <p className="text-[10px] font-bold text-gray-400">تطوير الموقع</p>
          <p className="text-white font-extrabold">{committee.webDev}</p>
        </div>
      </div>
    </div>

    <p className="relative text-gray-400 text-sm mb-3">أعضاء اللجنة</p>
    <div className="relative flex flex-wrap gap-2 mb-7">
      {committee.members.map((name) => (
        <span
          key={name}
          className="bg-white/10 text-white text-sm font-semibold px-4 py-2 rounded-full border border-white/10"
        >
          {name}
        </span>
      ))}
    </div>

    {/* الانضمام للخدمة */}
    <div className="relative bg-white/5 border border-white/10 rounded-2xl p-5">
      <p className="text-white font-bold mb-1">عايز تنضم للخدمة معانا؟</p>
      <p className="text-gray-400 text-sm mb-4">
        اتصل بينا أو ابعتلنا على الواتساب وهنرجعلك
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          href={`tel:${joinPhoneDigits}`}
          className="inline-flex items-center gap-2 bg-yellow-500 text-[#1A2744] font-bold px-5 py-2.5 rounded-full hover:brightness-110 transition"
        >
          <FaPhoneAlt />
          {joinPhone}
        </a>
        <a
          href={`https://wa.me/${joinPhoneDigits}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-5 py-2.5 rounded-full hover:brightness-110 transition"
        >
          <FaWhatsapp className="text-lg" />
          واتساب
        </a>
      </div>
    </div>
  </motion.div>

  {/* كورالات الكنيسة */}
  <div className="max-w-4xl mx-auto mt-10">
    <SectionTitle title="كورالات الكنيسة" subtitle="الترانيم" />

    {/* كارت المايسترو — قابل للفتح ويوضح الكورال اللي بيقوده مباشرة */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="bg-white rounded-3xl shadow-lg border border-[#1A2744]/5 overflow-hidden mb-6"
    >
      <button
        onClick={() => setMaestroOpen((o) => !o)}
        className="w-full flex items-center gap-4 p-6 text-right"
      >
        <div className="w-14 h-14 rounded-2xl bg-[#1A2744] flex items-center justify-center shrink-0">
          <Music2 className="text-yellow-500" size={26} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-extrabold text-[#1A2744]">
            {maestro.name}
          </h3>
          <p className="text-gray-500 text-sm">{maestro.role}</p>
        </div>
        <motion.div
          animate={{ rotate: maestroOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="text-gray-400" size={20} />
        </motion.div>
      </button>

      <AnimatePresence>
        {maestroOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0 border-t border-gray-100">
              <p className="text-xs text-gray-400 font-bold mt-4 mb-2">
                بيقود بنفسه
              </p>
              <div className="flex flex-wrap gap-2">
                {maestro.directLeads.map((name) => (
                  <span
                    key={name}
                    className="bg-yellow-500/10 text-yellow-700 text-sm font-bold px-4 py-2 rounded-full border border-yellow-500/20"
                  >
                    🎤 {name}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-4 leading-relaxed">
                وبيشرف بشكل عام على باقي كورالات الكنيسة، وبيعزف لهم على
                البيانو في التسبيح والقداسات.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>

    {/* شبكة الكورالات الثلاثة */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {choirs.map((choir, index) => (
        <motion.div
          key={choir.name}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, delay: index * 0.1 }}
          className="bg-[#F8FAFC] rounded-3xl p-6 shadow-lg border-t-4 border-yellow-500 text-center"
        >
          <div className="text-4xl mb-3">{choir.icon}</div>
          <h4 className="text-lg font-extrabold text-[#1A2744] mb-4">
            {choir.name}
          </h4>

          <div className="flex items-center justify-center gap-2 bg-white rounded-2xl px-4 py-3 border border-[#1A2744]/10">
            <FaUserTie className="text-yellow-500" />
            <div className="text-right leading-tight">
              <p className="text-[10px] font-bold text-gray-400">المشرف</p>
              <p
                className={`text-sm font-extrabold ${
                  choir.supervisor === "يُعلن قريبًا"
                    ? "text-gray-400"
                    : "text-[#1A2744]"
                }`}
              >
                {choir.supervisor}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>

  <div className="flex justify-center">
  <button
    onClick={() => navigate("/SundaySchool")}
      className="mt-7 inline-flex items-center gap-2 bg-[#1A2744] hover:bg-[#243654] text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 font-semibold"
      >
        اعرف المزيد
          <ArrowLeft size={20} />
          </button>
          </div>

      {/* سكشن تواصل معنا — شكل مختلف تمامًا عن باقي الصفحة */}
      <motion.section
        id="contact"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="relative mt-16 pt-20 pb-16 px-4 bg-gradient-to-b from-[#0B1226] to-[#1A2744] rounded-t-[50px] overflow-hidden"
      >
        <div className="pointer-events-none absolute -top-10 right-0 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-60 h-60 bg-yellow-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            whileInView={{ scale: 1, rotate: 6 }}
            viewport={{ once: false }}
            transition={{ type: "spring", stiffness: 220, damping: 14 }}
            className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-yellow-500 flex items-center justify-center"
          >
            <FaChurch className="text-[#1A2744] text-3xl -rotate-6" />
          </motion.div>

          <h2 className="text-3xl font-extrabold text-white mb-3">تواصل معنا</h2>
          <p className="text-gray-300 mb-9 leading-relaxed">
            تابعونا على صفحتنا الرسمية على فيسبوك عشان توصلك كل أخبار
            ومواعيد وخدمات الكنيسة أول بأول
          </p>

          <motion.a
            href="https://www.facebook.com/share/1CkjL5iKxn/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-white text-[#1A2744] font-extrabold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <FaFacebook className="text-[#1877F2] text-2xl" />
            صفحتنا على فيسبوك
          </motion.a>
        </div>
      </motion.section>
    </motion.div>
    
  );
}

export default Home;