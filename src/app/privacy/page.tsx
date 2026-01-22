export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-primary-bg">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl font-display font-bold text-dark mb-2">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: January 2024</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-sm max-w-none text-gray-600 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">1. Introduction</h2>
            <p>
              Venuly ("we" or "us" or "our") operates the Venuly.com website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">2. Information Collection and Use</h2>
            <p>
              We collect several different types of information for various purposes to provide and improve our Service to you.
            </p>
            <h3 className="text-lg font-semibold text-dark mt-4 mb-2">Types of Data Collected:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Personal Data:</strong> Email address, first name, last name, phone number, address, cookies and usage data</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our Service</li>
              <li><strong>Location Data:</strong> Information about your location if you permit us to access it</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">3. Use of Data</h2>
            <p>
              Venuly uses the collected data for various purposes:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>To provide and maintain the Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features of our Service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so that we can improve the Service</li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">4. Security of Data</h2>
            <p>
              The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">5. Communications</h2>
            <p>
              Venuly may send you promotional communications, updates, and other information related to the Service. If you no longer wish to receive these communications, you may opt out by following the instructions in those emails.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">6. Third-Party Services</h2>
            <p>
              Our Service may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">7. Children's Privacy</h2>
            <p>
              Our Service does not address anyone under the age of 18. We do not knowingly collect personally identifiable information from children under 18. If we become aware that we have collected personal data from children under 18 without verification of parental consent, we take steps to remove such information and terminate the child's account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">8. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 text-dark">
              <p><strong>Email:</strong> privacy@venuly.com</p>
              <p><strong>Address:</strong> 123 Event Street, New York, NY 10001</p>
              <p><strong>Phone:</strong> 1-800-VENULY-1</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">10. Your Rights</h2>
            <p>
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>The right to access your personal data</li>
              <li>The right to correct or update your personal data</li>
              <li>The right to request deletion of your personal data</li>
              <li>The right to opt-out of marketing communications</li>
              <li>The right to data portability</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
