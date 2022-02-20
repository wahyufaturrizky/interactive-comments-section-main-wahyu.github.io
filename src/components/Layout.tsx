import { ReactNode } from "react";

import "style/Layout.css";

interface LayoutPropsInterface {
  children: ReactNode;
}
const Layout = (props: LayoutPropsInterface) => {
  return (
    <div>
      <div className="container-layout">{props.children}</div>
    </div>
  );
};

export default Layout;
