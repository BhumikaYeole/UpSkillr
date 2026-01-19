import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share2, Award, Check, TrendingUp } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function CertificateModal({ isOpen, onClose, certificateData }) {
  const certificateRef = useRef(null);
  const [loading, setLoading] = useState(false);

  if (!certificateData) return null;

  const handleDownloadPDF = async () => {
    setLoading(true);
    try {
      const element = certificateRef.current;

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: null,
        logging: false,
        useCORS: true
      });

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`certificate-${certificateData.certificateId}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF');
    } finally {
      setLoading(false);
    }
  };

  const handleShareLinkedIn = () => {
    const text = `I'm proud to share that I've completed ${certificateData.courseTitle} with a score of ${certificateData.score}%! 🎓\n\nCertificate ID: ${certificateData.certificateId}\nIssued: ${certificateData.dateIssued}`;
    
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://www.linkedin.com')}`;
    
    // Copy certificate details to clipboard for easy pasting
    navigator.clipboard.writeText(text).then(() => {
      alert('Certificate details copied to clipboard! You can paste them into your LinkedIn post.');
      window.open(linkedInUrl, '_blank');
    }).catch(() => {

      window.open(linkedInUrl, '_blank');
      alert('Please share your achievement on LinkedIn! Certificate details:\n\n' + text);
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-6xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate */}
            <div
              ref={certificateRef}
              className="relative bg-white p-16 shadow-2xl border-[12px] border-[#d4af37] rounded-md max-w-5xl mx-auto"
            >
              {/* Inner Border */}
              <div className="absolute inset-4 border-2 border-[#d4af37] pointer-events-none"></div>

              {/* Gold Seal */}
              <div className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-xl">
                <Award className="w-10 h-10 text-white" />
              </div>

              {/* Header */}
              <div className="text-center mb-10">
                <h1 className="text-4xl font-serif tracking-widest text-gray-800">
                  CERTIFICATE
                </h1>
                <p className="text-lg tracking-[0.3em] text-gray-500 mt-1">
                  OF COMPLETION
                </p>
              </div>

              {/* Body */}
              <div className="text-center space-y-6 px-10">
                <p className="text-gray-600 text-lg uppercase tracking-wide">
                  This Certificate is Presented To
                </p>

                <h2 className="text-5xl font-[cursive] text-[#d4af37]">
                  {certificateData.learnerName}
                </h2>

                <div className="w-40 h-[2px] bg-[#d4af37] mx-auto"></div>

                <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
                  In recognition of successfully completing the course
                </p>

                <h3 className="text-2xl font-semibold text-gray-900">
                  {certificateData.courseTitle}
                </h3>

                <p className="text-gray-600 text-md">
                  with a score of <span className="font-semibold">{certificateData.score}%</span>
                </p>
              </div>

              {/* Footer */}
              <div className="mt-16 grid grid-cols-3 gap-10 text-center items-end px-10">
                {/* Signature */}
                <div>
                  <div className="h-12 mb-2 border-b border-gray-400"></div>
                  <p className="font-semibold text-gray-800">
                    {certificateData.instructorName}
                  </p>
                  <p className="text-sm text-gray-500">Instructor</p>
                </div>

                {/* Date */}
                <div>
                  <p className="font-semibold text-gray-800">
                    {certificateData.dateIssued}
                  </p>
                  <p className="text-sm text-gray-500">Date Issued</p>
                </div>

                {/* Certificate ID */}
                <div>
                  <p className="font-semibold text-gray-800">
                    {certificateData.certificateId}
                  </p>
                  <p className="text-sm text-gray-500">Certificate ID</p>
                </div>
              </div>
            </div>


            {/* Action Buttons */}
            <div className="flex gap-4 mt-8 justify-center">
              <button
                onClick={handleDownloadPDF}
                disabled={loading}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-5 h-5" />
                {loading ? 'Generating...' : 'Download Certificate'}
              </button>
              <button
                onClick={handleShareLinkedIn}
                className="flex items-center gap-2 px-8 py-4 bg-slate-700 text-white rounded-xl font-semibold border-2 border-slate-600 hover:bg-slate-600 transition-all hover:scale-105"
              >
                <Share2 className="w-5 h-5" />
                Share on LinkedIn
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}