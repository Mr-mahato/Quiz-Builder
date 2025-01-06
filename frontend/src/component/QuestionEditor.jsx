import { useState } from "react";
import { useEditor } from "../hooks/UseEditor";

import Mcq from "./Mcq";
import { Card, CardContent } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import EditorTool from "./EditorTool";

const Section = {
  id: "3",
  passage: "",
  questions: [
    {
      id: "3.1",
      type: "MCQ",
      stem: "According to the passage, one key feature of the water cycle is that:",
      options: [
        {
          id: "1",
          text: "Water evaporates from the surface into the atmosphere.",
          isCorrect: true,
        },
        {
          id: "2",
          text: "Water only exists in liquid form.",
          isCorrect: false,
        },
        {
          id: "3",
          text: "Water moves from the surface to deep underground.",
          isCorrect: false,
        },
        {
          id: "4",
          text: "Water remains in the clouds forever.",
          isCorrect: false,
        },
      ],
    },
  ],
};

function QuestionEditor() {
  const [section, setSection] = useState(Section);
  const { content, setContent, handleBold, handleItalic } = useEditor();

  const handleAnswerSelect = (questionId, optionId) => {
    setSection((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((o) => ({
                ...o,
                isCorrect: o.id === optionId,
              })),
            }
          : q
      ),
    }));
  };

  const handleQuestionDelete = (questionId) => {
    setSection((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== questionId),
    }));
  };

  const handleQuestionDuplicate = (questionId) => {
    setSection((prev) => {
      const questionToDuplicate = prev.questions.find(
        (q) => q.id === questionId
      );
      if (!questionToDuplicate) return prev;

      const newQuestion = {
        ...questionToDuplicate,
        id: `${questionId}-copy`,
      };

      return {
        ...prev,
        questions: [...prev.questions, newQuestion],
      };
    });
  };

  return (
    <Card className="max-w-7xl mt-10 mx-auto">
      <div className="text-lg ml-6 mt-2 font-medium text-muted-foreground">
        Question 3
      </div>
      <CardContent className="p-6 space-y-6 ">
        <div className="grid grid-cols-3">
          <div className="space-y-2 col-start-1 col-span-2">
            <Textarea
              placeholder="Type passage here"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="place-self-center">
            <h1 className="font-semibold">Comprehension ?</h1>
            <p className="text-neutral-800 ">points</p>
            <div className="w-[6em] h-[3em] border rounded-md "></div>
          </div>
        </div>

        <div className="space-y-4">
          {section.questions.map((question) => (
            <Mcq
              key={question.id}
              question={question}
              onAnswerSelect={(optionId) =>
                handleAnswerSelect(question.id, optionId)
              }
              onDelete={() => handleQuestionDelete(question.id)}
              onDuplicate={() => handleQuestionDuplicate(question.id)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default QuestionEditor;
