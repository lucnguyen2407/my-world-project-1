import { Pagination } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { getAllArticles } from "../../store/article/article.slice";
import { useAppDispatch } from "./../../app/hooks";

export interface IContainerProps {}

export default function Container(props: IContainerProps) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.article.loading);
  const article = useAppSelector((state) => state.userAuth.isLoading);
  return (
    <div>
      <nav className="my-3 " aria-label="View posts by">
        <ul className="flex gap-3">
          <li className="default-page shadow-md">
            <NavLink
              data-text="Relevant"
              to="relevan"
              className="crayons-navigation__item crayons-navigation__item--current"
              aria-current="page"
              onClick={() => dispatch(getAllArticles({}))}
            >
              Relevant
            </NavLink>
          </li>
          <li className="default-page  shadow-md">
            <NavLink
              data-text="Latest"
              to="latest"
              className="crayons-navigation__item "
            >
              Latest
            </NavLink>
          </li>
          <li className="default-page  shadow-md">
            <NavLink
              data-text="Top"
              to="top"
              className="crayons-navigation__item "
            >
              Top
            </NavLink>
          </li>
        </ul>
      </nav>
      {loading || article ? (
        <div className="box-border PageContainer-loading ">
          <div className="wrapper">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <span>Loading</span>
          </div>
        </div>
      ) : (
        <Outlet />
      )}

      {/* <Relevant /> */}
    </div>
  );
}
