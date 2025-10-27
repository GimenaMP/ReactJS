import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./CustomerLogin.css";

function EyeIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#c61010"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="22"
            height="22"
        >
            <path d="M1 12s3-8 11-8 11 8 11 8-3 8-11 8-11-8-11-8Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

function EyeOffIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#c61010"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="22"
            height="22"
        >
            <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-10-8-10-8a18.18 18.18 0 0 1 5.06-6.36" />
            <path d="M1 1l22 22" />
            <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 10 8 10 8a18.14 18.14 0 0 1-3.23 4.31" />
            <path d="M14.12 14.12A3 3 0 0 1 9.88 9.88" />
        </svg>
    );
}

function TicketIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 1024 1024"
            className="icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            aria-hidden="true"
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path
                    d="M512 512m-296.421053 0a296.421053 296.421053 0 1 0 592.842106 0 296.421053 296.421053 0 1 0-592.842106 0Z"
                    fill="#a80000"
                ></path>
                <path
                    d="M970.105263 512c0 224.983579-163.166316 412.186947-377.263158 450.533053v-54.460632C777.135158 870.507789 916.210526 707.206737 916.210526 512c0-222.881684-181.328842-404.210526-404.210526-404.210526S107.789474 289.118316 107.789474 512s181.328842 404.210526 404.210526 404.210526c9.081263 0 18.000842-0.754526 26.947368-1.374315v53.894736c-8.973474 0.538947-17.866105 1.374316-26.947368 1.374316-252.604632 0-458.105263-205.500632-458.105263-458.105263S259.395368 53.894737 512 53.894737s458.105263 205.500632 458.105263 458.105263z m-498.122105 265.620211L431.157895 754.526316V485.052632h-66.074948c-14.470737 110.645895-44.355368 197.066105-102.696421 260.742736l-39.747368-36.432842C306.526316 617.876211 323.368421 462.901895 323.368421 242.526316V215.578947h377.263158v53.894737H377.182316c-0.404211 58.260211-2.209684 112.128-6.359579 161.684211H700.631579v53.894737h-122.152421a481.172211 481.172211 0 0 0 76.826947 119.70021l66.479158-39.855158 27.728842 46.214737-54.460631 32.687158c29.507368 24.953263 63.757474 45.675789 102.80421 58.098526l-16.303158 51.361684c-134.224842-42.711579-222.773895-167.073684-261.551158-268.207157H485.052632v221.857684l68.985263-41.391158 27.728842 46.214737-109.783579 65.886316zM646.736842 377.263158h-215.578947v-53.894737h215.578947v53.894737z"
                    fill="#231F20"
                ></path>
            </g>
        </svg>
    );
}

function UserAvatarIcon(props) {
    return (
        <svg
            {...props}
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="-2.4 -2.4 28.80 28.80"
            xmlSpace="preserve"
            fill="#000000"
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0">
                <path
                    transform="translate(-2.4, -2.4), scale(0.9)"
                    d="M16,29.37202920847469C17.907374014368678,30.395625602775947,20.57800364852833,31.512467837931332,22.35840299386897,30.281206947532375C24.304643337192513,28.93525631891516,23.057240412803942,25.511770060637936,24.39968207508693,23.563107711224344C25.514878754415903,21.944309783347357,28.401115915050365,22.080510637089834,29.234414338100592,20.300121886556063C30.043108461143213,18.572301600976242,28.848637293108837,16.565504021681807,28.557275178697992,14.680177195322289C28.277326252168383,12.868702075215946,28.552929463385084,10.8650682825224,27.540193098800952,9.337266407907013C26.530116409714157,7.813476887693819,24.725686730388436,7.000280468083654,23.02384348037039,6.33250882139887C21.494911670763845,5.732584408760464,19.742729331830745,6.221855073827083,18.195578869836545,5.670613541232326C16.371950938533452,5.020864547564062,15.134806479217621,2.927744312705183,13.201216469400336,2.8327587320283882C11.322616090125216,2.7404744592616104,9.356607142402765,3.7452521828950167,8.136237109502918,5.176458930647675C6.909273349040431,6.615398568528802,7.78612863607812,9.099927529655963,6.600870865970208,10.57341026431984C5.119752674085613,12.414699255439325,0.9122748996885672,12.038819535905597,0.7215809989191957,14.394173454822809C0.5279830476409935,16.785396726242173,4.129718640142651,17.659297233177977,5.895719580446567,19.2830797245734C6.975088745510487,20.27552582807393,8.065485915604896,21.183753734921396,9.163147761136695,22.155929406139254C10.15444594290161,23.033901050282033,11.183331452451085,23.81156626262475,12.094081496916225,24.77283659379905C13.492697844006946,26.249035697300876,14.208173799501147,28.410441798649234,16,29.37202920847469"
                    fill="#414748"
                ></path>
            </g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <g>
                    <rect y="0" fill="none" width="24" height="24"></rect>
                    <g transform="translate(2.000000, 2.000000)">
                        <path
                            fillRule="evenodd"
                            fill="#e10e0e"
                            d="M10,10c2.9,0,5.2-2.3,5.2-5.2c0-2.9-2.3-5.2-5.2-5.2S4.8,1.9,4.8,4.8 C4.8,7.7,7.1,10,10,10L10,10z"
                        ></path>
                        <path
                            fillRule="evenodd"
                            fill="#e10e0e"
                            d="M10,12.7c-3.5,0-10.5,1.7-10.5,5.2v2.6h21v-2.6C20.5,14.4,13.5,12.7,10,12.7L10,12.7z "
                        ></path>
                        <path
                            fillRule="evenodd"
                            fill="#cc1e1e"
                            d="M10,10c2.9,0,5.2-2.3,5.2-5.2c0-2.9-2.3-5.2-5.2-5.2V10L10,10z"
                        ></path>
                        <path
                            fillRule="evenodd"
                            fill="#cc1e1e"
                            d="M10,12.7v7.8h10.5v-2.6C20.5,14.4,13.5,12.7,10,12.7L10,12.7z"
                        ></path>
                    </g>
                </g>
            </g>
        </svg>
    );
}

function LockIcon(props) {
    return (
        <svg
            {...props}
            viewBox="-102.4 -102.4 1228.80 1228.80"
            className="icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            aria-hidden="true"
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0">
                <path
                    transform="translate(-102.4, -102.4), scale(38.4)"
                    d="M16,30.57221310036747C18.28486661667816,30.735263602212875,19.999217614237647,28.54874396019409,22.01668643471156,27.463838212869494C24.01361094699777,26.389980288342183,26.67949924685673,26.12267301480588,27.866564533940274,24.190898091570546C29.05682414805133,22.253924868868864,28.127290007576615,19.74908881305004,28.15428381992308,17.475797246061294C28.178522055502505,15.434567358479022,29.010634494331057,13.225947910668635,28.017946843237134,11.442193955273225C27.024742124657003,9.657510884689657,24.21489565421267,9.755051763056942,22.96053371320481,8.143181608116283C21.297086355664998,6.005631781166828,22.436074727457754,1.10810010029746,19.743985392988968,0.8100541487442818C16.830236490025058,0.48746787597400226,16.210119135556216,5.441750911449352,13.813874162115592,7.1305388200286846C12.487486461010208,8.06532951820127,10.702772452020438,7.787107461661013,9.154564121386233,8.273100206450955C6.774037503236908,9.020363118236213,3.873524818711105,8.908406295886536,2.214224375530483,10.771744933469044C0.5774892219898009,12.609743509083184,0.15117448017095875,15.450683651992493,0.6096747587187039,17.86872381323198C1.0636817405360823,20.26306721253098,2.8694345097662795,22.185111832286378,4.68635003128183,23.809248723370835C6.2979436948496295,25.249848845634702,8.56234235370765,25.527028040438427,10.41773124165293,26.636124484940765C12.400806363463907,27.821547972745154,13.695488943656981,30.407760750500632,16,30.57221310036747"
                    fill="#273234"
                ></path>
            </g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path
                    d="M789.942857 899.657143H263.314286c-43.885714 0-80.457143-36.571429-80.457143-80.457143V482.742857c0-43.885714 36.571429-80.457143 80.457143-80.457143h526.628571c43.885714 0 80.457143 36.571429 80.457143 80.457143v336.457143c0 43.885714-36.571429 80.457143-80.457143 80.457143z"
                    fill="#6d080a"
                ></path>
                <path
                    d="M789.942857 928.914286H263.314286c-58.514286 0-102.4-43.885714-102.4-102.4V482.742857c0-58.514286 43.885714-102.4 102.4-102.4h526.628571c58.514286 0 102.4 43.885714 102.4 102.4v336.457143c7.314286 65.828571-43.885714 109.714286-102.4 109.714286zM263.314286 431.542857c-29.257143 0-51.2 21.942857-51.2 51.2v336.457143c0 29.257143 21.942857 51.2 51.2 51.2h526.628571c29.257143 0 51.2-21.942857 51.2-51.2V482.742857c0-29.257143-21.942857-51.2-51.2-51.2H263.314286z"
                    fill="#D72822"
                ></path>
                <path
                    d="M753.371429 424.228571H299.885714V197.485714c0-87.771429 73.142857-168.228571 153.6-168.228571h138.971429c87.771429 0 153.6 73.142857 153.6 168.228571v226.742857z m-394.971429-51.2h343.771429V197.485714c0-58.514286-43.885714-109.714286-102.4-109.714285H460.8c-58.514286 0-102.4 51.2-102.4 109.714285v175.542857z"
                    fill="#D72822"
                ></path>
            </g>
        </svg>
    );
}

function MailIcon(props) {
    return (
        <svg
            {...props}
            viewBox="-2.4 -2.4 28.80 28.80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0">
                <path
                    transform="translate(-2.4, -2.4), scale(0.9)"
                    d="M16,28.461435378662177C18.140910258418856,28.21141545433227,20.514676037124524,29.232728990446958,22.3635245107814,28.124682954119198C24.21312942126257,27.016183572459557,24.37837097418474,24.40179061430076,25.663270927180918,22.670074322639138C27.00313974400747,20.864274070738258,29.423754097273875,19.85838866721567,30.090364622584616,17.710880016799006C30.772323577158865,15.513925875556449,30.238863993815563,13.055983482685633,29.29938488403461,10.956208609816635C28.38028954356993,8.901992308904232,26.641891531514815,7.372562861709471,24.853557831079854,6.006399097116548C23.146475329806176,4.702305652004196,21.25179379621224,3.666162324929018,19.153561426574488,3.20549834463087C17.083203814941008,2.750954228442107,14.914028995867278,2.752185493789003,12.889370107717575,3.3796784262168647C10.917291761545172,3.9908753204986964,9.56226676830897,5.675808098534685,7.7861960961104515,6.7285320007892775C5.577589162825472,8.037631546065946,1.9493749579286312,7.926940596588953,1.1189032118991964,10.356344409100345C0.2768161958901748,12.819726717938279,3.750965298169743,14.865532594218795,4.123877382410223,17.442022361218484C4.484360217759994,19.93263710852385,2.3158379120944614,22.47495155758406,3.213203186666677,24.826088571470898C4.108564180551694,27.17197428062886,6.390244001413476,29.021357927147196,8.805476177330577,29.708019857224194C11.181122076261609,30.383427221536934,13.546880044715365,28.74791579659685,16,28.461435378662177"
                    fill="#334247"
                ></path>
            </g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z"
                    fill="#c91703"
                ></path>
            </g>
        </svg>
    );
}

function PhoneIcon(props) {
    return (
        <svg
            {...props}
            viewBox="-2.4 -2.4 28.80 28.80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ec0909"
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0">
                <path
                    transform="translate(-2.4, -2.4), scale(0.9)"
                    d="M16,31.711026152486312C18.15763368132471,31.778776913392367,20.12004750941943,30.5444985271732,22.016464168804678,29.51319977201237C23.828641534757207,28.527711560659437,25.75043544348599,27.52209507374286,26.8785660700837,25.79510488566462C27.979791599006695,24.109302161695613,27.577850855616923,21.878525675387838,28.244812149789993,19.978580644138766C28.929041645767075,18.02944440119155,31.743021157638022,16.307684593779886,30.865543097235566,14.437568460956102C29.805595015277294,12.1785649627756,26.131826916986984,12.82219708371731,24.165890605077237,11.285420860985624C23.043403230627163,10.40797030629513,23.228739521716985,8.472679972468871,22.10859273410761,7.592243401252711C20.98648896369654,6.710268639464644,19.217153797195333,7.249433850819935,18.027631708455715,6.460742813466027C16.026864721984687,5.134170566509877,15.306282032581866,1.2597394370152732,12.91756889514076,1.498301813686263C10.690289164401946,1.7207417281941109,11.516904041917204,6.022491832360834,9.675366718163456,7.294889097269914C7.7670010488446435,8.613460937637536,4.476493257751402,6.7399278616182166,2.886721626523551,8.429045201114864C1.458526920780714,9.946488583712114,3.1064887727878996,12.551954340856849,2.7891034018225422,14.611478815874621C2.4538065288628816,16.78723163698596,0.5488807748709306,18.72311681187501,0.967270336255126,20.88442995589538C1.3798134516218141,23.01554158011292,3.3647561189990096,24.47210742279605,4.978888797739,25.923453099172022C6.505015096801773,27.295667933133146,8.332419014228503,28.186386980990093,10.149441555721808,29.140569413724634C12.056163970489816,30.141856404241324,13.847420775130757,31.643434104003866,16,31.711026152486312"
                    fill="#495255"
                ></path>
            </g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path
                    d="M5.11596 12.7268L8.15456 9.08666C8.46255 8.69067 8.61655 8.49267 8.69726 8.27061C8.76867 8.07411 8.79821 7.86486 8.784 7.65628C8.76793 7.42055 8.67477 7.18766 8.48846 6.72187L7.77776 4.94513C7.50204 4.25581 7.36417 3.91116 7.12635 3.68525C6.91678 3.48618 6.65417 3.3519 6.37009 3.29856C6.0477 3.23803 5.68758 3.32806 4.96733 3.50812L3 4.00002C3 14 9.99969 21 20 21L20.4916 19.0324C20.6717 18.3122 20.7617 17.952 20.7012 17.6297C20.6478 17.3456 20.5136 17.083 20.3145 16.8734C20.0886 16.6356 19.7439 16.4977 19.0546 16.222L17.4691 15.5878C16.9377 15.3752 16.672 15.2689 16.4071 15.2608C16.1729 15.2536 15.9404 15.3013 15.728 15.4002C15.4877 15.512 15.2854 15.7144 14.8807 16.1191L11.7943 19.1569"
                    stroke="#d30909"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></path>
            </g>
        </svg>
    );
}

function CloseIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="22"
            height="22"
        >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}

export default function CustomerLogin({ onClose }) {
    const [view, setView] = useState("login");

    // Login
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showLoginPassword, setShowLoginPassword] = useState(false);

    // Registro
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [showRegPassword, setShowRegPassword] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);

    // Recuperar
    const [recoverValue, setRecoverValue] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === "xd" && password === "123") {
            onClose?.();
            navigate("/reservas");
        } else {
            alert("Por favor, ingresa un nombre de usuario y contraseña válidos.");
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (!fullName.trim() || !email.trim() || !phone.trim() || !regPassword.trim()) {
            alert("Por favor, completa todos los campos.");
            return;
        }
        if (!acceptTerms) {
            alert("Debes aceptar los términos de servicio y la política de privacidad.");
            return;
        }
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        setFullName("");
        setEmail("");
        setPhone("");
        setRegPassword("");
        setAcceptTerms(false);
        setShowRegPassword(false);
        setView("login");
    };

    const handleRecover = (e) => {
        e.preventDefault();
        if (!recoverValue.trim()) {
            alert("Por favor, ingresa tu correo o nombre de usuario.");
            return;
        }
        alert(`Se enviaron instrucciones de recuperación a: ${recoverValue}`);
        setRecoverValue("");
        setView("login");
    };

    const renderLoginForm = () => (
        <>
            <div className="card-header">
        <span className="card-icon" role="img" aria-label="ticket">
          <TicketIcon />
        </span>
                <h2 className="card-title">Iniciar Sesión</h2>
                <p className="card-description">Accede para realizar tus reservas.</p>
            </div>

            <form onSubmit={handleLogin}>
                <div className="input-container">
          <span className="input-icon" role="img" aria-label="usuario">
            <UserAvatarIcon />
          </span>
                    <input
                        type="text"
                        id="login-username"
                        placeholder="Nombre de usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="input-container">
          <span className="input-icon" role="img" aria-label="contraseña">
            <LockIcon />
          </span>

                    <input
                        type={showLoginPassword ? "text" : "password"}
                        id="login-password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                        className="input-icon-right"
                        role="img"
                        aria-label={showLoginPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        onClick={() => setShowLoginPassword((prev) => !prev)}
                        title={showLoginPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
            {showLoginPassword ? <EyeOffIcon /> : <EyeIcon />}
          </span>
                </div>

                <div className="form-actions">
                    <button type="submit" className="primary-button">Iniciar Sesión</button>
                </div>
            </form>

            <div className="spacer-grow" />

            <div className="switch-links">
                <button type="button" className="link-button" onClick={() => setView("register")}>
                    Agregar Usuario
                </button>
                <button type="button" className="link-button" onClick={() => setView("forgot")}>
                    Recuperar Contraseña
                </button>
            </div>
        </>
    );

    const renderRegisterForm = () => (
        <>
            <div className="card-header">
        <span className="card-icon" role="img" aria-label="ticket">
          <TicketIcon />
        </span>
                <h2 className="card-title">Crear Cuenta</h2>
                <p className="card-description">Regístrate para reservar más rápido.</p>
            </div>

            <form onSubmit={handleRegister}>
                <div className="input-container">
          <span className="input-icon" role="img" aria-label="usuario">
            <UserAvatarIcon />
          </span>
                    <input
                        type="text"
                        id="full-name"
                        placeholder="Ingresa tu nombre completo"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>

                <div className="input-container">
          <span className="input-icon" role="img" aria-label="correo">
            <MailIcon />
          </span>
                    <input
                        type="email"
                        id="reg-email"
                        placeholder="tucorreo@ejemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="input-container">
          <span className="input-icon" role="img" aria-label="teléfono">
            <PhoneIcon />
          </span>
                    <input
                        type="tel"
                        id="reg-phone"
                        placeholder="Ingresa tu número de teléfono"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <div className="input-container">
          <span className="input-icon" role="img" aria-label="contraseña">
            <LockIcon />
          </span>
                    <input
                        type={showRegPassword ? "text" : "password"}
                        id="reg-password"
                        placeholder="Crea una contraseña segura"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                    />
                    <span
                        className="input-icon-right"
                        role="img"
                        aria-label={showRegPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        onClick={() => setShowRegPassword((prev) => !prev)}
                        title={showRegPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
            {showRegPassword ? <EyeOffIcon /> : <EyeIcon />}
          </span>
                </div>

                <div className="terms-container">
                    <input
                        type="checkbox"
                        id="terms"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                    />
                    <label htmlFor="terms">
                        Acepto los&nbsp;
                        <span className="highlight-text">Términos de Servicio</span>
                        &nbsp;y la&nbsp;
                        <span className="highlight-text">Política de Privacidad</span>.
                    </label>
                </div>

                <div className="form-actions">
                    <button type="submit" className="primary-button">Registrarse</button>
                </div>
            </form>

            <div className="spacer-grow" />

            <div className="switch-links single-link">
                <span>¿Ya tienes una cuenta?&nbsp;</span>
                <button
                    type="button"
                    className="link-button"
                    onClick={() => setView("login")}
                >
                    Inicia Sesión
                </button>
            </div>
        </>
    );

    const renderForgotForm = () => (
        <>
            <div className="card-header">
                <button
                    type="button"
                    className="back-button"
                    onClick={() => setView("login")}
                    aria-label="Volver"
                    title="Volver"
                >
          <span className="card-icon" role="img" aria-label="ticket">
            <TicketIcon />
          </span>
                </button>
                <h2 className="card-title">Recuperar Contraseña</h2>
                <p className="card-description">Ingresa tu correo o usuario para restablecer tu contraseña.</p>
            </div>

            <form onSubmit={handleRecover}>
                <div className="input-container">
          <span className="input-icon" role="img" aria-label="usuario">
            <UserAvatarIcon />
          </span>
                    <input
                        type="text"
                        id="recover-value"
                        placeholder="Ingresa tu correo o usuario"
                        value={recoverValue}
                        onChange={(e) => setRecoverValue(e.target.value)}
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="primary-button">Enviar Instrucciones</button>
                </div>
            </form>

            <div className="spacer-grow" />

            <div className="switch-links single-link">
                <button
                    type="button"
                    className="link-button"
                    onClick={() => setView("login")}
                >
                    Volver al Inicio de Sesión
                </button>
            </div>
        </>
    );

    return (
        <div className="overlay">
            <div className="modal">
                {/* === Nuevo: botón de cerrar en la esquina === */}
                <button
                    className="close-button"
                    onClick={() => onClose?.()}
                    aria-label="Cerrar"
                    title="Cerrar"
                >
                    <CloseIcon />
                </button>

                <section className="login-section">
                    <div className="login-card">
                        {view === "login" && renderLoginForm()}
                        {view === "register" && renderRegisterForm()}
                        {view === "forgot" && renderForgotForm()}
                    </div>
                </section>
            </div>
        </div>
    );
}
