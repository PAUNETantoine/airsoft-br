"use client"

import { MapPin, Clock } from "lucide-react"
import { Button } from "@/ui/components/button"
import { useRouter } from "next/navigation"

export default function HomePage() {
	const router = useRouter()

	const handleMapSelect = (mapName: string) => {
		if (mapName === "Marais") {
			router.push("/marais")
		} else {
			console.log("Map pas encore disponible")
		}
	}

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 p-4">
			<div className="space-y-8 text-center">
				<div className="space-y-2">
					<h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
						TEAM SHEEP
					</h1>
					<p className="text-xl font-medium text-slate-300 md:text-2xl">
						AIRSOFT
					</p>
				</div>

				<div className="mt-12 flex flex-col gap-6 sm:flex-row">
					<Button
						onClick={() => handleMapSelect("Marais")}
						size="lg"
						className="flex h-16 items-center gap-3 bg-green-600 px-8 text-lg font-semibold text-white hover:bg-green-700"
					>
						<MapPin className="h-6 w-6" />
						MAP MARAIS
					</Button>

					<Button
						onClick={() => handleMapSelect("Arrive Bientôt")}
						size="lg"
						variant="outline"
						disabled
						className="flex h-16 items-center gap-3 border-slate-600 px-8 text-lg font-semibold text-slate-400 hover:bg-slate-800"
					>
						<Clock className="h-6 w-6" />
						ARRIVE BIENTÔT...
					</Button>
				</div>
			</div>
		</div>
	)
}
