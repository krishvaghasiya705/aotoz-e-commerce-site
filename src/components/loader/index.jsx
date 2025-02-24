import { Skeleton } from "@mui/material";
import React from "react";

export default function Loader() {
    return (
        <div className="flex flex-col md:flex-row border p-6 m-6 shadow-lg rounded-lg bg-white">
            <div className="w-full md:w-1/3 relative mb-6 md:mb-0 h-[600px] rounded-[20px] shadow-lg border overflow-hidden">
                <div className="scale-[2] w-full h-full">
                    <Skeleton animation={"wave"} width={"100%"} height={"100%"} />
                </div>
            </div>
            <div className="w-full md:w-2/3 pl-0 md:pl-6">
                <Skeleton width={"100%"} height={45}/>
                <Skeleton width={"100%"} />
                <Skeleton width={"100%"} />
                <Skeleton width={"10%"} />
                <Skeleton width={"10%"} />
                <Skeleton width={"10%"} />
                <Skeleton width={"10%"} />
                <Skeleton width={"10%"} />
                <Skeleton width={"10%"} height={60} />
            </div>
        </div >
    );
}
