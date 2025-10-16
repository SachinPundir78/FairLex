import React from "react";
import {
  Scale,
  Mail,
  MapPin,
  Phone,
  BookOpen,
  Gavel,
  Users,
  Award,
} from "lucide-react";
import {
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";

const BlogFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-cream dark:bg-gray-900/10 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-red-600 to-yellow-500"></div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Scale className="w-8 h-8 text-red-600" strokeWidth={2} />
              <h3 className="text-3xl font-bold">
                <span className="text-orange-500">Fair</span>
                <span className="text-gray-800 dark:text-white">Lex</span>
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              Where Legal Thought Becomes Legal Insight. Democratizing legal
              knowledge through scholarly excellence and accessible commentary.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-orange-500 hover:via-red-600 hover:to-yellow-500 hover:text-white transition-all duration-300 transform hover:scale-110"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-orange-500 hover:via-red-600 hover:to-yellow-500 hover:text-white transition-all duration-300 transform hover:scale-110"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-orange-500 hover:via-red-600 hover:to-yellow-500 hover:text-white transition-all duration-300 transform hover:scale-110"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-orange-500 hover:via-red-600 hover:to-yellow-500 hover:text-white transition-all duration-300 transform hover:scale-110"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold flex items-center space-x-2 text-gray-800 dark:text-white">
              <BookOpen className="w-5 h-5 text-red-600" />
              <span>Explore</span>
            </h4>
            <ul className="space-y-3">
              {[
                "Constitutional Law",
                "Corporate Law",
                "Technology Law",
                "Family Law",
                "ADR",
                "Case Comments",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors duration-200 flex items-center space-x-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold flex items-center space-x-2 text-gray-800 dark:text-white">
              <Gavel className="w-5 h-5 text-red-600" />
              <span>Resources</span>
            </h4>
            <ul className="space-y-3">
              {[
                "Fair Review Magazine",
                "Landmark Cases",
                "Research Journal",
                "Writing Awards",
                "Guest Contributions",
                "About Us",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors duration-200 flex items-center space-x-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold flex items-center space-x-2 text-gray-800 dark:text-white">
              <Users className="w-5 h-5 text-red-600" />
              <span>Connect</span>
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:contact@fairlex.com"
                className="flex items-start space-x-3 text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors duration-200 group"
              >
                <Mail className="w-5 h-5 mt-0.5 group-hover:scale-110 transition-transform" />
                <span>contact@fairlex.com</span>
              </a>
              <div className="flex items-start space-x-3 text-sm text-gray-600 dark:text-gray-400">
                <Phone className="w-5 h-5 mt-0.5" />
                <span>+91 XXX XXX XXXX</span>
              </div>
              <div className="flex items-start space-x-3 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-5 h-5 mt-0.5" />
                <span>New Delhi, India</span>
              </div>

              {/* Newsletter Signup */}
              <div className="pt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Subscribe to our newsletter
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-4 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-l-lg focus:outline-none focus:border-red-600 dark:focus:border-red-500 transition-colors"
                  />
                  <button className="px-4 py-2 bg-red-600 text-white rounded-r-lg hover:bg-red-700 transition-colors duration-200">
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Banner */}
        <div className="border-t border-b border-gray-300 dark:border-gray-700 py-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Scale, label: "Integrity", desc: "Truth & Ethics" },
              { icon: Users, label: "Inclusivity", desc: "Diverse Voices" },
              { icon: Award, label: "Accuracy", desc: "Research-Backed" },
              {
                icon: BookOpen,
                label: "Accessibility",
                desc: "Free Knowledge",
              },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="space-y-2 group cursor-pointer">
                <Icon className="w-8 h-8 mx-auto text-red-600 group-hover:scale-110 transition-transform duration-300" />
                <h5 className="font-semibold text-gray-800 dark:text-white">
                  {label}
                </h5>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <span>© {currentYear} FairLex.</span>
            <span className="hidden md:inline">•</span>
            <span className="italic">Justice. Clarity. Fairness.</span>
          </div>
          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="hover:text-red-600 dark:hover:text-red-500 transition-colors"
            >
              Privacy Policy
            </a>
            <span>•</span>
            <a
              href="#"
              className="hover:text-red-600 dark:hover:text-red-500 transition-colors"
            >
              Terms of Use
            </a>
            <span>•</span>
            <a
              href="#"
              className="hover:text-red-600 dark:hover:text-red-500 transition-colors"
            >
              Editorial Policy
            </a>
          </div>
        </div>
      </div>

      {/* Founder Credit */}
      <div className="bg-gray-100 dark:bg-gray-950 py-4 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-500">
          Founded by{" "}
          <span className="font-semibold text-red-600">Aziz Umar</span> •
          Designed & Developed by{" "}
          <span className="font-semibold text-orange-500">Sachin Pundir</span>
        </p>
      </div>
    </footer>
  );
};

export default BlogFooter;
