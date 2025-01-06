import React from "react";

const ListCategory = ({ Category }) => {
  return (
    <div>
      <select defaultValue="" className="p-1 bg-neutral-100 self-center  outline-none w-full">
        <option value="" disabled>
          Select a category
        </option>
        {Category?.map((category, index) => (
          <option className="bg-neutral-100" key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ListCategory;
