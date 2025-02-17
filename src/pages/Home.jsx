import factus from "../assets/img/factus.jpg";
import { Dashboard } from "../components/dashboard.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

	return (
	<Dashboard/>
	);
}; 