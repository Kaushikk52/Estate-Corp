import { useParams } from "react-router-dom";
import Table from "./Table";

export default function Listing() {
  const {type,category} = useParams<{type:string,category:string}>();
  return (
    <>
      <Table pageType={type} pageCategory={category} />
    </>
  );
}

