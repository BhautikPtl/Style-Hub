import React from "react";
import Navbar from "../Componet/Navbar";

function TermsConditions() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-sm border p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>

          <p className="text-gray-500 mb-8">Last Updated: July 2026</p>

          <div className="space-y-8 text-gray-700 leading-8">
            <section>
              <h2 className="text-2xl font-semibold mb-3">
                1. Acceptance of Terms
              </h2>

              <p>
                By accessing and using our website, you agree to comply with
                these Terms & Conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">
                2. Orders & Payments
              </h2>

              <p>
                All orders are subject to availability and confirmation of
                payment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Pricing</h2>

              <p>
                Prices listed on the website are subject to change without prior
                notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">
                4. Shipping & Delivery
              </h2>

              <p>
                Delivery times may vary depending on location, product
                availability, and courier services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">
                5. Returns & Refunds
              </h2>

              <p>
                Eligible products may be returned according to our Return
                Policy. Refunds will be processed after successful verification.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">
                6. User Responsibilities
              </h2>

              <p>
                Users must provide accurate information and must not misuse the
                website or engage in fraudulent activities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">
                7. Limitation of Liability
              </h2>

              <p>
                We shall not be held responsible for any indirect, incidental,
                or consequential damages arising from the use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">
                8. Contact Information
              </h2>

              <p>
                For questions regarding these Terms & Conditions, please contact
                our support team.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsConditions;
