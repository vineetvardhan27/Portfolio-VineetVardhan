import React from "react";
import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Twitter, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-subtle border-t border-border mt-20">
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-border shrink-0">
                <img
                  src="/avatar.png"
                  alt="Vineet Vardhan — Full-Stack Developer & Software Engineer"
                  width={32}
                  height={32}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-semibold text-text-primary text-base">
                Vineet Vardhan
              </span>
            </div>
            <p className="text-text-secondary text-sm max-w-md mt-1">
              Designing and engineering high-converting websites, booking platforms, and custom business software for modern businesses.
            </p>
            <div className="flex items-center gap-3 mt-3 text-text-muted">
              <span className="text-xs">Based in India • Serving Global Clients</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-[11px] uppercase tracking-[0.04em] font-medium text-text-muted">
              Navigation
            </h4>
            <Link
              href="/#work"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Featured Projects
            </Link>
            <Link
              href="/#services"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Services & Expertise
            </Link>
            <Link
              href="/#pricing"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Pricing & Rate Card
            </Link>
            <Link
              href="/#process"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Development Process
            </Link>
            <Link
              href="/#why-me"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Why Work With Me
            </Link>
            <Link
              href="/#contact"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Contact & Inquiries
            </Link>
          </div>

          {/* Connect Links */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-[11px] uppercase tracking-[0.04em] font-medium text-text-muted">
              Connect
            </h4>
            <a
              href="mailto:vineetvardhanwork@gmail.com"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5"
            >
              <Mail size={15} />
              <span>vineetvardhanwork@gmail.com</span>
            </a>
            <a
              href="https://github.com/vineetvardhan27"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5"
            >
              <Github size={15} />
              <span>GitHub</span>
              <ArrowUpRight size={13} className="text-text-muted" />
            </a>
            <a
              href="https://www.linkedin.com/in/vineetvardhan/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5"
            >
              <Linkedin size={15} />
              <span>LinkedIn</span>
              <ArrowUpRight size={13} className="text-text-muted" />
            </a>
            <a
              href="https://wa.me/919798504212"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent hover:text-accent-hover font-medium transition-colors flex items-center gap-1.5 mt-1"
            >
              <span>WhatsApp (+91 97985 04212)</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>© {currentYear} Vineet Vardhan. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with Next.js 14, Tailwind CSS & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
