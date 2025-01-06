import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Bold,
  Italic,
  Underline,
  Superscript,
  Subscript,
  List,
  ListOrdered,
  Link,
  Image,
  Undo,
  Clock,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import TextEditor from "./TextEditor";

export default function ClozeQuestion() {
  const [text, setText] = useState("");
  const [underlinedWords, setUnderlinedWords] = useState(null);
  const [previwText, setPreviewText] = useState("");
  const processText = (htmlString) => {
    let matches = [...htmlString.matchAll(/<u>(.*?)<\/u>/g)];
    matches = matches.map((match) => match[1]);
    setUnderlinedWords(matches);
    return htmlString.replace(/<u>(.*?)<\/u>/g, "____");
  };
  let modifiedText = "";
  useEffect(() => {
    modifiedText = processText(text);
    console.log(modifiedText)
    setPreviewText(modifiedText);
  }, [text]);
  console.log(modifiedText);
  return (
    <Card className="w-full max-w-7xl mt-10 mx-auto">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="text-lg font-medium text-muted-foreground">
            Question 2
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Image className="w-5 h-5 text-muted-foreground" />
              <div className="flex flex-col">
                <span className="text-sm text-blue-500">Cloze</span>
                <span className="text-sm text-muted-foreground">Points</span>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-sm text-muted-foreground">Preview</Label>
            <div className="mt-1.5 p-3  rounded-md bg-muted/50">
              <div dangerouslySetInnerHTML={{ __html: previwText }} />
            </div>
          </div>

          <div>
            <Label className="text-sm text-muted-foreground">Sentence</Label>
            {/* this is the number of selection like text bold text underline */}
            <div className="mt-1.5 space-y-2">
              {/* <div className="flex items-center gap-1 border-b pb-2">
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Bold className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Italic className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Underline className="w-4 h-4" />
                </Button>
                <div className="w-px h-4 bg-border mx-1" />
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Superscript className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Subscript className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <List className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <ListOrdered className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Link className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Image className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Undo className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Clock className="w-4 h-4" />
                </Button>
              </div> */}
              <TextEditor setText={setText} />
              {/* <Input  placeholder="Underline the words here to convert them into blanks" className="outline-none"/> */}
              {/* <div className="p-3 border rounded-md min-h-[100px]">
                A quick <u>brown</u> fox jumped over a <u>fence</u>
              </div> */}
            </div>
          </div>

          {/* this is the checkbox */}
          <div className="space-y-4">
          {underlinedWords?.map((val, ind) => (
              <div key={ind} className="flex items-start space-x-2">
                <Checkbox id={`${ind}`} />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor={`${ind}`}>{val}</Label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
