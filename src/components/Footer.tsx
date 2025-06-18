import { Link } from 'react-router-dom';
import { Config } from '@/types/config';
import { Facebook, Linkedin, Twitter, Instagram } from 'lucide-react';

interface FooterProps {
  config: Config;
}
const Footer = ({
  config
}: FooterProps) => {
  const iconMap = {
    facebook: Facebook,
    linkedin: Linkedin,
    twitter: Twitter,
    instagram: Instagram
  };
  return <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4 text-blue-600">
              {config.company.name}
            </h3>
            <p className="text-gray-300 mb-4">
              {config.company.description}
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p>{config.contact.address}</p>
              <p>{config.contact.phone}</p>
              <p>{config.contact.email}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Quick Links</h3>
            <nav className="space-y-2">
              {config.footer.navigation.map(item => <Link key={item.href} to={item.href} className="block text-gray-300 hover:text-amber-400 transition-colors">
                  {item.label}
                </Link>)}
            </nav>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Business Hours</h3>
            <div className="space-y-2 text-sm text-gray-300">
              {config.contact.timing.map((time, index) => <div key={index} className="flex justify-between">
                  <span>{time.label}:</span>
                  <span>{time.hours}</span>
                </div>)}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Links */}
            <div className="flex space-x-4">
              {config.footer.social.map(social => {
              const IconComponent = iconMap[social.icon as keyof typeof iconMap];
              return IconComponent ? <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400 transition-colors">
                    <IconComponent className="h-5 w-5" />
                  </a> : null;
            })}
            </div>

            {/* Branding */}
            <div className="text-sm text-gray-400">
              {config.footer.branding.text}{' '}
              <a href={config.footer.branding.url} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-blue-300">
                {config.footer.branding.company}
              </a>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500 mt-4">
            © {new Date().getFullYear()} {config.company.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
