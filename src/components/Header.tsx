import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
// import { useTheme } from "next-themes";
import logo from "@/assets/logo.png";
import addCircle from "@/assets/Icon/add-circle.svg";

const Header = () => {
  // const { theme, setTheme } = useTheme();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="flex items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-25 py-3 bg-card border-b border-border">
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
      <nav className="hidden md:flex items-center gap-4 lg:gap-6">
        <a href="#" className="text-primary-900 text-body-lg hover:cursor-pointer transition-colors">
          History
        </a>
        <div className="relative">
          <a href="#" className="text-primary-900 text-body-lg hover:cursor-pointer transition-colors">
            Credits
          </a>
          <Badge className="absolute -top-2 -right-3 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center rounded-full">
            9
          </Badge>
        </div>
        <Button
          variant="gradient"
          className="font-axiforma text-figma-17 align-middle hover:cursor-pointer"
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/20" onClick={toggleMobileMenu} />
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
              <a 
                href="#" 
                className="text-primary-900 text-body-lg hover:cursor-pointer transition-colors py-2"
                onClick={toggleMobileMenu}
              >
                History
              </a>
              <div className="relative">
                <a 
                  href="#" 
                  className="text-primary-900 text-body-lg hover:cursor-pointer transition-colors py-2 block"
                  onClick={toggleMobileMenu}
                >
                  Credits
                </a>
                <Badge className="absolute -top-1 -right-0.5 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center rounded-full">
                  9
                </Badge>
              </div>
              <Button
                variant="gradient"
                className="w-full h-11 text-sm font-medium hover:cursor-pointer"
                onClick={toggleMobileMenu}
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
        </div>
      )}
    </header>
  );
};

export default Header;