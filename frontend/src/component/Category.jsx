import React, { useState } from "react";
import ListCategory from "./ListCategory";

function Category() {
  const [categories, setCategories] = useState([""]);
  const [readOnlyInputs, setReadOnlyInputs] = useState([]);
  const [categoriesAns, setCategoriesAns] = useState([""]);

  const handleKeyPress = (e, index) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      const newCategories = [...categories];
      newCategories[index] = e.target.value;
      setCategories([...newCategories, ""]);
      setReadOnlyInputs([...readOnlyInputs, index]);
    }
  };
  const handleInputItemKeyPress = (e, index) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      const newCategories = [...categoriesAns];
      newCategories[index] = e.target.value;
      setCategoriesAns([...newCategories, ""]);
      setReadOnlyInputs([...readOnlyInputs, index]);
    }
  };

  const handleIntemInputDelete = (ind) => {
    if (categoriesAns.length == 1) {
      return;
    }
    let newCateAns = categoriesAns.filter((val, i) => ind != i);
    setCategoriesAns(newCateAns);
    //   setReadOnlyInputs(readOnlyInputs.filter((i) => i !== ind));
  };

  const handleInputDelete = (ind) => {
    if (categories.length == 1 || categories[ind] == "") {
      return;
    }
    let newCate = categories.filter((val, i) => ind != i);
    setCategories(newCate);
    setReadOnlyInputs(readOnlyInputs.filter((i) => i !== ind));
  };

  return (
    <div className="max-w-7xl mt-20 border-2 p-2 rounded-md mx-auto grid grid-cols-3">
      <div className="col-start-1 col-span-2">
        <h1>Question-1</h1>
        <input
          type="text"
          placeholder="Description (Optional)"
          className="p-2 w-full border-2 outline-none rounded-md border-gray-600"
        />

        {/* categorize section  */}
        <h1>Categories</h1>
        <div className="flex flex-col gap-2">
          {categories.map((category, index) => (
            <div key={index} className="p-1 flex  gap-2">
              <input
                type="text"
                className="border border-gray-400 text-neutral-600 font-semibold outline-none rounded-md p-1"
                placeholder={` category ${categories.length} (optional)`}
                value={category}
                onChange={(e) => {
                  const newCategories = [...categories];
                  newCategories[index] = e.target.value;
                  setCategories(newCategories);
                }}
                onKeyDown={(e) => handleKeyPress(e, index)}
                readOnly={readOnlyInputs.includes(index)}
              />
              <button
                onClick={() => handleInputDelete(index)}
                className="self-center  p-2 rounded-md font-bold cursor-pointer"
              >
                X
              </button>
            </div>
          ))}
        </div>

        <div className="flex mt-10 gap-60">
          <h1>Category</h1>
          <h1>Belongs to</h1>
        </div>
        {categories.length > 1 && (
          <div>
            <div className="col-start-1 col-span-2">
              {/* Item section  */}

              <div className="flex flex-col gap-2">
                {categoriesAns.map((catAns, index) => {
                  return (
                    <div className="flex gap-10">
                      <div key={index} className="p-1 flex  gap-2">
                        <input
                          type="text"
                          className="border border-gray-400 text-neutral-600 font-semibold outline-none rounded-md p-1"
                          placeholder={`Item ${categoriesAns.length} (optional)`}
                          value={catAns}
                          onChange={(e) => {
                            const newCategories = [...categoriesAns];
                            newCategories[index] = e.target.value;
                            setCategoriesAns(newCategories);
                          }}
                          onKeyDown={(e) => handleInputItemKeyPress(e, index)}
                        />
                        <button
                          onClick={() => handleIntemInputDelete(index)}
                          className="self-center  p-2 rounded-md font-bold cursor-pointer"
                        >
                          X
                        </button>
                      </div>
                      {/* this is for the category selection */}

                      <div>
                        <ListCategory Category={categories} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* point category section */}
      <div className="p-3 place-self-center">
        <h1 className="font-semibold">Categorize ?</h1>
        <p className="text-neutral-600">Points</p>
        <div className="w-[6em] h-[3em] border rounded-md "></div>
      </div>
    </div>
  );
}

export default Category;
