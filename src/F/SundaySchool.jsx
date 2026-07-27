"use client";

/**
 * SundaySchool.jsx
 * سكشن "مدارس الأحد" — بنفس هوية موقع كنيسة السيدة العذراء مريم والأنبا كاراس السائح
 * (كحلي داكن #10193A + ذهبي #F2B705 + خلفية كريمية فاتحة، بطاقات بيضاء بحواف مقوّسة
 *  مستوحاة من شكل الهيكل/الأيقونسطاس في صورة الهيرو).
 *
 * التبعيات المطلوبة (نفّذ الأمر التالي داخل مشروعك):
 *   npm install framer-motion lucide-react react-hot-toast
 *
 * الاستخدام:
 *   import SundaySchool from "@/components/SundaySchool";
 *   <SundaySchool />
 *
 * ملاحظة: <Toaster /> مُضمّن داخل الكومبوننت نفسه للتبسيط. لو عندك Toaster
 * تاني في layout.js تقدر تشيله من هنا وتستخدم الموجود بس.
 */

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Cross,
  BookOpen,
  Users,
  Clock,
  Bell,
  BellRing,
  ChevronLeft,
  Sparkles,
  Baby,
  GraduationCap,
  Flame,
  ScrollText,
  HeartHandshake,
  UserRound,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";


/* ---------------------------------------------------------
   بيانات المراحل — رتّبها زي ما يناسب خدمتكم
--------------------------------------------------------- */
const STAGES = [
  {
    id: "01",
    title: "الحضانة",
    ages: "من 3 إلى 5 سنوات",
    day: "الأحد",
    time: "10:00 صباحًا",
    supervisor: "تاسوني أميرة",
    icon: Baby,
    desc: "قصص مصوّرة وترانيم وأنشطة حركية لتعريف أولادنا الصغار بربنا يسوع بطريقة مبسطة وممتعة.",
  },
  {
    id: "02",
    title: "المرحلة الابتدائية",
    ages: "من 6 إلى 11 سنة",
    day: "الأحد",
    time: "10:00 صباحًا",
    supervisor: "الأستاذ حنا",
    icon: BookOpen,
    desc: "دراسة الكتاب المقدس بالقصة والترنيمة والمسابقة، مع تنمية القيم الروحية والسلوكية.",
  },
  {
    id: "03",
    title: "المرحلة الإعدادية",
    ages: "من 12 إلى 14 سنة",
    day: "الجمعة",
    time: "7:00 مساءً",
    supervisor: "الأستاذ بيشوي",
    icon: Users,
    desc: "نقاش وحوار مفتوح حول قضايا سن المراهقة في ضوء الإيمان، مع رحلات وأنشطة جماعية.",
  },
  {
    id: "04",
    title: "المرحلة الثانوية والجامعية",
    ages: "15 سنة فأكثر",
    day: "الأحد",
    time: "7:30 مساءً",
    supervisor: "تاسوني صفاء",
    icon: GraduationCap,
    desc: "دراسات لاهوتية أعمق وإعداد للخدمة، مع اجتماعات أسبوعية إضافية ورحلات روحية.",
  },
  {
    id: "05",
    title: "اجتماع الشباب",
    ages: "بعد سن الجامعة",
    day: "الجمعة",
    time: "8:00 مساءً",
    supervisor: "المعلم موسى",
    icon: Flame,
    desc: "لقاء أسبوعي حي بين الشباب حول تحديات الحياة العملية والروحية، مع خدمة ورحلات ومعسكرات.",
  },
  {
    id: "06",
    title: "اجتماع الحكماء",
    ages: "لكبار السن",
    day: "الثلاثاء",
    time: "6:00 مساءً",
    supervisor: "الأستاذ عادل",
    icon: ScrollText,
    desc: "اجتماع روحي هادئ لدراسة الكتاب المقدس وتبادل الخبرة الإيمانية، مع صلاة وشركة محبة.",
  },
  {
    id: "07",
    title: "اجتماع السيدات",
    ages: "لجميع السيدات",
    day: "الأربعاء",
    time: "5:00 مساءً",
    supervisor: "يُعلن قريبًا",
    icon: HeartHandshake,
    desc: "لقاء أسبوعي للسيدات لدراسة الكلمة والصلاة معًا، مع أنشطة اجتماعية وخدمية متنوعة.",
  },
];

/* ---------------------------------------------------------
   بطاقة المرحلة — بحافة علوية مقوّسة (إشارة لباب الأيقونسطاس)
--------------------------------------------------------- */
function StageCard({ stage, index }) {
  const Icon = stage.icon;
  const [reminderOn, setReminderOn] = useState(false);


  const toggleReminder = () => {
    if (!reminderOn) {
      if (typeof window !== "undefined" && "Notification" in window) {
        Notification.requestPermission().then((perm) => {
          if (perm === "granted") {
            setReminderOn(true);
            toast.success(`تم تفعيل تذكير "${stage.title}"`, {
              icon: "🔔",
            });
            new Notification("كنيسة السيدة العذراء مريم", {
              body: `هنفكرك قبل اجتماع ${stage.title} كل ${stage.day} الساعة ${stage.time}`,
            });
          } else {
            toast.error("محتاجين إذن الإشعارات من المتصفح 🙏");
          }
        });
      } else {
        setReminderOn(true);
        toast.success(`تم تفعيل تذكير "${stage.title}"`);
      }
    } else {
      setReminderOn(false);
      toast(`تم إيقاف تذكير "${stage.title}"`, { icon: "🔕" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="relative group"
    >
      {/* توهج ذهبي خلف الكارت عند الهوفر */}
      <div className="absolute -inset-0.5 rounded-t-[56px] rounded-b-3xl bg-gradient-to-b from-[#F2B705] to-transparent opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />

      <div className="relative bg-white rounded-t-[56px] rounded-b-3xl border border-[#10193A]/5 shadow-[0_10px_30px_-12px_rgba(16,25,58,0.25)] overflow-hidden">
        {/* رأس مقوّس كحلي — نفس منطق باب الأيقونسطاس */}
        <div className="relative bg-gradient-to-b from-[#182757] to-[#10193A] pt-8 pb-14 px-6 text-center">
          <span className="absolute top-4 left-5 text-white/30 font-black text-xs tracking-widest">
            {stage.id}
          </span>
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: false }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: index * 0.12 + 0.15 }}
            className="mx-auto mb-3 w-16 h-16 rounded-2xl bg-[#F2B705] flex items-center justify-center shadow-lg"
          >
            <Icon className="w-8 h-8 text-[#10193A]" strokeWidth={2.2} />
          </motion.div>
          <h3 className="text-white font-extrabold text-xl">{stage.title}</h3>
          <p className="text-[#F2B705] text-sm mt-1">{stage.ages}</p>
        </div>

        {/* جسم الكارت */}
        <div className="px-6 pt-6 pb-6 -mt-6 relative">
          <div className="bg-white rounded-2xl px-4 py-3 flex items-center justify-center gap-2 text-[#10193A] text-sm font-bold border border-[#10193A]/10 shadow-sm mb-4">
            <Clock className="w-4 h-4 text-[#F2B705]" />
            <span>
              كل {stage.day} — {stage.time}
            </span>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed text-center mb-5">
            {stage.desc}
          </p>

          {/* مكتب أمين الخدمة */}
          <div className="relative flex items-center gap-3 bg-gradient-to-l from-[#FDF3D0] to-[#FCE9AE] border border-[#F2B705]/40 rounded-2xl px-4 py-3 mb-5 overflow-hidden">
            <div className="absolute -left-4 -top-4 w-14 h-14 rounded-full bg-[#F2B705]/20" />
            <div className="relative w-10 h-10 shrink-0 rounded-full bg-[#10193A] flex items-center justify-center shadow-md ring-2 ring-white">
              <UserRound className="w-5 h-5 text-[#F2B705]" strokeWidth={2.3} />
            </div>
            <div className="relative text-right leading-tight">
              <p className="text-[10px] font-bold text-[#8a6900] tracking-wide">
                أمين الخدمة
              </p>
              <p className="text-sm font-extrabold text-[#10193A]">
                {stage.supervisor}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleReminder}
              className={`flex-1 flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-bold transition-all duration-300 ${
                reminderOn
                  ? "bg-[#F2B705] text-[#10193A]"
                  : "bg-[#10193A]/5 text-[#10193A] hover:bg-[#10193A]/10"
              }`}
            >
              {reminderOn ? (
                <BellRing className="w-4 h-4" />
              ) : (
                <Bell className="w-4 h-4" />
              )}
              {reminderOn ? "التذكير مفعّل" : "فكّرني بالموعد"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------------
   أنيميشن ظهور العنوان حرف حرف
--------------------------------------------------------- */
const TITLE_TEXT =  "Welcome!";
const titleContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045, delayChildren: 0.05 },
  },
};

const titleLetter = {
  hidden: { opacity: 0, y: 24},
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function AnimatedTitle() {
  return (
    <motion.h2
     dir="ltr"
      variants={titleContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      className="text-4xl md:text-5xl font-extrabold text-[#10193A] mb-4"
      style={{ perspective: 600 }}
    >
      {Array.from(TITLE_TEXT).map((char, i) => (
        <motion.span
          key={i}
          variants={titleLetter}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h2>
  );
}

/* ---------------------------------------------------------
   السكشن الرئيسي
--------------------------------------------------------- */
export default function SundaySchool() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const [subscribed, setSubscribed] = useState(false);

  const subscribeAll = () => {
    if (subscribed) return;
    if (typeof window !== "undefined" && "Notification" in window) {
      Notification.requestPermission().then((perm) => {
        if (perm === "granted") {
          setSubscribed(true);
          toast.success("تم اشتراكك في إشعارات مدارس الأحد 🎉");
        } else {
          toast.error("محتاجين إذن الإشعارات من المتصفح 🙏");
        }
      });
    } else {
      setSubscribed(true);
      toast.success("تم اشتراكك في إشعارات مدارس الأحد 🎉");
    }
  };

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      className="relative py-24 px-4 overflow-hidden bg-[#F7F5F0]"
    >
      <Toaster position="top-center" />

      {/* توهجات ذهبية خفيفة في الخلفية */}
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute -top-24 right-1/4 w-96 h-96 bg-[#F2B705]/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute bottom-0 left-1/4 w-80 h-80 bg-[#10193A]/5 rounded-full blur-3xl"
      />

      <div className="relative max-w-6xl mx-auto">
        {/* الشارة والعنوان — نفس نمط "القداسات" في موقعكم */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="inline-flex items-center gap-2 bg-[#FDE9A8] text-[#8a6900] px-5 py-2 rounded-full text-sm font-bold mb-4"
          >
            <Sparkles className="w-4 h-4" />
            مدارس الأحد
          </motion.span>

          <AnimatedTitle />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-xl mx-auto"
          >
            رحلة إيمان لكل عمر، من الحضانة للجامعة، خدام محبين وبرنامج روحي أسبوعي منتظم
          </motion.p>
        </div>

        {/* شبكة المراحل */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
          {STAGES.map((stage, i) => (
            <StageCard key={stage.id} stage={stage} index={i} />
          ))}
        </div>

        {/* CTA + اشتراك في الإشعارات العام */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-[#10193A] rounded-3xl px-8 py-10 md:px-14 md:py-12 text-center overflow-hidden"
        >
          <motion.div
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-[#F2B705] flex items-center justify-center"
          >
            <Cross className="w-7 h-7 text-[#10193A]" />
          </motion.div>

          <h3 className="text-white text-2xl font-extrabold mb-2">
            عايز تكون أول من يعرف بمواعيد ومفاجآت مدارس الأحد؟
          </h3>
          <p className="text-white/70 mb-7 max-w-lg mx-auto text-sm">
            فعّل الإشعارات وهنبعتلك تذكير قبل كل اجتماع وأخبار الرحلات والمعسكرات أول بأول
          </p>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            onClick={subscribeAll}
            disabled={subscribed}
            className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-300 ${
              subscribed
                ? "bg-white/10 text-white/60 cursor-default"
                : "bg-[#F2B705] text-[#10193A] hover:brightness-110"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {subscribed ? (
                <motion.span
                  key="on"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex items-center gap-2"
                >
                  <BellRing className="w-4 h-4" /> إشعاراتك مفعّلة
                </motion.span>
              ) : (
                <motion.span
                  key="off"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex items-center gap-2"
                >
                  فعّل إشعارات مدارس الأحد <ChevronLeft className="w-4 h-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

