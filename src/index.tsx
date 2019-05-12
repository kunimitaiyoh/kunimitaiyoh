import App, { AppProps } from "./App";
import * as util from "./util";

declare const DEFINED_BUILD_DATE: string;

(async function() {
  const res = await import(/* webpackChunkName: "resources" */ "./resources");
  const { Instant } = await import(/* webpackChunkName: "js-joda" */  "js-joda");
  const React = await import(/* webpackChunkName: "react" */ "react");
  const ReactDOM = await import(/* webpackChunkName: "react-dom" */ "react-dom");

  const buildDate = Instant.parse(DEFINED_BUILD_DATE);
  const age = util.calculateAge(1990, 12, 21, new Date());
  const queryParams = util.extractQueryParams(window);
  const environment = util.getEnvironment(queryParams, window);
  const resources = await res.getResources(environment.language);
  const props = { buildDate, resources, environment, age };

  const container = document.getElementById("app");
  const render = (props: AppProps) => ReactDOM.render(<App {...props}/>, container);
  render(props);
})();
