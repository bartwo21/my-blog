import LoadingComponent from "@/components/loadingComponent";
import React from "react";

export default function loading() {
  return (
    <div className="flex justify-center items-center h-full my-auto">
      <LoadingComponent />
    </div>
  );
}
