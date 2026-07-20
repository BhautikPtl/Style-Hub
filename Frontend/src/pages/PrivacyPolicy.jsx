import React from "react";
import Navbar from "../Componet/Navbar";

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-sm border p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>

          <p className="text-gray-500 mb-8">Last Updated: July 2026</p>

          <div className="space-y-8 text-gray-700 leading-8">
            <section>
              <h2 className="text-2xl font-semibold mb-3">
                1. Information We Collect
              </h2>

              <p>
                We collect personal information such as your name, email
                address, phone number, shipping address, and payment information
                when you place an order.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">
                2. How We Use Your Information
              </h2>

              <ul className="list-disc ml-6 space-y-2">
                <li>Process and deliver your orders</li>
                <li>Improve our website and services</li>
                <li>Provide customer support</li>
                <li>Send order updates and notifications</li>
                <li>Prevent fraud and unauthorized activity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Data Security</h2>

              <p>
                We implement appropriate security measures to protect your
                personal information from unauthorized access, alteration, or
                disclosure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Cookies</h2>

              <p>
                Our website may use cookies to enhance your browsing experience
                and remember your preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">
                5. Third-Party Services
              </h2>

              <p>
                We may use trusted third-party services for payment processing,
                analytics, and shipping.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Contact Us</h2>

              <p>
                If you have any questions regarding this Privacy Policy, please
                contact our support team.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
