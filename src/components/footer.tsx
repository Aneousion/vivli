import Link from "next/link"
export default function Footer() {
    return (
        <>
            <footer className="footer footer-center bg-primary text-primary-content p-10">
                <aside>
                    <p className="font-bold">KlebVax.</p>
                    <nav className="grid grid-flow-col gap-4 font-bold">
                        
                        <br />
                        <a className="link link-hover">Contact@KlebVax.com</a>
                        <Link href="/research" className="link link-hover">Research</Link>
                        <Link href="/countries" className="link link-hover">Countries</Link>
                    </nav>

                    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
                </aside>
            </footer>
        </>
    )
}