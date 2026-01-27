'use client';

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { containerVariants, itemVariants } from '@/lib/animations';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--primary)] opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[var(--accent)] opacity-5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Your Privacy Matters
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--text)] mb-4">
              Privacy Policy
            </h1>
            <p className="text-[var(--muted)]">Last updated: January 2024</p>
          </motion.div>
        </div>
      </section>

      <main className="container mx-auto px-6 pb-24">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto bg-white dark:bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-soft p-8 md:p-12"
        >
          <div className="prose prose-sm max-w-none space-y-8">
            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold text-[var(--text)] mb-4">1. Introduction</h2>
              <p className="text-[var(--muted)] leading-relaxed">
                Venuly ("we" or "us" or "our") operates the Venuly.com website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
              </p>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold text-[var(--text)] mb-4">2. Information Collection and Use</h2>
              <p className="text-[var(--muted)] leading-relaxed">
                We collect several different types of information for various purposes to provide and improve our Service to you.
              </p>
              <h3 className="text-lg font-semibold text-[var(--text)] mt-4 mb-2">Types of Data Collected:</h3>
              <ul className="list-disc list-inside space-y-2 text-[var(--muted)]">
                <li><strong className="text-[var(--text)]">Personal Data:</strong> Email address, first name, last name, phone number, address, cookies and usage data</li>
                <li><strong className="text-[var(--text)]">Usage Data:</strong> Information about how you interact with our Service</li>
                <li><strong className="text-[var(--text)]">Location Data:</strong> Information about your location if you permit us to access it</li>
              </ul>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold text-[var(--text)] mb-4">3. Use of Data</h2>
              <p className="text-[var(--muted)] leading-relaxed">
                Venuly uses the collected data for various purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[var(--muted)] mt-4">
                <li>To provide and maintain the Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features of our Service</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information so that we can improve the Service</li>
                <li>To monitor the usage of our Service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold text-[var(--text)] mb-4">4. Security of Data</h2>
              <p className="text-[var(--muted)] leading-relaxed">
                The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold text-[var(--text)] mb-4">5. Communications</h2>
              <p className="text-[var(--muted)] leading-relaxed">
                Venuly may send you promotional communications, updates, and other information related to the Service. If you no longer wish to receive these communications, you may opt out by following the instructions in those emails.
              </p>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold text-[var(--text)] mb-4">6. Third-Party Services</h2>
              <p className="text-[var(--muted)] leading-relaxed">
                Our Service may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
              </p>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold text-[var(--text)] mb-4">7. Children's Privacy</h2>
              <p className="text-[var(--muted)] leading-relaxed">
                Our Service does not address anyone under the age of 18. We do not knowingly collect personally identifiable information from children under 18. If we become aware that we have collected personal data from children under 18 without verification of parental consent, we take steps to remove such information and terminate the child's account.
              </p>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold text-[var(--text)] mb-4">8. Changes to This Privacy Policy</h2>
              <p className="text-[var(--muted)] leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
              </p>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold text-[var(--text)] mb-4">9. Contact Us</h2>
              <p className="text-[var(--muted)] leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-[var(--bg-secondary)] rounded-xl p-6 space-y-2">
                <p className="text-[var(--text)]"><strong>Email:</strong> <a href="mailto:privacy@venuly.com" className="text-[var(--primary)] hover:underline">privacy@venuly.com</a></p>
                <p className="text-[var(--text)]"><strong>Address:</strong> 123 Event Street, New York, NY 10001</p>
                <p className="text-[var(--text)]"><strong>Phone:</strong> 1-800-VENULY-1</p>
              </div>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold text-[var(--text)] mb-4">10. Your Rights</h2>
              <p className="text-[var(--muted)] leading-relaxed">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[var(--muted)] mt-4">
                <li>The right to access your personal data</li>
                <li>The right to correct or update your personal data</li>
                <li>The right to request deletion of your personal data</li>
                <li>The right to opt-out of marketing communications</li>
                <li>The right to data portability</li>
              </ul>
            </motion.section>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
