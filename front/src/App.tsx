import { useState } from "react";
import Layout from "./lib/Layout/layout";
import { List } from "./lib/list";
import ManegeLayout from "./lib/Layout/manegelayout";
import { useBreakPoint } from "./CustomHook/BreakPoint";
import MobileLayout from "./lib/Layout/mobilelayout";

const App = (): JSX.Element => {
  const { ismobile, isdesktop } = useBreakPoint();
  const [page, setPage] = useState("/");
  const ManegePage = (): void => {
    setPage("/manege");
  };
  const MainPage = (): void => {
    setPage("/");
  };

  const [main, setMain] = useState([
    new List(1, "자전거", "hamster", 3000, 2024),
    new List(1, "자전거", "hamster", 3000, 2024),
    new List(1, "자전거", "hamster", 3000, 2024),
    new List(1, "자전거", "hamster", 3000, 2024),
    new List(1, "자전거", "hamster", 3000, 2024),
    new List(1, "자전거", "hamster", 3000, 2024),
    new List(1, "자전거", "hamster", 3000, 2024),
    new List(1, "자전거", "hamster", 3000, 2024),
  ]);

  const [catepage, setCatePage] = useState([
    new List(1, "자동차", "good", 3000, 3),
  ]);

  const [searchpage, setSearchPage] = useState([
    new List(1, "햄스터", "hamster", 3000, 3),
  ]);

  const userlogin = true;
  return (
    <div>
      {isdesktop && (
        <div>
          {page == "/" ? (
            <Layout
              setpage={ManegePage}
              userlogin={userlogin}
              main={main}
              catepage={catepage}
              searchpage={searchpage}
            />
          ) : page == "/manege" ? (
            <ManegeLayout setpage={MainPage} />
          ) : (
            ""
          )}
        </div>
      )}
      {ismobile && <MobileLayout />}
    </div>
  );
};

export default App;
