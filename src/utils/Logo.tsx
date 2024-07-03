import logoIC from '../assets/logo-sin-fondo.png';

interface Estilos {
    estilos: string;
}

export const Logo = ({ estilos }: Estilos) => {

    return (
        <img src={logoIC} alt="logo" className={estilos} />
    )
}