import { useState } from "react";
import Filter from "./Component/Filter";
import Graph from "./Component/Graph";
import Table from "./Component/Table";

function App() {
  const [machine, setMachine] = useState("p1");
  const [data, setData] = useState([]);

  console.log(data);
  return (
    <div className="">
      <Filter setData={setData} machine={machine} setMachine={setMachine} />
      <div className="w-full flex flex-col justify-between align-middle content-center self-center items-center px-10 gap-2">
        <div className=" w-full h-full">
          <Table data={data} machine={machine} />
        </div>
        <div className=" w-full h-full">
          <Graph />
        </div>
      </div>
    </div>
  );
}

export default App;
