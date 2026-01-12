import styles from "@/layout/MainLayout.module.css"
import { useRouter } from "next/router";
import Link from "next/link";
import { DISCORD_LINK } from "@/pages/discord";

/**
 * Layout principal do site
 * @param {Object} properties
 * @param {Element} properties.children - Elementos dentro do main layout
 * @returns {JSX.Element} Componente MainLayout
 */
export default function MainLayout({ children }) {
    const router = useRouter();

    const navLinks = [
        { href: "/", label: "Loja" },
        { href: "/terms", label: "Termos" },
        { href: "/privacy", label: "Privacidade" },
        { href: DISCORD_LINK, label: "Discord", target: "_blank", rel: "noopener noreferrer" }
    ];

    return (
        <>
            <header className={styles.header}>
                <h1>Ei Mine Store</h1>

                <nav>
                    {navLinks.map(link => (
                        <Link
                            key={link.href + link.label}
                            href={link.href}
                            className={
                                router.pathname === link.href
                                    ? `${styles.navLink} ${styles.navLinkActive}`
                                    : styles.navLink
                            }
                            target={link.target ? link.target : undefined}
                            rel={link.rel ? link.rel : undefined}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

            </header>

            <main className={styles.main}>
                {children}
            </main>

            <span className={styles.credit}>
                © feito pelo Renato
            </span>
        </>
    )
}