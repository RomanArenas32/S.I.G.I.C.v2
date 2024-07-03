import { Link } from "react-router-dom"
import { BotonCerrarSesion } from "../../utils"

export const Menu = () => {
    return (
        <ul className=" md:flex md:flex-row md:gap-4 md:justify-around flex flex-col items-center justify-center gap-10 w-full bg-slate-900 text-white uppercase list-none font-semibold pt-4 pb-6 text-xl ">
            <li className="hover:text-yellow-400"><Link to="/reunion">reunion</Link></li>
            <li className="hover:text-yellow-400"><Link to="/reunion">operaciones</Link></li>
            <li className="hover:text-yellow-400"><Link to="/reunion">monitoreo</Link></li>
            <li className="hover:text-yellow-400"><Link to="/reunion">medios</Link></li>
            <li className="hover:text-yellow-400"><Link to="/reunion">analisis</Link></li>
            <BotonCerrarSesion/>
        </ul>
    )
}
