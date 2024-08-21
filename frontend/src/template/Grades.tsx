// @ts-ignore
import DynamicTemplate from "../components/DynamicTemplate.tsx";

const Grades = ({ branchName, fetchUrl }) => {
  return <DynamicTemplate branchName={branchName} fetchUrl={fetchUrl} />;
};

export default Grades;
