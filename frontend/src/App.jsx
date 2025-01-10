import { useState } from "react";
import Category from "./component/Category";
import ClozeQuestion from "./component/ClozeQuestion";
import QuestionEditor from "./component/QuestionEditor";
function App() {
  return (
    <div className="">
      <h1 className="text-2xl text-center font-md">Quiz-form <span className="italic text-sm text-purple-600">Interactive</span></h1>
      <Category/>
      <ClozeQuestion/>
      <QuestionEditor/>
    </div>
  );
}
export default App;
