// "use client";
// import { useState } from "react";

// export default function FAQSection() {
//   const [openItems, setOpenItems] = useState<number[]>([]);

//   const [openItem, setOpenItem] = useState<number | null>(null);

// const toggleItem = (id: number) => {
//   setOpenItem((prev:any) => (prev === id ? null : id));
// };

//   const faqItems = [
//     {
//       id: 1,
//       question: "How can AI automation transform and enhance my business operations?",
//       answer:
//         "AI automation revolutionizes business operations by streamlining repetitive tasks, reducing human error, and enabling 24/7 operations. It enhances decision-making through data analysis, improves customer experiences with personalized interactions, and significantly reduces operational costs while increasing productivity and scalability."
//     },
//     {
//       id: 2,
//       question: "What industries can benefit from AI automation?",
//       answer:
//         "Virtually all industries can benefit from AI automation. Keys sectors include manufacturing (predictive maintenance), healthcare (patient data management), finance (fraud detection), retail (personalized marketing), logistics (route optimization), and customer service (chatbots and support automation)."
//     },
//     {
//       id: 3,
//       question: "What kind of support do you offer?",
//       answer:
//         "We provide comprehensive support including 24/7 technical assistance, dedicated account managers, regular software updates, training sessions for your team, detailed documentation, and a responsive customer success team to ensure you maximize the benefits of our AI automation solutions."
//     },
//     {
//       id: 4,
//       question: "Do I need technical knowledge to use AI automation?",
//       answer:
//         "No technical knowledge is required. Our platform is designed with user-friendly interfaces, intuitive dashboards, and guided workflows. We provide comprehensive training and support to ensure users of all technical backgrounds can effectively implement and manage AI automation in their operations."
//     },
//     {
//       id: 5,
//       question: "What kind of support do you offer?",
//       answer:
//         "We provide comprehensive support including 24/7 technical assistance, dedicated account managers, regular software updates, training sessions for your team, detailed documentation, and a responsive customer success team to ensure you maximize the benefits of our AI automation solutions."
//     },
//     {
//       id: 6,
//       question: "Do I need technical knowledge to use AI automation?",
//       answer:
//         "No technical knowledge is required. Our platform is designed with user-friendly interfaces, intuitive dashboards, and guided workflows. We provide comprehensive training and support to ensure users of all technical backgrounds can effectively implement and manage AI automation in their operations."
//     }
//   ];

//   return (
//     <section className="relative min-h-screen w-full overflow-hidden px-4 py-20 md:px-8">
//       {/* Background Gradient */}
//       <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F24] via-[#0A0F24] to-[#0A0F24]"></div>

//       <div className="relative z-10 mx-auto w-full max-w-7xl">
//         {/* Header Section */}
//         <div className="mb-10 text-center">
//           {/* Label */}
//           <div className="mb-3 inline-flex items-center space-x-2">
//             <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
//             <p className="text-[10px] font-light tracking-widest text-cyan-300/80 uppercase md:text-[10px]">
//               Frequently Asked Question
//             </p>
//           </div>

//           {/* Main Heading */}
//           <h2 className="mb-4 text-2xl leading-tight text-white md:text-3xl lg:text-5xl">
//             We've Got the Answers You're Looking For
//           </h2>

//           {/*  Description */}
//           <p className="mx-auto max-w-3xl text-sm leading-relaxed text-white/60 md:text-base">
//             Find clear, concise answers to your most common PROVAX AI automation questions. We're
//             here to help you understand, optimize, and grow with confidence.
//           </p>
//         </div>

//         {/* FAQ Accordion */}
//         <div className="grid grid-cols-1 gap-4 space-y-5 md:grid-cols-2">
//           {faqItems.map((item, index) => (
//             <div
//               key={item.id}
//               className="from-green-1000 rounded-full border border-green-400/20 bg-transparent bg-gradient-to-br to-green-900 transition-all duration-300 hover:border-green-400/30"
//             >
//               <button
//                 onClick={() => toggleItem(item.id)}
//                 className="flex w-full items-center justify-between p-6 text-left transition-all duration-300"
//               >
//                 <h3 className="pr-4 text-sm text-white md:text-sm">{item.question}</h3>
//                 <div className="flex-shrink-0">
//                   <svg
//                     className={`h-6 w-6 text-green-400 transition-transform duration-300 ${
//                       openItems.includes(item.id) ? "rotate-180" : ""
//                     }`}
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M19 9l-7 7-7-7"
//                     />
//                   </svg>
//                 </div>
//               </button>

//               {/* Answer Content */}
//               <div
//                 className={`overflow-hidden transition-all duration-300 ${
//                   openItems.includes(item.id) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//                 }`}
//               >
//                 <div className="px-6 pb-6">
//                   <div className="mb-4 h-px w-12 bg-green-400/50"></div>
//                   <p className="leading-relaxed text-white/70">{item.answer}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Bottom Divider Line */}
//         <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
//       </div>
//     </section>
//   );
// }

"use client";
import { useState } from "react";
import carview from "../../asests/carview.png";
export default function FAQSection() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenItem((prev) => (prev === id ? null : id));
  };

  const faqItems = [
    {
      id: 1,
      question: "How can AI automation transform and enhance my business operations?",
      answer:
        "AI automation revolutionizes business operations by streamlining repetitive tasks, reducing human error, and enabling 24/7 operations. It enhances decision-making through data analysis, improves customer experiences with personalized interactions, and significantly."
    },
    {
      id: 2,
      question: "What industries can benefit from AI automation?",
      answer:
        "Virtually all industries can benefit from AI automation. Keys sectors include manufacturing (predictive maintenance), finance (fraud detection), retail (personalized marketing), logistics (route optimization), and customer service (chatbots and support automation)."
    },
    {
      id: 3,
      question: "What kind of support do you offer?",
      answer:
        "We provide comprehensive support including 24/7 technical assistance, dedicated account managers, regular software updates, training sessions for your team, detailed documentation, and a responsive customer success team ."
    },
    {
      id: 4,
      question: "Do I need technical knowledge to use AI automation?",
      answer:
        "No technical knowledge is required. Our platform is designed with user-friendly interfaces, intuitive dashboards, and guided workflows. We provide comprehensive training and support to ensure users of all technical backgrounds can effectively."
    },
    {
      id: 5,
      question: "What kind of support do you offer?",
      answer:
        "We provide comprehensive support including 24/7 technical assistance, dedicated account managers, regular software updates, training sessions for your team, detailed documentation, and a responsive customer success."
    },
    {
      id: 6,
      question: "Do I need technical knowledge to use AI automation?",
      answer:
        "No technical knowledge is required. Our platform is designed with user-friendly interfaces, intuitive dashboards, and guided workflows. We provide comprehensive training and support to ensure users of all technical backgrounds ."
    }
  ];

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden px-4 py-20 md:px-8"
      style={{
        backgroundImage: `url(${carview.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Background Gradient */}
      <div className="absolute inset-100 bg-gradient-to-br from-[#0A0F24]/80 via-[#0A0F24]/70 to-[#0A0F24]/80"></div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Header Section */}
        <div className="mb-10 text-center">
          {/* Label */}
          <div className="mb-3 inline-flex items-center space-x-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
            <p className="text-[10px] font-light tracking-widest text-cyan-300/80 uppercase md:text-[10px]">
              Frequently Asked Question
            </p>
          </div>

          {/* Main Heading */}
          <h2 className="mb-4 text-2xl leading-tight text-white md:text-3xl lg:text-5xl">
            We've Got the Answers You're Looking For
          </h2>

          {/*  Description */}
          <p className="mx-auto max-w-3xl text-[12px] leading-relaxed text-white/60 md:text-base">
            Find clear, concise answers to your most common PROVAX AI automation questions. We're
            here to help you understand, optimize, and grow with confidence.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="grid grid-cols-1 gap-4 space-y-1 md:space-y-5 md:grid-cols-2">
          {faqItems.map((item) => (
            <div
              key={item.id}
              className="from-blue-1000 rounded-full border border-green-900/20 bg-transparent bg-gradient-to-br to-green-900 transition-all duration-300 hover:border-green-400/30"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="flex w-full items-center justify-between p-2 md:p-6 text-left transition-all duration-300"
              >
                <h3 className="pr-4 text-[8px] text-white md:text-sm">{item.question}</h3>
                <div className="flex-shrink-0">
                  <svg
                    className={`h-6 w-6 text-white transition-transform duration-300 ${
                      openItem === item.id ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {/* Answer Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openItem === item.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="leading-relaxed text-white/70">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Divider Line */}
        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
      </div>
    </section>
  );
}
