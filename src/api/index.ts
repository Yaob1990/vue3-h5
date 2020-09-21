import { get, post } from "./http";

function queryStage() {
  return get("/queryBooleanStart");
}

function setStart() {
  return get("/start");
}

function setEnd() {
  return get("/end");
}

function reset() {
  return get("/reset");
}

export { setStart, setEnd, queryStage, reset };
