'use client'

import { TableData } from "@/lib/Data";
import React from "react";

export default function Table() {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        {TableData?.map((item: any, index: any) => (
          <tbody key={index}>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>{item?.name}</td>
              <td>{item?.email}</td>
              <td><button className="btn btn-sm bg-red-600 text-white">Block</button></td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
