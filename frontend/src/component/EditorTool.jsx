import React from "react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  Image,
  Calendar,
  MoreVertical,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
function EditorTool({ onBold, onItalic, onUnderline }) {
  return (
    <div className="flex items-center gap-1 border-b p-1">
    <Button variant="ghost" size="icon" onClick={onBold}>
      <Bold className="h-4 w-4" />
    </Button>
    <Button variant="ghost" size="icon" onClick={onItalic}>
      <Italic className="h-4 w-4" />
    </Button>
    <Button variant="ghost" size="icon" onClick={onUnderline}>
      <Underline className="h-4 w-4" />
    </Button>
    <Separator orientation="vertical" className="mx-1" />
    <Button variant="ghost" size="icon">
      <List className="h-4 w-4" />
    </Button>
    <Button variant="ghost" size="icon">
      <ListOrdered className="h-4 w-4" />
    </Button>
    <Separator orientation="vertical" className="mx-1" />
    <Button variant="ghost" size="icon">
      <Link className="h-4 w-4" />
    </Button>
    <Button variant="ghost" size="icon">
      <Image className="h-4 w-4" />
    </Button>
    <Button variant="ghost" size="icon">
      <Calendar className="h-4 w-4" />
    </Button>
    <div className="ml-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Help</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
  )
 
}

export default EditorTool;
