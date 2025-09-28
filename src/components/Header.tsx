import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
// import { useTheme } from "next-themes";
import logo from "@/assets/logo.png";
import addCircle from "@/assets/Icon/add-circle.svg";
import clock from "@/assets/Icon/clock.svg";
import notificationBing from "@/assets/Icon/notification-bing.svg";

const Header = () => {
  // const { theme, setTheme } = useTheme();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [renderAlert, setRenderAlert] = useState(false); // controls mount
  const [animateAlert, setAnimateAlert] = useState(false); // controls classes
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCreateNewClick = () => {
    // setShowNotification(true);
    setIsMobileMenuOpen(false);

    // Trigger animation after a brief delay to ensure DOM update
    setTimeout(() => {
      setIsAnimating(true);
    }, 20);

    // Show slide-down alert
    setRenderAlert(true);
    requestAnimationFrame(() => setAnimateAlert(true));
  };

  const handleCloseNotification = () => {
    setIsAnimating(false);
    // Wait for animation to complete before hiding
    setTimeout(() => {
      setShowNotification(false);
    }, 200);
    setAnimateAlert(false);
    setTimeout(() => setRenderAlert(false), 400);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show header when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsHeaderVisible(true);
      }
      // Hide header when scrolling down (but not at the very top)
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    // Add padding to body to account for fixed header
    document.body.style.paddingTop = '80px';

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Clean up body padding
      document.body.style.paddingTop = '0px';
    };
  }, [lastScrollY]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-25 py-3 bg-card border-b border-border transition-transform duration-300 ease-in-out ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
      <div className="flex items-center gap-2">
        <a href={baseUrl}>
          <img
            src={logo}
            alt="ConvertAudit"
            className="w-32 sm:w-36 lg:w-40.25 h-auto py-2 sm:py-3 lg:py-4.625 hover:cursor-pointer"
          />
        </a>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8 lg:gap-10">
        <div className="relative">
          <a href="#" aria-disabled="true" className="text-primary-900 text-body-lg transition-colors opacity-50 pointer-events-none cursor-not-allowed">
            History
          </a>
        </div>
        <div className="relative pointer-events-none cursor-not-allowed">
          <a href="#" aria-disabled="true" className="text-primary-900 text-body-lg transition-colors opacity-50">
            Credits
          </a>
          <Badge className="absolute -top-4 -right-8 text-primary-300 bg-accent-foreground text-xs px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center rounded-full gap-0.2">
            <img src={clock} alt="clock" className="w-3 h-3" />
            coming soon
          </Badge>
        </div>
        <Button
          variant="gradient"
          className="font-axiforma text-figma-17 align-middle hover:cursor-pointer"
          onClick={handleCreateNewClick}
        >
          <img src={addCircle} alt="Add" className="w-4 h-4 mr-2" />
          Create New
        </Button>
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/lovable-uploads/3e335fc1-64d5-458d-a3ba-c375c7854318.png" />
            <AvatarFallback className="bg-warning text-warning-foreground">U</AvatarFallback>
          </Avatar>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobileMenu}
          className="w-8 h-8"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Mobile Menu Overlay - Portal to body so it's not clipped/transparent */}
      {isMobileMenuOpen && createPortal(
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className="fixed inset-0 bg-black/40" onClick={toggleMobileMenu} />
          <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-card border-l border-border shadow-lg">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold">Menu</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                className="w-8 h-8"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <nav className="flex flex-col p-4 space-y-4">
              <div className="relative pointer-events-none cursor-not-allowed">
                <a
                  href="#"
                  aria-disabled="true"
                  className="text-primary-900 text-body-lg transition-colors py-2 opacity-50"
                >
                  History
                </a>
              </div>
              <div className="relative pointer-events-none cursor-not-allowed">
                <a
                  href="#"
                  aria-disabled="true"
                  className="text-primary-900 text-body-lg transition-colors py-2 block opacity-50"
                >
                  Credits
                </a>
                <Badge className="absolute -top-1 -right-0.5 text-primary-300 bg-accent-foreground text-xs px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center rounded-full gap-1">
                  <img src={clock} alt="clock" className="w-3 h-3" />
                  coming soon
                </Badge>
              </div>
              <Button
                variant="gradient"
                className="w-full h-11 text-sm font-medium hover:cursor-pointer"
                onClick={handleCreateNewClick}
              >
                <img src={addCircle} alt="Add" className="w-4 h-4 mr-2" />
                Create New
              </Button>
              <div className="flex items-center gap-2 pt-4 border-t border-border">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/lovable-uploads/3e335fc1-64d5-458d-a3ba-c375c7854318.png" />
                  <AvatarFallback className="bg-warning text-warning-foreground">U</AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">User</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground ml-auto" />
              </div>
            </nav>
          </div>
        </div>,
        document.body
      )}

      {/* Alert - slides down on Create New */}
      {renderAlert && (
        <div className="fixed inset-x-0 top-8 z-[200] pointer-events-none">
          <div
            role="alert"
            className={`relative mx-auto max-w-85.5 sm:max-w-162.5 p-4 mb-4 rounded-lg shadow-lg border
                  bg-accent-foreground border-blue-300
                  transform transition-transform duration-200
                  ease-out will-change-transform pointer-events-auto 
                  ${isAnimating ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
          >
            {/* Close button (top-right) */}
            <button
              onClick={handleCloseNotification}
              aria-label="Close alert"
              className="absolute top-2 right-2 rounded p-1 text-dark-bg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Content */}
            <div className="flex items-start gap-2">
              <img src={notificationBing} alt="notification-bing" className="w-6 h-6 flex-shrink-0" />
              <div className="text-sm">
                <h3 className="text-menu text-dark-bg">MVP Limit</h3>
                <p className="text-body-sm text-dark-bg-300 pr-6 sm:pr-8">We're currently testing ConvertAudit in our MVP stage. To ensure quality and fairness, each email can request 1 free audit per month.</p>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Dialog Modal */}
      {showNotification && createPortal(
        <div className="fixed inset-0 z-[100] size-auto max-h-none max-w-none overflow-y-auto bg-transparent">
          {/* Backdrop */}
          <div
            className={`fixed inset-0 bg-gray-900/50 transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'
              }`}
            onClick={handleCloseNotification}
          />

          {/* Dialog Panel */}
          <div className="flex min-h-full items-start justify-center p-4 text-center focus:outline-none sm:items-start sm:p-0">
            <div className={`relative overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg ${isAnimating ? 'animate-slide-in-top' : 'animate-fade-out'
              }`}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 sm:mx-0 sm:size-10">
                    <img src={addCircle} alt="Add" className="size-6 text-primary" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-base font-semibold text-gray-900">Create New Audit</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Start a new website audit to analyze your conversion optimization opportunities.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white hover:bg-primary/90 sm:ml-3 sm:w-auto"
                  onClick={() => {
                    handleCloseNotification();
                    setTimeout(() => {
                      // window.location.href = '/audit';
                    }, 200);
                  }}
                >
                  Start New Audit
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={handleCloseNotification}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
};

export default Header;