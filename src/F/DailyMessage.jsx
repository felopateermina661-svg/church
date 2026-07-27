import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Calendar, X } from "lucide-react";

/* ============================================================
   تحويل التاريخ الميلادي إلى تاريخ قبطي — بالاعتماد على خوارزمية
   Julian Day Number المرجعية (Calendrical Calculations, Dershowitz
   & Reingold) نفس الأساس المستخدم في أشهر مكتبات التقويم القبطي.
   ============================================================ */

const GREGORIAN_EPOCH = 1721425.5;
const COPTIC_EPOCH = 1825029.5; // 29 أغسطس 284م — بداية التقويم القبطي (سنة الشهداء)

function isLeapGregorian(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function gregorianToJD(year, month, day) {
  return (
    GREGORIAN_EPOCH -
    1 +
    365 * (year - 1) +
    Math.floor((year - 1) / 4) -
    Math.floor((year - 1) / 100) +
    Math.floor((year - 1) / 400) +
    Math.floor((367 * month - 362) / 12) +
    (month <= 2 ? 0 : isLeapGregorian(year) ? -1 : -2) +
    day
  );
}

function copticToJD(year, month, day) {
  return (
    day +
    (month - 1) * 30 +
    (year - 1) * 365 +
    Math.floor(year / 4) +
    COPTIC_EPOCH -
    1
  );
}

function copticFromJD(jd) {
  const c = Math.floor(jd) + 0.5 - COPTIC_EPOCH;
  const year = Math.floor((c - Math.floor((c + 366) / 1461)) / 365) + 1;
  const yearStartJD = copticToJD(year, 1, 1);
  const dayOfYear = Math.floor(jd) + 0.5 - yearStartJD;
  const month = Math.floor(dayOfYear / 30) + 1;
  const day = (dayOfYear % 30) + 1;
  return { year, month, day };
}

const COPTIC_MONTHS = [
  "توت", "بابه", "هاتور", "كيهك", "طوبة", "أمشير",
  "برمهات", "برمودة", "بشنس", "بؤونة", "أبيب", "مسرى", "النسيء",
];

const GREGORIAN_MONTHS_AR = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
];

function getCopticDate(date) {
  const jd = gregorianToJD(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );
  const { year, month, day } = copticFromJD(jd);
  return { day, monthName: COPTIC_MONTHS[month - 1], year };
}

/* دالة مختصرة تقدر تستخدمها في أي مكان في الموقع (زي الهيدر) */
export function getHeaderDate() {
  const today = new Date();
  const coptic = getCopticDate(today);
  return `${today.getDate()} ${GREGORIAN_MONTHS_AR[today.getMonth()]} ${today.getFullYear()}م  •  ${coptic.day} ${coptic.monthName} ${coptic.year}ش`;
}

/* ============================================================
   آيات اليوم — بترجمة فان دايك (ملك عام / Public Domain)
   بتتغيّر أوتوماتيك كل يوم على حسب رقم اليوم في السنة
   ============================================================ */

const VERSES = [
  { text: "الرَّبُّ رَاعِيَّ فَلاَ يُعْوِزُنِي شَيْءٌ.", ref: "مزمور 23: 1" },
  { text: "طُوبَى لِلْوُدَعَاءِ لأَنَّهُمْ يَرِثُونَ الأَرْضَ.", ref: "متى 5: 5" },
  { text: "اَلرَّبُّ نُورِي وَخَلاَصِي، مِمَّنْ أَخَافُ؟", ref: "مزمور 27: 1" },
  { text: "أَنَا هُوَ الطَّرِيقُ وَالْحَقُّ وَالْحَيَاةُ.", ref: "يوحنا 14: 6" },
  { text: "لَكِنَّ الَّذِينَ يَنْتَظِرُونَ الرَّبَّ يُجَدِّدُونَ قُوَّةً.", ref: "إشعياء 40: 31" },
  { text: "اِفْرَحُوا فِي الرَّبِّ كُلَّ حِينٍ، وَأَقُولُ أَيْضًا: افْرَحُوا.", ref: "فيلبي 4: 4" },
  { text: "لأَنِّي عَرَفْتُ الأَفْكَارَ الَّتِي أَنَا مُفْتَكِرٌ بِهَا عَنْكُمْ، أَفْكَارَ سَلاَمٍ لاَ شَرٍّ.", ref: "إرميا 29: 11" },
  { text: "اَلرَّبُّ قَرِيبٌ مِنْ كُلِّ مَنْ يَدْعُوهُ، مِنْ كُلِّ مَنْ يَدْعُوهُ بِالْحَقِّ.", ref: "مزمور 145: 18" },
  { text: "لاَ تَخَفْ لأَنِّي مَعَكَ، لاَ تَتَلَفَّتْ لأَنِّي إِلهُكَ.", ref: "إشعياء 41: 10" },
  { text: "أَحَبُّونِي مَحَبَّةً أَبَدِيَّةً، مِنْ أَجْلِ ذلِكَ أَدَمْتُ لَكِ الرَّحْمَةَ.", ref: "إرميا 31: 3" },
  { text: "طَعِمُوا وَانْظُرُوا مَا أَطْيَبَ الرَّبَّ.", ref: "مزمور 34: 8" },
  { text: "اَللهُ مَحَبَّةٌ، وَمَنْ يَثْبُتْ فِي الْمَحَبَّةِ يَثْبُتْ فِي اللهِ.", ref: "1 يوحنا 4: 16" },
  { text: "اُطْلُبُوا أَوَّلاً مَلَكُوتَ اللهِ وَبِرَّهُ وَهذِهِ كُلُّهَا تُزَادُ لَكُمْ.", ref: "متى 6: 33" },
  { text: "اَلرَّبُّ حِصْنِي وَصَخْرَتِي وَمُنْقِذِي.", ref: "مزمور 18: 2" },
  { text: "لأَنَّهُ هكَذَا أَحَبَّ اللهُ الْعَالَمَ حَتَّى بَذَلَ ابْنَهُ الْوَحِيدَ.", ref: "يوحنا 3: 16" },
  { text: "لاَ تَهْتَمُّوا بِشَيْءٍ بَلْ فِي كُلِّ شَيْءٍ بِالصَّلاَةِ وَالطِّلْبَةِ.", ref: "فيلبي 4: 6" },
  { text: "أَسْتَطِيعُ كُلَّ شَيْءٍ فِي الْمَسِيحِ الَّذِي يُقَوِّينِي.", ref: "فيلبي 4: 13" },
  { text: "قَلْبًا نَقِيًّا اخْلُقْ فِيَّ يَا اَللهُ، وَرُوحًا مُسْتَقِيمًا جَدِّدْ فِي دَاخِلِي.", ref: "مزمور 51: 10" },
  { text: "تَعَالَوْا إِلَيَّ يَا جَمِيعَ الْمُتْعَبِينَ وَالثَّقِيلِي الأَحْمَالِ وَأَنَا أُرِيحُكُمْ.", ref: "متى 11: 28" },
  { text: "كَلِمَتُكَ سِرَاجٌ لِرِجْلِي وَنُورٌ لِسَبِيلِي.", ref: "مزمور 119: 105" },
  { text: "هذَا هُوَ الْيَوْمُ الَّذِي صَنَعَهُ الرَّبُّ، نَتَهَلَّلُ وَنَفْرَحُ بِهِ.", ref: "مزمور 118: 24" },
  { text: "وَنَحْنُ نَعْلَمُ أَنَّ كُلَّ الأَشْيَاءِ تَعْمَلُ مَعًا لِلْخَيْرِ لِلَّذِينَ يُحِبُّونَ اللهَ.", ref: "رومية 8: 28" },
  { text: "لَيْسَ عِنْدَ اللهِ أَمْرٌ غَيْرُ مُمْكِنٍ.", ref: "لوقا 1: 37" },
  { text: "أَنْتُمْ نُورُ الْعَالَمِ، لاَ يُمْكِنُ أَنْ تُخْفَى مَدِينَةٌ مَوْضُوعَةٌ عَلَى جَبَلٍ.", ref: "متى 5: 14" },
  { text: "أَحِبُّوا بَعْضُكُمْ بَعْضًا كَمَا أَحْبَبْتُكُمْ.", ref: "يوحنا 13: 34" },
  { text: "أَلَمْ آمُرْكَ! تَشَدَّدْ وَتَشَجَّعْ، لاَ تَرْتَعِبْ وَلاَ تَرْتَاعْ.", ref: "يشوع 1: 9" },
  { text: "بَارِكِي يَا نَفْسِي الرَّبَّ، وَلاَ تَنْسَيْ كُلَّ حَسَنَاتِهِ.", ref: "مزمور 103: 2" },
  { text: "اَلرَّبُّ يُحَارِبُ عَنْكُمْ وَأَنْتُمْ تَصْمُتُونَ.", ref: "خروج 14: 14" },
  { text: "طُوبَى لِلْحَزَانَى لأَنَّهُمْ يَتَعَزَّوْنَ.", ref: "متى 5: 4" },
  { text: "لأَنَّ عِنْدِي أَنَّ آلاَمَ الزَّمَانِ الْحَاضِرِ لاَ تُقَاسُ بِالْمَجْدِ الْعَتِيدِ أَنْ يُسْتَعْلَنَ فِينَا.", ref: "رومية 8: 18" },
];

function getVerseOfTheDay(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return VERSES[dayOfYear % VERSES.length];
}

/* ============================================================
   الكومبوننت: بادچ تاريخ ثابت + زرار عائم للآية (زي زرار الواتساب)
   ============================================================ */

export default function DailyMessage() {
  const today = useMemo(() => new Date(), []);
  const coptic = useMemo(() => getCopticDate(today), [today]);
  const verse = useMemo(() => getVerseOfTheDay(today), [today]);
  const todayKey = today.toDateString();

  const [hasUnread, setHasUnread] = useState(false);
  const [showVerse, setShowVerse] = useState(false);

  useEffect(() => {
    const lastRead = localStorage.getItem("lastReadVerseDate");
    setHasUnread(lastRead !== todayKey);
  }, [todayKey]);

  const openVerse = () => {
    setShowVerse(true);
    localStorage.setItem("lastReadVerseDate", todayKey);
    setHasUnread(false);
  };

  return (
    <>
      {/* بادچ التاريخ الثابت — مكتوب عادي وثابت على الشاشة */}
      <div className="fixed top-[108px] left-3 z-40 flex items-center gap-2 bg-[#1A2744] border border-yellow-500/30 rounded-full px-3.5 py-2 shadow-lg">
        <Calendar size={12} className="text-yellow-500 shrink-0" />
        <span className="flex items-center gap-1.5 text-white text-[10px] font-bold whitespace-nowrap">
          <span>
            {today.getDate()}&nbsp;{GREGORIAN_MONTHS_AR[today.getMonth()]}
          </span>
          <span className="text-yellow-500">•</span>
          <span>
            {coptic.day}&nbsp;{coptic.monthName}
          </span>
        </span>
      </div>

      {/* الزرار العائم — زي زرار الواتساب */}
      <motion.button
        onClick={openVerse}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.08 }}
        className="fixed top-[156px] left-3 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-[#1A2744] to-[#0F1B33] border-2 border-yellow-500 flex items-center justify-center shadow-xl"
        title="آية اليوم"
      >
        <BookOpen className="text-yellow-500" size={24} />

        {hasUnread && (
          <motion.span
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
          />
        )}
      </motion.button>

      {/* نافذة عرض الآية */}
      <AnimatePresence>
        {showVerse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVerse(false)}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-3xl p-7 max-w-sm w-full shadow-2xl text-center"
            >
              <button
                onClick={() => setShowVerse(false)}
                className="absolute top-4 left-4 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>

              <div className="w-14 h-14 rounded-2xl bg-[#1A2744] flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-yellow-500" size={26} />
              </div>

              <p className="text-[10px] text-gray-400 font-bold mb-3">
                {today.getDate()} {GREGORIAN_MONTHS_AR[today.getMonth()]} {today.getFullYear()}م
                {" • "}
                {coptic.day} {coptic.monthName} {coptic.year}ش
              </p>

              <p className="text-[#1A2744] text-lg leading-relaxed font-bold mb-3">
                "{verse.text}"
              </p>
              <p className="text-yellow-600 text-sm font-bold">({verse.ref})</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
