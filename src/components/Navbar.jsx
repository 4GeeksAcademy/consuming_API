import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
		<div className="container-fluid">
			<Link to="/" className="navbar-brand">
				<span className="fs-2">Factus API</span>
			</Link>

			<button
				className="navbar-toggler"
				type="button"
				data-bs-toggle="offcanvas"
				data-bs-target="#offcanvasNavbar"
				aria-controls="offcanvasNavbar"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>


			<div
				className="offcanvas offcanvas-end"
				tabIndex="-1"
				id="offcanvasNavbar"
				aria-labelledby="offcanvasNavbarLabel"
			>
				<div className="offcanvas-header">
					<h5 className="offcanvas-title" id="offcanvasNavbarLabel">
						Factus API
					</h5>
					<button
						type="button"
						className="btn-close"
						data-bs-dismiss="offcanvas"
						aria-label="Close"
					></button>
				</div>
				<div className="offcanvas-body">
					{/* Enlaces de navegación */}
					<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link to="/login" className="nav-link">
								Login User
							</Link>
						</li>
						{/* Puedes agregar más enlaces aquí */}
					</ul>
				</div>
			</div>
		</div>
	</nav>
);
};