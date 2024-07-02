import React from "react";

export const ErrorComponent: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-incorrect-class p-4">
        This should have a background color, but the class is incorrect.
      </div>
    </div>
  );
};
