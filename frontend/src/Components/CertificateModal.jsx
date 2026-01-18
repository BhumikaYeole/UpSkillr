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
    const text = `I'm proud to share that I've completed ${certificateData.courseTitle} with ${certificateData.status}!`;
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
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
              className="relative bg-gradient-to-br from-slate-800 to-slate-700 rounded-3xl p-16 shadow-2xl border-2 border-cyan-500/30"
            >
              {/* Corner Decorations */}
              <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-cyan-400/40 rounded-tl-xl"></div>
              <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-cyan-400/40 rounded-tr-xl"></div>
              <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-cyan-400/40 rounded-bl-xl"></div>
              <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-cyan-400/40 rounded-br-xl"></div>
              
              {/* Success Badge */}
              <div className="absolute top-6 right-6 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50">
                <Check className="w-7 h-7 text-white" strokeWidth={3} />
              </div>

              {/* Decorative Icons */}
              <div className="absolute bottom-12 left-20 text-cyan-500/20">
                <Award className="w-8 h-8" />
              </div>
              <div className="absolute top-32 right-24 text-cyan-500/20">
                <TrendingUp className="w-6 h-6" />
              </div>

              {/* Main Content */}
              <div className="text-center space-y-6">
                {/* Icon */}
                <div className="flex justify-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/50">
                    <Award className="w-10 h-10 text-white" strokeWidth={2.5} />
                  </div>
                </div>

                {/* Header */}
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm tracking-[0.3em] uppercase font-light">
                    Certificate of Completion
                  </p>
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    UpSkillr Academy
                  </h1>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"></div>
                </div>

                {/* Body */}
                <div className="space-y-6 py-8">
                  <p className="text-gray-300 text-lg">
                    This is to certify that
                  </p>
                  
                  <h2 className="text-5xl font-bold text-white">
                    {certificateData.learnerName}
                  </h2>
                  
                  <p className="text-gray-300 text-lg">
                    has successfully completed the course
                  </p>
                  
                  <h3 className="text-3xl font-semibold text-cyan-400">
                    "{certificateData.courseTitle}"
                  </h3>

                  {/* Score Badge */}
                  <div className="inline-block">
                    <div className="border-2 border-cyan-500/40 rounded-full px-8 py-3 bg-slate-800/50 backdrop-blur-sm">
                      <p className="text-cyan-400 font-semibold flex items-center gap-2">
                        <span className="text-xl">Score: {certificateData.score}%</span>
                        <span className="text-gray-400">–</span>
                        <span className="text-xl">{certificateData.status}</span>
                        <Award className="w-5 h-5 text-cyan-400" />
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="border-t border-gray-600/30 pt-8 mt-12">
                  <div className="grid grid-cols-3 gap-8 text-center max-w-3xl mx-auto">
                    <div className="space-y-1">
                      <p className="text-gray-500 text-xs uppercase tracking-wider">Instructor</p>
                      <p className="text-white font-semibold">{certificateData.instructorName}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-500 text-xs uppercase tracking-wider">Date Issued</p>
                      <p className="text-white font-semibold">{certificateData.dateIssued}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-500 text-xs uppercase tracking-wider">Certificate ID</p>
                      <p className="text-white font-semibold">{certificateData.certificateId}</p>
                    </div>
                  </div>
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