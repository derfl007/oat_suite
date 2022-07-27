import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from "next/router";

const Home: NextPage = () => {
	const router = useRouter();
	return (
			<div>
				<Head>
					<title>Oats Software Suite</title>
					<meta name="description" content="A suite of tools for everything that Oats Jenkins made better"/>
					<link rel="icon" href="/oat_day.png"/>
				</Head>
				<div>
					<div className={ "bg-blue-700 text-white w-100 p-4 text-center" }>
						<h1>Oats Software Suite <span className={ "text-sm" }>beta</span></h1>
					</div>
					<div className={ "grid grid-cols-3 w-5/6 mx-auto my-2" }>
						<div className={ "text-center bg-blue-500 text-white m-1 h-48 flex justify-center items-center cursor-pointer hover:shadow-xl rounded-md" } onClick={() => router.push("apps/calendar-2")}>
							<h2 className={ "" }>Calendar 2</h2>
						</div>
					</div>
				</div>
			</div>
	)
}

export default Home
