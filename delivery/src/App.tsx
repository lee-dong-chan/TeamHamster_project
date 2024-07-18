import { CookiesProvider } from "react-cookie";
import LayOut from "./lib/layout";

const App = (): JSX.Element => {
  return (
    <CookiesProvider>
      <div>
        <LayOut />
      </div>
    </CookiesProvider>
  );
};

export default App;
