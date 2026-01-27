'use client';

import { motion } from 'framer-motion';
import { FileText, Sparkles } from 'lucide-react';
import { containerVariants, itemVariants } from '@/lib/animations';

export default function TermsPage() {
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
              <FileText className="w-4 h-4" />
              Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--text)] mb-4">
              Terms of Service
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
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-[var(--text)] mb-4">1. Acceptance of Terms</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              By accessing and using Venuly, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-[var(--text)] mb-4">2. Use License</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              Permission is granted to temporarily download one copy of the materials (information or software) on Venuly for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4 text-[var(--muted)]">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>Attempting to decompile or reverse engineer any software contained on Venuly</li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
              <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
            </ul>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-[var(--text)] mb-4">3. Disclaimer</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              The materials on Venuly are provided on an 'as is' basis. Venuly makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-[var(--text)] mb-4">4. Limitations</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              In no event shall Venuly or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Venuly.
            </p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-[var(--text)] mb-4">5. Accuracy of Materials</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              The materials appearing on Venuly could include technical, typographical, or photographic errors. Venuly does not warrant that any of the materials on its website are accurate, complete, or current.
            </p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-[var(--text)] mb-4">6. Materials on Venuly</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              Venuly has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Venuly of the site. Use of any such linked website is at the user's own risk.
            </p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-[var(--text)] mb-4">7. Modifications</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              Venuly may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-[var(--text)] mb-4">8. Governing Law</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of the United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-[var(--text)] mb-4">9. User Accounts</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              When you create an account on Venuly, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password.
            </p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-[var(--text)] mb-4">10. Prohibited Activities</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              You may not use Venuly for any unlawful or prohibited purpose, including but not limited to harassment, spam, phishing, or any illegal activities.
            </p>
          </motion.section>

          <motion.section variants={itemVariants} className="pt-8 border-t border-[var(--border)]">
            <h2 className="text-2xl font-bold text-[var(--text)] mb-4">Contact Us</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at{' '}
              <a href="mailto:support@venuly.com" className="text-[var(--primary)] hover:underline">support@venuly.com</a>
            </p>
          </motion.section>
        </motion.div>
      </main>
    </div>
  );
}
