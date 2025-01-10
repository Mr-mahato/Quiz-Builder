import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { Image, MoreVertical, Plus, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import TextEditor from "./TextEditor";

export default function ClozeQuestion() {
  const [clozeNmbr, setClozeNmbr] = useState(1);
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
    setPreviewText(modifiedText);
  }, [text]);
  console.log(modifiedText);
  return (
    <div className="w-full max-w-7xl mt-10 mx-auto border p-2 rounded-md flex justify-between gap-2">
      {/* this down whole div is the cloze */}
      <div className="flex flex-1 flex-col gap-2 ">
        {Array.from({ length: clozeNmbr }).map((_, indx) => {
          return (
            <div key={indx} className="p-2 border rounded-md">
              <div className="flex justify-between items-start mb-6">
                <div className="text-lg font-medium text-muted-foreground">
                  Question {indx+1}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Image className="w-5 h-5 text-muted-foreground" />
                    <div className="flex flex-col">
                      <span className="text-sm text-blue-500">Cloze</span>
                      <span className="text-sm text-muted-foreground">
                        Points
                      </span>
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
                  <Label className="text-sm text-muted-foreground">
                    Preview
                  </Label>
                  <div className="mt-1.5 p-3  rounded-md bg-muted/50">
                    <div dangerouslySetInnerHTML={{ __html: previwText }} />
                  </div>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground">
                    Sentence
                  </Label>
                  {/* this is the number of selection like text bold text underline */}
                  <div className="mt-1.5 space-y-2">
                    <TextEditor setText={setText} />
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
            </div>
          );
        })}
      </div>

      <div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col justify-center bg-neutral-800 p-2 rounded-full h-5 w-5 items-center">
            <button onClick={()=>setClozeNmbr(prev=>prev+1)} className=" p-2 cursor-pointer">
              <Plus className="w-4 h-4 text-white text-xl font-bold" />
            </button>
          </div>

          <div className="flex flex-col justify-center bg-neutral-100 p-2 rounded-full h-5 w-5 items-center">
            <button onClick={() => {
              if(clozeNmbr != 1){
                setClozeNmbr(prev=>prev-1);
              }
            }} className=" p-2 cursor-pointer">
              <Trash2 className="w-4 h-4  text-xl font-bold" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
