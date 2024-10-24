import { NavLink as NavLinkRR } from "react-router-dom";

interface NavLinkProps {
    to: string
    children: JSX.Element | JSX.Element[] | string | number | string[]
}

export function NavLink({ to, children }: NavLinkProps) {
    return (
        <NavLinkRR className={({ isActive }) => {
            return isActive ? 'is-active' : undefined
        }} to={to}>
            {children}
        </NavLinkRR>
    )
}