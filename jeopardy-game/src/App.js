import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

function App(props) {
  const [category, setCategory] = useState([]);
  // const { category } = props;
  //do 6 different calls (promose all) TODO for categories
  useEffect(() => {
    axios
      .get("http://jservice.io/api/category?id=117")
      .then((response) => {
        console.log(response.data.clues);
        // setCategory(JSON.stringify(response.data.clues));
        setCategory(response.data.clues[0].question);
        console.log(category);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Jeopardy!</h1>
      <table>
        <tr>
          <th>{category}</th>
          {/* {category.clues[0].question} */}
          <th>Lastname</th>
          <th>Age</th>
        </tr>
        <tr>
          <td>Jill</td>
          <td>Smith</td>
          <td>50</td>
        </tr>
        <tr>
          <td>Eve</td>
          <td>Jackson</td>
          <td>94</td>
        </tr>
      </table>
    </div>
  );
}

export default App;
