import {Link} from "react-router-dom";



const Home = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Assignment AI Builder</h1>

      <Link to ="/upload">
      <button className="bg-blue-300 rounded-lg hover:bg-blue-400 p-3 mt-5">
      START
      </button>
      </Link>
    </div>
  );
}

export default Home;