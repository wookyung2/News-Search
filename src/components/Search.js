import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addClip, getList, keywordUpdate } from "../newsSlice";

export default function Search() {
  const [value, setValue] = useState("");
  const timer = useRef(null);

  const dispatch = useDispatch();
  const articleList = useSelector((state) => state.articles);
  const keywordList = useSelector((state) => state.keywords);
  const clipList = useSelector((state) => state.clipes);

  //마지막 검색 후 2초동안 추가 검색 없으면 기사 불러오기
  const onChange = (e) => {
    clearTimeout(timer.current);
    setValue(e.target.value);
    timer.current = setTimeout(() => {
      if (e.target.value) {
        dispatch(getList({ value: e.target.value }));
      } else alert("검색어 입력해주세요");
    }, 2000);
  };

  //Submit 함수
  const onSubmit = (e) => {
    e.preventDefault();
    clearTimeout(timer.current);
    dispatch(getList({ value: value }));
    dispatch(keywordUpdate(value));
    setValue("");
  };

  return (
    <div>
      <button>Clip기사만 보기</button>
      <ul>
        {[...clipList].map((item) => (
          <>
            <li>{item.headline.main}</li>
            <button onClick={() => dispatch(addClip(item))}>삭제</button>
          </>
        ))}
      </ul>
      {/* input */}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={value}
          placeholder="search..."
          onChange={onChange}
        />
      </form>
      {/* dropdown박스 */}
      <ul>
        {[...keywordList].reverse().map((keyword, i) => (
          <>
            <li key={i}>{keyword}</li>
          </>
        ))}
      </ul>
      {/* 기사 헤드라인과 클립버튼 불러오기 */}
      <ul>
        {articleList.map((e, i) => (
          <>
            <li key={e._id}>
              <a
                href={e.web_url}
                target="_blank"
                rel="noreferrer"
                title="Detail view">
                {e.headline.main}
              </a>
            </li>

            <button key={i} onClick={() => dispatch(addClip(e))}>
              Clip
            </button>
          </>
        ))}
      </ul>
    </div>
  );
}
