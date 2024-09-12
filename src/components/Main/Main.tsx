import { Outlet } from "react-router-dom";
import Menu from "../Menu";

export function Main() {
    // если desktop код не попадёт в бандл
    if (__PLATFORM__ === 'mobile') {
        console.log('MOBILE');
    }
    // если mobile код не попадёт в бандл
    if (__PLATFORM__ === 'desktop') {
        console.log('DESKTOP');
    }

    // выведет значение переданное в глобальной переменной
    return (
        <section>
            <h1>This is {__PLATFORM__} version.</h1>
            <Menu />
            <Outlet />
        </section>
    )
} 