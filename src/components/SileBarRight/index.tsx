import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import { NavLink } from "react-router-dom";
import FillterTag from "./filterTag";
export interface ISileBarRightProps {}

export default function SileBarRight(props: ISileBarRightProps) {
  return (
    <>
      <div>
        <div className="hidden lg:block sidebar-right">
          <div className="text-center p-4 rounded-[10px] border bg-[#fafafa] mb-5">
            <div className="p-4 rounded-lg  flex justify-center gap-4 items-center bg-[#caccfa]">
              <div>
                <img
                  className="w-[100px]"
                  src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                  alt=""
                />
              </div>
              <h3 className="mb-4 text-center">
                <a href="/" className="color-base">
                  Satisfaction <br /> Survey
                </a>{" "}
              </h3>
            </div>
            <h4 className=" m-4">Tell us your thoughts about DEV!</h4>
            <h5 className="text-[#0d6efd] font-bold">
              <a href="./">→ Take the DEV Satisfaction Survey</a>
            </h5>
          </div>
          <FillterTag />
          <div className="  rounded-[10px] border bg-[#fafafa]">
            <div className="p-4 flex justify-between items-center border-b">
              <h3 className="">Listings</h3>
              <div className="color-base font-medium">
                <a
                  href="/listings"
                  className="crayons-link--branded fw-medium fs-s"
                >
                  See all
                </a>
              </div>
            </div>
            <div className="Listings-style p-4 flex justify-start cursor-pointer ">
              <a className="" href="/">
                <div>Web Weekly Newsletter</div>
                <div className="text-[#9a9a9a]">education</div>
              </a>
            </div>
            <div className="Listings-style p-4 flex justify-start cursor-pointer ">
              <a className="" href="/">
                <div>Web Weekly Newsletter</div>
                <div className="text-[#9a9a9a]">education</div>
              </a>
            </div>
            <div className="Listings-style p-4 flex justify-start cursor-pointer ">
              <a className="" href="/">
                <div>Web Weekly Newsletter</div>
                <div className="text-[#9a9a9a]">education</div>
              </a>
            </div>
            <div className="Listings-style p-4 flex justify-start cursor-pointer ">
              <a className="" href="/">
                <div>Web Weekly Newsletter</div>
                <div className="text-[#9a9a9a]">education</div>
              </a>
            </div>
            <div className="">
              <div className="p-3 border-t text-center color-base font-medium">
                <a href="/listings">Create a Listing</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
