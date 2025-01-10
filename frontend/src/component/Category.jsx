import React, { useEffect, useRef, useState } from "react";
import ListCategory from "./ListCategory";
import { Plus, Trash2 } from "lucide-react";
function Category() {
  const [categoryNumber, setCategoryNumber] = useState(1); // store how many category to render
  const [TotalCategories, setTotalCategories] = useState([]);
  const [readOnlyInputs, setReadOnlyInputs] = useState([]); // these are readonly inputs
  const [categoryBelonging, setCategoryBelonging] = useState("");
  // const [categoryData, setCategoryData] = useState([]); // holds the category lik

  const [items, setItems] = useState([{ value: "", category: "" }]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const catInputRef = useRef(null);
  const catItemRef = useRef(null);




  /*
  totalCategories
        {
          "index": 0,
          "categories": [
            {
              "category": "animal",
              "data": []
            },
            {
              "category": "fruits",
              "data": []
            }
          ]
        }
  */

  const handleCategoryAdd = (e, index) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      console.log(catInputRef.current.value);
      const categoryTypeInput = catInputRef.current.value;
      const toBeStoredObj = {
        index,
        categories: [
          {
            category: categoryTypeInput,
            data: [],
          },
        ],
      };
      catInputRef.current.value = "";

     
      const catInd = TotalCategories?.findIndex((val) => val.index == index);
      console.log(catInd);
      if (catInd == -1) {
        setTotalCategories([...TotalCategories, toBeStoredObj]);
      } else {
        // already exist lets update the data
        const newCategories = [...TotalCategories];
        newCategories[catInd].categories.push({
          category: categoryTypeInput,
          data: [],
        });

        setTotalCategories(newCategories);
      }
    }
  };
  const handleCatItemAdd = (categoryValue , catModelIndex) => {
    if ( catItemRef.current.value != " ") {
      const catItem = catItemRef.current.value;
      const totalCatIndex = TotalCategories.findIndex(item => item.index == catModelIndex);
      console.log(totalCatIndex);

      let toBeUpdateObj = {...TotalCategories[totalCatIndex]};
      toBeUpdateObj = toBeUpdateObj.categories.filter((item)=>{ // updating the content of hte toatalcategory
        if(item.category == categoryValue){
          item.data = [...item.data , catItem];
        }
        return item;
      })
      
      const rlObj = {...TotalCategories[totalCatIndex] , categories:toBeUpdateObj};
      
      console.log("This is the object to be update",rlObj)
      const dummyTotalCategories = [...TotalCategories];
      dummyTotalCategories[totalCatIndex] = rlObj;
      console.log("dummy",dummyTotalCategories);

    console.log(TotalCategories);

    }
  };
  const addItem = (e)=>{ //adding item to the item_list
    if(e.key == "Enter"){
      console.log("enter key")
      setItems(prev => [...prev , {value:catItemRef.current.value}]);
    }
  }

  return (
    <div className="max-w-7xl mt-20 border-2 p-2 gap-2 rounded-md mx-auto flex justify-between">
      {/* whats the uniqe thing here */}
      <div className="flex flex-1 flex-col gap-2">
        {Array.from({ length: categoryNumber }).map((_, index) => {
          const categoryModelCategory = TotalCategories?.find(
            (item) => item.index == index
          );
          return (
            <div
              key={index}
              className="grid grid-cols-3 border p-2 rounded-md flex-1"
            >
              <div className="col-start-1 mt-4 col-span-2">
                <h1>Question-{index + 1}</h1>
                {/* category name */}
                <input
                  type="text"
                  placeholder="Description (Optional)"
                  className="p-2 w-full border-2 outline-none rounded-md border-gray-600"
                />

                {/* categorize section  */}
                <div className="flex flex-col w-3/12 gap-2">
                  <h1 className="text-lg mt-5">Categories</h1>
                  {/* why this way */}
                  <input
                    type="text"
                    className="border border-gray-400 text-neutral-600 font-semibold outline-none rounded-md p-1"
                    placeholder={` category ${0} (optional)`}
                    ref={catInputRef}
                    // value={categoryTypeInput}
                    // onChange={(e) => setCategoryTypeInput(e.target.value)}
                    onKeyDown={(e) => handleCategoryAdd(e, index)}
                    readOnly={readOnlyInputs.includes(index)}
                  />

                  <div className="flex flex-col gap-2">
                    {categoryModelCategory?.categories.map((cD, cDIdx) => {
                      return (
                        <div className="flex gap--2">
                          <div className="w-full border p-2 rounded-md">
                           <p>{cD.category}</p>
                          </div>
                          <button
                            onClick={() => handleInputDelete(index)}
                            className="self-center  p-2 rounded-md font-bold cursor-pointer"
                          >
                            X
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  {/* categoryModelCategory */}
                </div>

                {/* WORKING CURRENTLY */}
                {/* <div className="grid grid-cols-3 gap-2 mt-10 pb-4">
                  <div className="">
                    <h1 className="self-center text-xl">Items</h1>
                    <input
                      type="text"
                      placeholder="Input your category selection"
                      ref={catItemRef}
                      onKeyDown={(e)=> handleCatItemAdd(e)}
                      className="outline-none p-2 border rounded-md"
                    />
                  </div>
                  <div className="">
                    <h1 className=" text-xl">Belongs to</h1>
                    <select name="itemBelong" id="itemBelong" className="outline-none text-center p-2 rounded-md bg-neutral-200" >
                      <option value="" disabled selected >Choose Category</option>
                      {categoryData.map((catData,idx)=>{
                        if(catData.catModel == index){
                          return(
                            <option>{catData.category}</option>
                          )
                        }
                      })}
                      <option value=""></option>
                    </select>
                  </div>
                </div> */}
                <div className="grid grid-cols-3 gap-2 mt-10 pb-4">
                  <div className="flex flex-col gap-2">
                    <h1 className="self-center text-xl">Items</h1>
                    {items.map((item, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Input your category selection"
                          ref={catItemRef}
                          onKeyDown={(e)=>addItem(e)}
                          className="outline-none p-2 border rounded-md"
                        />
                        <select
                          onChange={(e) => {
                            // const newItems = [...items];
                            // newItems[idx].category = e.target.value;
                            // setItems(newItems);
                            handleCatItemAdd(e.target.value , index);
                          }}
                          className="outline-none text-center p-2 rounded-md bg-neutral-200"
                        >
                          <option value=""selected disabled>
                            Choose Category
                          </option>
                          {categoryModelCategory?.categories.map(
                            (catData, idx) =>
                                <option key={idx} value={catData.category}>
                                  {catData.category}
                                </option>
                          )}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                {/* here would be th input of the category */}
              </div>

              {/* point category section */}
              <div className="p-3 place-self-center">
                <h1 className="font-semibold">Categorize ?</h1>
                <p className="text-neutral-600">Points</p>
                <div className="w-[6em] h-[3em] border rounded-md "></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* button for adding the component again */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col justify-center bg-neutral-800 p-2 rounded-full h-5 w-5 items-center">
          <button
            onClick={() => setCategoryNumber((prev) => prev + 1)}
            className=" p-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-white text-xl font-bold" />
          </button>
        </div>

        <div className="flex flex-col justify-center bg-neutral-100 p-2 rounded-full h-5 w-5 items-center">
          <button
            onClick={() => {
              if (categoryNumber != 1) {
                setCategoryNumber((prev) => prev - 1);
              }
            }}
            className=" p-2 cursor-pointer"
          >
            <Trash2 className="w-4 h-4  text-xl font-bold" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Category;
