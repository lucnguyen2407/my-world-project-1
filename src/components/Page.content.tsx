import { useAppSelector } from "../app/hooks";
import Container from "./container";
import SileBarLeft from "./SileBarLeft";
import SileBarRight from "./SileBarRight";
import "./../style/loading.scss";
import Reponsive from "./Reponsive/reponsive";

export interface IPageContentProps {}

export default function PageContent(props: IPageContentProps) {
  return (
    <>
      <Reponsive />
      <div className="default_PageContent h-auto w-full ">
        <div className="container mx-auto  ">
          <div className="box-border LayOut_PageContainer md:grid-cols-[265px_2fr] lg:grid-cols-[265px_2fr_1fr] grid-cols-1">
            <SileBarLeft />
            <Container />
            <SileBarRight />
          </div>
        </div>
      </div>
    </>
  );
}
