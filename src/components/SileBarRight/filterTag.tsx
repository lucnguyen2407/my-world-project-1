import * as React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { changeFilterTag } from "../../store/article/article.slice";

export interface IFillterTagProps {}

export default function FillterTag(props: IFillterTagProps) {
  const tagLists = useAppSelector((state) => state.article.tags);
  const [tagName, setTagName] = React.useState("");
  const dispatch = useDispatch();
  const handleClicktag = (tag: string) => {
    setTagName(tag);
    dispatch(changeFilterTag({ tag: tag }));
    console.log(tagName); // setTagName((e)=> e.)
  };

  return (
    <div className=" mb-5 rounded-[10px] border bg-[#fafafa]">
      <div className=" p-4 flex  justify-between items-center border-b">
        <h3 className="crayons-subtitle-3 p-2">Popular Tags</h3>
      </div>

      <div className=" p-4 overflow-y-auto " style={{ maxHeight: "250px" }}>
        {tagLists.map((tag) => (
          <button
            onClick={() => handleClicktag(tag)}
            className="text-left default-navigations cursor-pointer"
            key={uuidv4()}
          >
            <NavLink className="" to="#">
              # {tag}
            </NavLink>
          </button>
        ))}
      </div>
    </div>
  );
}
