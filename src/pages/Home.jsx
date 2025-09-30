import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

	// const {store, dispatch} =useGlobalReducer()
	const [people, setPeople] = useState([]);
	const [planets, setPlanets] = useState([]);
	const [vehicles, setVehicles] = useState([]);


	useEffect(() => {
		fetchFirstPage("people", setPeople);
		fetchFirstPage("planets", setPlanets);
		fetchFirstPage("vehicles", setVehicles)
	}, [])

	const fetchFirstPage = async (type, setter) => {
		try {
			const res = await fetch(`https://www.swapi.tech/api/${type}`);
			const json = await res.json();
			setter(json.results ?? []);
		} catch (e) {
			console.log("fetch error:", e.message);
			setter([]);
		}
	};

	const Card = ({ type, item }) => (
		<div className="card bg-secondary text-white h-100 border-0">
			<img
				className="card-img-top"
				src={`https://picsum.photos/300/300`}
				alt={item.name}
			/>
			<div className="card-body d-flex flex-column">
				<h5 className="card-title">{item.name}</h5>
				<div className="mt-auto d-flex gap-2">
					<Link className="btn btn-outline-light btn-sm" to={`/details/${type}/${item.uid}`}>
						Details
					</Link>
				</div>
			</div>
		</div>
	);

	//carrousel, horizontal scroll
	const Section = ({ title, type, items }) => (
		<section className="mb-4">
			<div className="d-flex align-items-center justify-content-between mb-2">
				<h2 className="h5 text-white m-0">{title}</h2>
				<Link to={`/list/${type}`} className="btn btn-outline-light btn-sm">
					See all →
				</Link>
			</div>
			<div className="row flex-nowrap overflow-auto g-3">
				{items.map((it) => (
					<div key={`${type}-${it.uid}`} className="col-9 col-sm-6 col-md-4 col-lg-3">
						<Card type={type} item={it} />
					</div>
				))}
			</div>
		</section>
	);



	return (
		<div className="container py-4 bg-dark min-vh-100">
			<h1 className="text-center text-white mb-4">Star Wars Databank</h1>
			<Section title="People" type="people" items={people} />
			<Section title="Planets" type="planets" items={planets} />
			<Section title="Vehicles" type="vehicles" items={vehicles} />
		</div>
	);
}; 