import type { ReactNode } from "react";

const Category = ({ children }: { children: ReactNode }) => {
  return (
    <div className="border border-gray-500 w-fit py-1 px-2 rounded-xl text-xs  ">
      {children}
    </div>
  );
};

export default Category;
