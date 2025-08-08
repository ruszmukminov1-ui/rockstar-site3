import { FaTelegramPlane, FaVk, FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

const Footer = () => {
  const { t } = useApp();

  return (
    <footer className="relative bg-black text-white py-6 md:py-8 mt-8 md:mt-12 border-t border-purple-800 font-rajdhani">
      {/* Social media icons */}
      <div className="flex justify-center gap-4 md:gap-6 mb-3 md:mb-4">
        <a
          href="https://vk.com/rockstarclient"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-500 transform hover:-translate-y-2 relative group"
        >
          <FaVk size={24} className="text-gray-300 group-hover:text-blue-400 md:text-[28px]" />
          <div className="absolute inset-0 blur-md rounded-full opacity-0 group-hover:opacity-100 transition duration-500 bg-blue-400/20 z-[-1]" />
        </a>

        <a
          href="https://t.me/rockclient"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-500 transform hover:-translate-y-2 relative group"
        >
          <FaTelegramPlane size={24} className="text-gray-300 group-hover:text-blue-400 md:text-[28px]" />
          <div className="absolute inset-0 blur-md rounded-full opacity-0 group-hover:opacity-100 transition duration-500 bg-blue-400/20 z-[-1]" />
        </a>

        <a
          href="https://discord.gg/tckhJdnT"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-500 transform hover:-translate-y-2 relative group"
        >
          <FaDiscord size={24} className="text-gray-300 group-hover:text-blue-400 md:text-[28px]" />
          <div className="absolute inset-0 blur-md rounded-full opacity-0 group-hover:opacity-100 transition duration-500 bg-blue-400/20 z-[-1]" />
        </a>
      </div>

      {/* Text links */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-400">
        <p className="hover:text-white transition duration-300">
          {t('footer.copyright')}
        </p>

        <Link
          to="/terms"
          className="hover:text-cyan-400 transition duration-300 underline underline-offset-2"
        >
          {t('footer.terms')}
        </Link>
      </div>
    </footer>
  );
};

export default Footer;