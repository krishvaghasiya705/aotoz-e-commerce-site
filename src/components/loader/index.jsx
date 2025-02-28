import { Skeleton } from "@mui/material";
import React from "react";

export default function Loader() {
  return (
    <div className="container mx-auto p-4">
      <div className="border shadow-lg mb-5 rounded-lg bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 p-6 gap-6">
          <div className="w-full grid grid-cols-[50px_1fr] gap-2.5">
            <div>
              <div className="flex flex-col gap-2.5 sticky top-[80px] left-0">
                <div className="w-[40px] h-[40px] rounded-lg overflow-hidden">
                  <Skeleton width={40} height={40} className="!scale-[1.5]" />
                </div>
                <div className="w-[40px] h-[40px] rounded-lg overflow-hidden">
                  <Skeleton width={40} height={40} className="!scale-[1.5]" />
                </div>
                <div className="w-[40px] h-[40px] rounded-lg overflow-hidden">
                  <Skeleton width={40} height={40} className="!scale-[1.5]" />
                </div>
                <div className="w-[40px] h-[40px] rounded-lg overflow-hidden">
                  <Skeleton width={40} height={40} className="!scale-[1.5]" />
                </div>
                <div className="w-[40px] h-[40px] rounded-lg overflow-hidden">
                  <Skeleton width={40} height={40} className="!scale-[1.5]" />
                </div>
                <div className="w-[40px] h-[40px] rounded-lg overflow-hidden">
                  <Skeleton width={40} height={40} className="!scale-[1.5]" />
                </div>
                <div className="w-[40px] h-[40px] rounded-lg overflow-hidden">
                  <Skeleton width={40} height={40} className="!scale-[1.5]" />
                </div>
                <div className="w-[40px] h-[40px] rounded-lg overflow-hidden">
                  <Skeleton width={40} height={40} className="!scale-[1.5]" />
                </div>
                <div className="w-[40px] h-[40px] rounded-lg overflow-hidden">
                  <Skeleton width={40} height={40} className="!scale-[1.5]" />
                </div>
                <div className="w-[40px] h-[40px] rounded-lg overflow-hidden">
                  <Skeleton width={40} height={40} className="!scale-[1.5]" />
                </div>
                <div className="w-[40px] h-[40px] rounded-lg overflow-hidden">
                  <Skeleton width={40} height={40} className="!scale-[1.5]" />
                </div>
                <div className="w-[40px] h-[40px] rounded-lg overflow-hidden">
                  <Skeleton width={40} height={40} className="!scale-[1.5]" />
                </div>
              </div>
            </div>
            <div className="w-full relative mb-6 md:mb-0 h-[400px] md:h-[600px] rounded-lg shadow-lg border bg-gray-200">
              <Skeleton variant="rectangular" width="100%" height="100%" />
            </div>
          </div>
          <div>
            <div className="w-full pl-0 md:pl-6 sticky top-[80px] left-0 font-roboto">
              <h1 className="text-3xl font-bold mb-2 text-gray-800">
                <Skeleton width={"100%"} height={20} />
              </h1>
              <p className="text-lg mb-4 font-roboto text-gray-600">
                <Skeleton width={"100%"} height={20} />
                <Skeleton width={"100%"} height={20} />
                <Skeleton width={"50%"} height={20} />
              </p>
              <div className="flex items-end gap-2.5 mb-4 font-roboto border-t pt-5">
                <span className="text-[20px] text-red-600 font-semibold w-1/5">
                  <Skeleton width={"100%"} height={30} />
                </span>
                <span className="text-2xl text-black font-bold w-1/5">
                  <Skeleton width={"100%"} height={30} />
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-2.5 w-[30%]">
                  <Skeleton width={"100%"} height={30} />
                </div>
                <div className="flex items-center gap-2.5 w-[15%]">
                  <Skeleton width={"100%"} height={30} />
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-full">
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-gray-700 w-[10%]">
                      <Skeleton width={"100%"} height={30} />
                    </span>
                    <div className="flex items-center gap-1 w-1/5">
                      <Skeleton width={"100%"} height={30} />
                    </div>
                  </div>
                  <Skeleton width={"20%"} height={30} />
                  <Skeleton width={"30%"} height={50} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] py-5 gap-6 border shadow-lg rounded-lg bg-white">
        <div>
          <div className="px-5 sticky top-[73px] left-0">
            <Skeleton width={"40%"} height={30} />
            <div className="flex items-center gap-5">
              <Skeleton width={"20%"} height={30} />
              <Skeleton width={"20%"} height={30} />
            </div>
            <Skeleton width={"25%"} height={30} />
            <div className="flex flex-col gap-5 mt-5">
              <div className="flex items-center gap-2.5">
                <Skeleton width={"10%"} height={30} />
                <Skeleton width={"100%"} height={30} />
                <Skeleton width={"10%"} height={30} />
              </div>
            </div>
          </div>
        </div>
        <div className="pr-5">
          <Skeleton width={"20%"} height={30} />
          <div className="flex flex-col gap-5">
            <div className="border-b pb-4 last:border-b-0">
              <Skeleton width={"100%"} height={30} />
              <div className="flex items-center gap-2.5">
                <Skeleton width={"20%"} height={30} />
                <Skeleton width={"20%"} height={30} />
              </div>
              <span className="text-sm leading-6 font-normal font-roboto">
                <Skeleton width={"25%"} height={30} />
                <Skeleton width={"20%"} height={30} />
              </span>
              <p className="text-sm leading-6 font-normal font-roboto">
                <Skeleton width={"100%"} height={20} />
                <Skeleton width={"100%"} height={20} />
                <Skeleton width={"50%"} height={20} />
              </p>
            </div>
            <div className="border-b pb-4 last:border-b-0">
              <Skeleton width={"100%"} height={30} />
              <div className="flex items-center gap-2.5">
                <Skeleton width={"20%"} height={30} />
                <Skeleton width={"20%"} height={30} />
              </div>
              <span className="text-sm leading-6 font-normal font-roboto">
                <Skeleton width={"25%"} height={30} />
                <Skeleton width={"20%"} height={30} />
              </span>
              <p className="text-sm leading-6 font-normal font-roboto">
                <Skeleton width={"100%"} height={20} />
                <Skeleton width={"100%"} height={20} />
                <Skeleton width={"50%"} height={20} />
              </p>
            </div>
            <div className="border-b pb-4 last:border-b-0">
              <Skeleton width={"100%"} height={30} />
              <div className="flex items-center gap-2.5">
                <Skeleton width={"20%"} height={30} />
                <Skeleton width={"20%"} height={30} />
              </div>
              <span className="text-sm leading-6 font-normal font-roboto">
                <Skeleton width={"25%"} height={30} />
                <Skeleton width={"20%"} height={30} />
              </span>
              <p className="text-sm leading-6 font-normal font-roboto">
                <Skeleton width={"100%"} height={20} />
                <Skeleton width={"100%"} height={20} />
                <Skeleton width={"50%"} height={20} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
