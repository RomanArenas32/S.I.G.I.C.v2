import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const BotonCerrarSesion = () => {
  const navigate = useNavigate();
  const [esconderBtn, setEsconderBtn] = useState<boolean>(false);

  const cerrarSesion = () => {
    setEsconderBtn(!esconderBtn);
    localStorage.clear();
    setTimeout(() => {
      navigate("./");
      window.location.reload();
    }, 1000);
  };

  return (
    <svg
      className={`hover:cursor-pointer ${esconderBtn ? "flex flex-none" : ""}`}
      onClick={cerrarSesion}
      id="Layer_1"
      enableBackground="new 0 0 512 512"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      width="37"
      height="37"
    >
      <g clipRule="evenodd" fillRule="evenodd">
        <ellipse
          cx="256"
          cy="256"
          fill="#ff5a54"
          rx="240"
          ry="240"
          transform="matrix(.707 -.707 .707 .707 -106.039 256)"
        />
        <path
          d="m487.01 321.279c-28.007 99.306-118.324 172.482-226.071 174.659l-102.437-102.438v-275h125.73z"
          fill="#db3a3c"
        />
        <path
          d="m336.643 273.188h-112.46v-34.375h112.46v-39.068l66.858 56.255-66.858 56.256zm-52.411-120.312v-34.376h-125.73v275h125.73v-34.375h-91.355v-206.25h91.355z"
          fill="#fff"
        />
      </g>
    </svg>
  );
};
