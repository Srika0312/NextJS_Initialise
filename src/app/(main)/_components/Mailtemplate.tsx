"use client";

import React from "react";

export default function Mailtemplate() {
  return (
    <div className="w-full flex items-center justify-center bg-slate-400/10">
      <div className="w-1/2 bg-slate-400/40 p-4 font-family: Arial, sans-serif; padding: 20px;">
        <h3 className="font-semibold">Stellarian</h3>
        <div className="w-full flex flex-col items-center">
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src="https://cdn-1.motorsport.com/images/mgl/YEQ1pGwY/s200/lewis-hamilton-mercedes.webp" />
              </div>
            </div>
            <strong>Lewis Hamelton</strong>
          </div>
          <p className="">
            <strong>Lewis Hamelton</strong> has invited you to be friends with
            <strong> Stellar Community</strong>
          </p>
          <button className="btn background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Accept The Invite
          </button>
          <button className="btn btn-sm">View Profile</button>
          <p>
            Thanks,
            <br />
            Stellar team
          </p>
          <hr />
          <p className="font-size: 12px; color: grey; w-1/2">
            Stellar Community helps friends connect, organize, and strengthen
            their bonds effortlessly. From event planning to support, it makes
            managing friendships simple.
          </p>
        </div>
      </div>
    </div>
  );
}
