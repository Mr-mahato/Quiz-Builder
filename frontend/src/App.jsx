import { useState } from "react";
import Category from "./component/Category";
import ClozeQuestion from "./component/ClozeQuestion";
import QuestionEditor from "./component/QuestionEditor";
function App() {
  return (
    <div className="">
      <h1>Quiz Name</h1>
      <Category/>
      <ClozeQuestion/>
      <QuestionEditor/>
    </div>
  );
}
export default App;
