import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Plus, Sun, Moon } from "lucide-react";
// import { useTheme } from "next-themes";
import logo from "@/assets/logo.png";
import addCircle from "@/assets/Icon/add-circle.svg";

const Header = () => {
  // const { theme, setTheme } = useTheme();

  return (
    <header className="flex items-center justify-between px-25 py-3 bg-card border-b border-border">
      <div className="flex items-center gap-2">
        <img src={logo} alt="ConvertAudit" className="w-40.25 h-9.25 py-4.625 hover:cursor-pointer " />
      </div>

      <nav className="flex items-center gap-6">
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
        {/* <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="w-9 h-9"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button> */}
        <Button
          variant="gradient"
          className="font-axiforma text-figma-17 align-middle hover:cursor-pointer"
        >
          {/* <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-2"> */}
            <img src={addCircle}></img>
          {/* </div> */}
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
    </header>
  );
};

export default Header;