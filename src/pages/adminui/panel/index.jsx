import React from "react";
import Produpdate from "../proupdatepage";

const AdminPanel = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-8 font-roboto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Admin Dashboard
          </h1>
          <div className="bg-white shadow rounded-lg p-6">
            <Produpdate />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
