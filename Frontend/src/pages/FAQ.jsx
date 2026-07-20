import React from "react";
import Navbar from "../Componet/Navbar";

function FAQ() {
  const faqs = [
    {
      question: "How can I place an order?",
      answer:
        "Browse products, add your favorite items to the cart, proceed to checkout, select your address, and place the order.",
    },
    {
      question: "What payment methods are available?",
      answer:
        "We currently support Cash on Delivery (COD) and online payment options.",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "Yes, you can cancel your order before it is shipped from our warehouse.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Go to My Orders section and click on View Order to check the current status.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Orders are usually delivered within 3-7 business days depending on your location.",
    },
    {
      question: "Do you offer free shipping?",
      answer:
        "Yes, free shipping is available on selected products and special offers.",
    },
    {
      question: "Can I return or exchange a product?",
      answer:
        "Yes, products can be returned or exchanged within the return policy period if eligible.",
    },
    {
      question: "What should I do if I receive a damaged product?",
      answer:
        "Contact our support team immediately with product images and order details.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can contact us through the Contact Us page or email our support team.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, all customer data is securely stored and protected using industry-standard security practices.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-black text-white rounded-3xl text-4xl mb-5">
            ❓
          </div>

          <h1 className="text-4xl md:text-5xl font-bold">
            Frequently Asked Questions
          </h1>

          <p className="text-gray-500 mt-4 text-lg">
            Find answers to the most common questions about orders, payments,
            shipping and returns.
          </p>
        </div>

        {/* FAQ Cards */}
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden"
            >
              <summary className="flex justify-between items-center cursor-pointer px-6 py-5 font-semibold text-lg list-none">
                {faq.question}

                <span className="text-2xl transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>

              <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        {/* Contact Box */}
        <div className="mt-16 bg-black text-white rounded-3xl p-8 text-center">
          <h2 className="text-3xl font-bold">Still Need Help?</h2>

          <p className="text-gray-300 mt-3">
            Our support team is always ready to assist you.
          </p>

          <button className="mt-6 bg-white text-black px-8 py-3 rounded-xl font-semibold hover:scale-105 transition">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
