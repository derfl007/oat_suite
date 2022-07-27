import Head from "next/head";
import { useReducer } from "react";
import moment from "moment";
import { AiOutlineArrowLeft, AiOutlineInfoCircle, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useRouter } from "next/router";
import Image from "next/image";
import { NextPage } from "next";

const monthReducer = (state: number, action: { type: string }) => {
	switch (action.type) {
		case "prev":
			console.log("Setting month to: ", state - 1 < 0 ? 12 : state - 1);
			return state - 1 < 0 ? 12 : state - 1;
		case "next":
			console.log("Setting month to: ", state + 1 > 12 ? 0 : state + 1);
			return state + 1 > 12 ? 0 : state + 1;
		default:
			return state;
	}
}

function getBetterDate(date?: string): [number, number] {
	const daysPerMonth: number[] = [
		30,
		29,
		30,
		30,
		30,
		30,
		30,
		30,
		30,
		30,
		30,
		30,
		6.25
	];
	const now = moment(date);
	const dayOfYear: number = Number(now.format("DDD")); // returns the current day of the year
	let month = 0;
	let day = 0;
	console.log("old date: ", now.format("YYYY-MM-DD"));

	let dayOfYearTemp = dayOfYear;
	for (let i = 0; i < daysPerMonth.length; i++) {
		if (dayOfYearTemp > daysPerMonth[i]) {
			month = i + 1;
			console.log("month: ", month, " day: ", day, " dayOfYearTemp: ", dayOfYearTemp);
		} else {
			month = i + 1;
			day = dayOfYearTemp;
			console.log("month: ", month, " day: ", day, " dayOfYearTemp: ", dayOfYearTemp);
			break;
		}
		dayOfYearTemp -= daysPerMonth[i];
	}
	if (month === 2 && day === 29) {
		day = 30;
	}
	console.log("dayOfYear: ", dayOfYear);
	console.log("month: ", month);
	console.log("day: ", day);
	return [day, month];
}

const Calendar2: NextPage = () => {
	const [currentDay, currentMonth] = getBetterDate();
	const [month, dispatchMonth] = useReducer(monthReducer, currentMonth - 1);
	const router = useRouter();
	const months: [string, number][] = [
		["January", 30],
		["February", 30],
		["Marchuary", 30],
		["Apuary", 30],
		["Jmay", 30],
		["June", 30],
		["July", 30],
		["Jaugust", 30],
		["September", 30],
		["October", 30],
		["November", 30],
		["December", 30],
		["Bonus Weekend", 6],
	];

	const specialDays: Map<string, string> = new Map([
		["1-1", "new_years_day.svg"],
		["14-2", "valentines_day.svg"],
		["17-3", "st_patricks_day.svg"],
		["20-4", "ape_day.svg"],
		["16-5", "oat_day.png"],
		["6-6", "spoon_day.svg"],
		["26-7", "clown_day.svg"],
		["23-8", "school_day.svg"],
		["24-8", "school_day.svg"],
		["25-8", "school_day.svg"],
		["26-8", "school_day.svg"],
		["27-8", "school_day.svg"],
		["28-8", "school_day.svg"],
		["29-8", "school_day.svg"],
		["30-8", "school_day.svg"],
		["1-9", "ber_day.png"],
		["30-10", "halloween.svg"],
		["26-11", "bird_from_egypt_day.png"],
		["25-12", "christmas.svg"],
		["6-13", "new_years_eve.svg"],
	]);

	return (
			<div>
				<Head>
					<title>Oats Software Suite - Calendar 2</title>
				</Head>
				<div className={ "bg-blue-700 text-white w-100 p-4 text-center flex justify-between items-center" }>
					<div className={ "text-3xl" }><AiOutlineArrowLeft className={ "cursor-pointer" }
																														onClick={ () => router.back() }/></div>
					<h1>Calendar 2 <span className={ "text-sm" }>beta</span></h1>
					<div className={ "text-3xl" }><AiOutlineInfoCircle className={ "cursor-pointer" }
																														 onClick={ () => router.push("/info") }/></div>
				</div>

				<div className={ "grid w-100 mx-auto my-2 " + (month === 12 ? "grid-cols-6" : "grid-cols-7") }>
					<div className={ "col-span-full text-center bg-blue-500 text-white m-1 flex justify-between p-2" }>
						<div
								className={ "rounded-full bg-blue-700 text-white w-8 h-8 text-2xl flex items-center justify-center leading-normal cursor-pointer" }
								onClick={ () => dispatchMonth({type: "prev"}) }>
							<AiOutlineLeft/>
						</div>
						<h2 className={ month === 12 ? "font-comic font-bold text-rainbow" : "" }>
							{ months[month][0] }
						</h2>
						<div
								className={ "rounded-full bg-blue-700 text-white w-8 h-8 text-2xl flex items-center justify-center leading-normal cursor-pointer" }
								onClick={ () => dispatchMonth({type: "next"}) }>
							<AiOutlineRight/>
						</div>
					</div>
					<div className={ "border-2 border-blue-400 bg-blue-100 m-1 p-1 text-center" }>
						Su
					</div>
					<div className={ "border-2 border-blue-400 bg-blue-100 m-1 p-1 text-center" }>
						M
					</div>
					<div className={ "border-2 border-blue-400 bg-blue-100 m-1 p-1 text-center" }>
						Tu
					</div>
					<div className={ "border-2 border-blue-400 bg-blue-100 m-1 p-1 text-center" }>
						W
					</div>
					<div className={ "border-2 border-blue-400 bg-blue-100 m-1 p-1 text-center" }>
						Th
					</div>
					<div className={ "border-2 border-blue-400 bg-blue-100 m-1 p-1 text-center" }>
						F
					</div>
					{ month !== 12 ? (
							<div className={ "border-2 border-blue-400 bg-blue-100 m-1 p-1 text-center" }>
								Sa
							</div>
					) : "" }
					{ Array.from({length: months[month][1]}, (_, i) => (
							<div key={ i }
									 className={ "border-blue-400 h-36 m-1 flex flex-col " + (currentMonth - 1 === month && currentDay - 1 === i ? "bg-blue-200 border-4" : "border-2") }>
								<div className={ "flex justify-between bg-blue-300 px-2 flex-wrap" }>
									{
											month === 1 && i === 28 || i + 1
									}
									{
											month === 12 && i === 5 && (
													<div className={ "text-red-500" }>
														+6h
													</div>
											)
									}
								</div>
								<div className={ "p-2 w-full h-full" }>
									<div className={ "h-48 relative w-full h-full" }>
										{
												specialDays.has(`${ i + 1 }-${ month + 1 }`) && (
														<Image className={ "" } src={ "/" + specialDays.get(`${ i + 1 }-${ month + 1 }`) || "" }
																	 layout={ "fill" } objectFit={ "contain" }></Image>
												)
										}
									</div>
								</div>
							</div>
					)) }
				</div>
			</div>
	)
}

export default Calendar2