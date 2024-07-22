import { useState } from "react";
import Layout from "./lib/Layout/layout";
import { List } from "./lib/list";

const App = (): JSX.Element => {
  const [main, setMain] = useState([
    new List(1, "자전거", "hamster", 3000, 2024),
    new List(2, "자전", "hamster", 3000, 2024),
    new List(3, "자전거", "hamster", 3000, 2024),
    new List(4, "자전거", "hamster", 3000, 2024),
    new List(5, "자전거", "hamster", 3000, 2024),
    new List(6, "자전거", "hamster", 3000, 2024),
    new List(7, "자전거", "hamster", 3000, 2024),
    new List(8, "자전거", "hamster", 3000, 2024),
  ]);

  const [catepage, setCatePage] = useState([
    new List(1, "자동차", "good", 3000, 3),
  ]);

  const [searchpage, setSearchPage] = useState([
    new List(1, "햄스터", "hamster", 3000, 3),
  ]);

  const userlogin = false;
  return (
    <div>
      <div>
        <Layout
          userlogin={userlogin}
          main={main}
          catepage={catepage}
          searchpage={searchpage}
        />
      </div>
    </div>
  );
};

export default App;
