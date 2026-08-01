'use client';

import React, { useState, useEffect, useRef } from 'react';
import AnimatedHeading from '@/components/ui/AnimateHeading';
import AnimateDescription from '@/components/ui/AnimateDescription';
import AnimatedButton from '@/components/ui/AnimatedButton';
const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const headingText = 'Contact';
  const descriptionText =
    'Share your ideas & thoughts! Feel free to send any message and attach images or PDFs regarding your works or ideas.';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => setSubmitStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setErrors({});
            setSubmitStatus(null);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '0px',
      },
    );
    observer.observe(section);
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const validateName = (name: string) => {
    if (name.trim().length < 2) return false;
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name])
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const validFiles: File[] = [];
      let fileError = '';

      for (const file of selectedFiles) {
        // Max 10MB per file
        if (file.size > 10 * 1024 * 1024) {
          fileError = `File "${file.name}" exceeds the 10MB limit.`;
          continue;
        }
        validFiles.push(file);
      }

      if (fileError) {
        setErrors((prev) => ({ ...prev, files: fileError }));
      } else {
        setErrors((prev) => ({ ...prev, files: '' }));
      }

      setFiles((prev) => [...prev, ...validFiles]);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async () => {
    setErrors({});
    setSubmitStatus(null);
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (!validateName(formData.name)) newErrors.name = 'Please enter a valid name (at least 2 characters)';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('message', formData.message);
      files.forEach((file) => payload.append('files', file));

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: payload,
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setSuccessMessage(data.message || 'Thank you! Your message and files have been sent successfully.');
        setFormData({
          name: '',
          email: '',
          message: '',
        });
        setFiles([]);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        if (data && data.error) {
          setErrors((prev) => ({
            ...prev,
            email: data.error,
          }));
        } else {
          setSubmitStatus('error');
        }
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = isSubmitting;

  return (
    <section ref={sectionRef} id="contact" className="bg-[#e8e8e3] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 w-full">
        <div className="rounded-3xl bg-[#080807] text-[#d1d1c7] p-8 sm:p-12 md:p-16 lg:p-20 border border-[#1a1a18]">
          <AnimatedHeading
            text={headingText}
            className="text-[clamp(2.5rem,7vw,6.5rem)] font-black tracking-tight leading-none uppercase mb-6"
          />
          <div className="max-w-2xl mb-12">
            <AnimateDescription
              text={descriptionText}
              className="text-base sm:text-lg text-[#a29e9a] font-sans leading-relaxed"
            />
          </div>
          <div className="max-w-2xl space-y-6 p-6 sm:p-8 rounded-2xl mx-auto bg-[#0d0d0c] border border-white/[0.04]">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-medium text-sm sm:text-base text-[#a29e9a]">
                Your Name <span className="text-red-400">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full px-4 py-3 text-sm sm:text-base border rounded-xl bg-[#161615] text-[#e8e8e3] placeholder-[#6a6a68] focus:outline-none transition-all duration-300 border-white/[0.08] focus:border-[#0c6145] focus:ring-1 focus:ring-[#0c6145]/30 ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                disabled={isDisabled}
              />
              {errors.name && <p className="text-red-400 text-xs sm:text-sm">{errors.name}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-medium text-sm sm:text-base text-[#a29e9a]">
                Your Email <span className="text-red-400">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
                placeholder="you@example.com"
                className={`w-full px-4 py-3 text-sm sm:text-base border rounded-xl bg-[#161615] text-[#e8e8e3] placeholder-[#6a6a68] focus:outline-none transition-all duration-300 border-white/[0.08] focus:border-[#0c6145] focus:ring-1 focus:ring-[#0c6145]/30 ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                disabled={isDisabled}
              />
              {errors.email && <p className="text-red-400 text-xs sm:text-sm">{errors.email}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-medium text-sm sm:text-base text-[#a29e9a]">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                spellCheck={false}
                autoCorrect="off"
                autoComplete="off"
                value={formData.message}
                onChange={handleChange}
                placeholder="Share your ideas, thoughts, or details about your work..."
                className={`w-full px-4 py-3 text-sm sm:text-base border rounded-xl bg-[#161615] text-[#e8e8e3] placeholder-[#6a6a68] resize-none focus:outline-none transition-all duration-300 border-white/[0.08] focus:border-[#0c6145] focus:ring-1 focus:ring-[#0c6145]/30 ${errors.message ? 'border-red-500 focus:border-red-500' : ''}`}
                disabled={isDisabled}
              />
              {errors.message && <p className="text-red-400 text-xs sm:text-sm">{errors.message}</p>}
            </div>

            {/* File Upload Section */}
            <div className="flex flex-col gap-2 pt-2">
              <label className="font-medium text-sm sm:text-base text-[#a29e9a] flex items-center justify-between">
                <span>Attach Files (Images or PDFs)</span>
                <span className="text-xs text-[#6a6a68]">Max 10MB per file</span>
              </label>
              <p className="text-xs text-[#8a8680]">
                Share your ideas, thoughts, images, or PDFs regarding your works or ideas!
              </p>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                disabled={isDisabled}
              />
              
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-white/[0.15] rounded-xl bg-[#161615] hover:bg-[#1f1f1e] text-[#d1d1c7] text-sm transition-all duration-300"
              >
                <svg className="w-5 h-5 text-[#0c6145]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Click to attach Images or PDF files</span>
              </label>
              
              {errors.files && <p className="text-red-400 text-xs">{errors.files}</p>}

              {files.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {files.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1c1c1a] border border-white/[0.1] text-xs text-[#e8e8e3]"
                    >
                      <span className="font-medium truncate max-w-[180px]">{file.name}</span>
                      <span className="text-[#6a6a68]">({(file.size / 1024).toFixed(1)} KB)</span>
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="text-red-400 hover:text-red-300 ml-1 font-bold"
                        title="Remove file"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {submitStatus === 'success' && (
              <div className="p-4 bg-green-900/20 border border-green-600/40 rounded-xl">
                <p className="text-green-400 text-sm">
                  {successMessage}
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-900/20 border border-red-600/40 rounded-xl">
                <p className="text-red-400 text-sm">Something went wrong. Please try again later.</p>
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isDisabled}
              className="inline-block border-0 bg-transparent p-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed pt-2"
            >
              <AnimatedButton
                topText={isDisabled ? 'PLEASE WAIT...' : 'SEND MESSAGE'}
                bottomText={isDisabled ? 'PROCESSING' : 'PROCEED →'}
                variant="primary"
                as="span"
                className={isDisabled ? 'pointer-events-none' : ''}
              />
            </button>
          </div>

          <div className="mt-16 md:mt-24 text-center px-4 sm:px-6 overflow-hidden">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#6b645c] mb-6">
              Or reach out directly
            </p>
            <button
              type="button"
              data-cursor="copy"
              onClick={() => {
                navigator.clipboard.writeText('subhashadireddy@gmail.com');
                const toast = document.getElementById('email-copy-toast');
                if (toast) {
                  toast.style.opacity = '1';
                  toast.style.transform = 'translateY(0)';
                  setTimeout(() => {
                    toast.style.opacity = '0';
                    toast.style.transform = 'translateY(8px)';
                  }, 2000);
                }
              }}
              className="group relative inline-block cursor-none text-[#d1d1c7] font-display font-black uppercase leading-none hover:text-[#0c6145] transition-colors duration-300 max-w-full whitespace-nowrap"
              style={{
                fontSize: 'clamp(0.85rem, 2.8vw, 2.5rem)',
              }}
            >
              subhashadireddy@gmail.com
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0c6145] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out block" />
            </button>
          </div>
        </div>
      </div>

      <div
        id="email-copy-toast"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 9998,
          background: '#0c6145',
          color: 'white',
          fontFamily: 'monospace',
          fontSize: '0.75rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          padding: '0.75rem 1.25rem',
          borderRadius: '9999px',
          opacity: 0,
          transform: 'translateY(8px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          pointerEvents: 'none',
        }}
      >
        ✓ Copied to clipboard
      </div>
    </section>
  );
};
export default Contact;
