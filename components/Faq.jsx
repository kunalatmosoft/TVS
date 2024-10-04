"use client"
import React from 'react'

export const Faq = () => {

    const [openIndex, setOpenIndex] = useState(null);
  
    const toggleFAQ = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  
    const faqs = [
      { question: 'What is the warranty period for TVS bikes?', answer: 'The warranty period for TVS bikes is typically 5 years or 60,000 kilometers, whichever comes first.' },
      { question: 'How often should I service my TVS bike?', answer: 'It’s recommended to service your TVS bike every 3000 kilometers or every 3 months, whichever comes first.' },
      { question: 'Where can I book a test ride?', answer: 'You can book a test ride directly from our website or visit any nearby TVS dealership.' },
    ];

  return (
    <section id="faq" className="py-16 bg-gray-100 text-center">
    <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
    <div className="max-w-2xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
          <button onClick={() => toggleFAQ(index)} className="w-full text-left text-xl font-semibold">
            {faq.question}
          </button>
          {openIndex === index && <p className="mt-4 text-gray-700">{faq.answer}</p>}
        </div>
      ))}
    </div>
  </section>  
  );
};

