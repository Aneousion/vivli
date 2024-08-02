import Link from "next/link"

export default function Hero() {
    return (
        <>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img
                        src="/taxi-biotechnology-research.png"
                        className="max-w-sm hue-rotate-240" />
                    <div>
                        <h1 className="text-5xl font-bold">Welcome to KlebVax!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        <Link href="/research"><button className="btn mr-2 cta">Our Research</button></Link>
                        <Link href="/countries"><button className="btn cta">Countries</button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}