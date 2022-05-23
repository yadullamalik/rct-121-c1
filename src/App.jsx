import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import CandidateCard from "./components/CandidateCard";
import "./styles.css";
import axios from "axios";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("ASC");

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://json-server-mocker-masai.herokuapp.com/candidates?_page=${page}&_limit=5?_sort="salary"&_order=${order}`
        // `http://localhost:3005/candidates?_page=${page}&_limit=5?_sort=salary&_order=${order}`
      )
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((e) => {
        setErr(true);
        console.log("e:", e);
      });
  }, [page, order]);
  const handlePage = (e) => {
    setPage(page + e);
  };
  const handleOrder = () => {
    if (order === "ASC") {
      setOrder("DESC");
    } else {
      setOrder("ASC");
    }
  };
  return (
    <div className="App">
      <div>
        <div id="loading-container">{loading ? "...Loading" : null}</div>
        <Button
          id="SORT_BUTTON"
          title={
            order === "ASC"
              ? `Sort by Descending Salary`
              : `Sort by Ascending Salary`
          }
          onClick={handleOrder}
        />
        <Button
          title="PREV"
          id="PREV"
          onClick={() => handlePage(-1)}
          disabled={page == 1}
        />
        <Button id="NEXT" title="NEXT" onClick={() => handlePage(1)} />
      </div>
      {err
        ? "Something Went Wrong"
        : data.map((item) => {
            return <CandidateCard key={item.id} {...item} />;
          })}
    </div>
  );
}
