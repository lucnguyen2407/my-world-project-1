import * as React from "react";
import "./footer.scss";

export interface IFooterProps {}

export default function Footer(props: IFooterProps) {
  return (
    <>
      <footer style={{ marginTop: 20 }}>
        <div>
          <div>
            <p>
              <a
                className="c-link fw-medium text-blue-700 hover:text-blue-800"
                aria-label="DEV Community 👩‍💻👨‍💻 Home"
                href="/"
              >
                DEV Community 👩‍💻👨‍💻
              </a>{" "}
              — A constructive and inclusive social network for software
              developers. With you every step of your journey.
            </p>
            <p className="MuiTypography-root MuiTypography-body1 css-9l3uo3">
              Built on{" "}
              <span className="c-link text-blue-600 hover:text-blue-700">
                Forem
              </span>{" "}
              — the{" "}
              <span className="c-link text-blue-600 hover:text-blue-700">
                open source
              </span>{" "}
              software that powers{" "}
              <span className="c-link text-blue-600 hover:text-blue-700">
                DEV
              </span>{" "}
              and other inclusive communities.
            </p>
            <p className="MuiTypography-root MuiTypography-body1 css-9l3uo3">
              Made with love by{" "}
              <span className="c-link text-red-500 hover:text-blue-700">
                {" "}
                TungCS, LucNT9, QuangDM3
              </span>
              . DEV Community 👩‍💻👨‍💻👨‍💻 © 2022.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
