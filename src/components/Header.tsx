import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Plus } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-card border-b border-border">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <div className="w-5 h-5 bg-primary-foreground rounded-full flex items-center justify-center">
            <div className="w-3 h-3 border-2 border-primary rounded-full"></div>
          </div>
        </div>
        <span className="text-xl font-semibold text-foreground">ConvertAudit</span>
      </div>
      
      <nav className="flex items-center gap-6">
        <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
          History
        </a>
        <div className="relative">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Credit
          </a>
          <Badge className="absolute -top-2 -right-3 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center rounded-full">
            9
          </Badge>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
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