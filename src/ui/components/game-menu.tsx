import { PlaceType } from "../../../shared/type/types"
import React from "react"

type Props = {
	disabledFilter: PlaceType[]
	setDisabledFilter: (filters: PlaceType[]) => void
}

const ALL_TYPES: PlaceType[] = ["base", "place", "player", "flag"]

export const GameMenu = ({ disabledFilter, setDisabledFilter }: Props) => {
	const toggleFilter = (type: PlaceType) => {
		if (disabledFilter.includes(type)) {
			setDisabledFilter(disabledFilter.filter((t) => t !== type))
		} else {
			setDisabledFilter([...disabledFilter, type])
		}
	}

	const isAllEnabled = disabledFilter.length === 0
	const toggleAll = () => {
		if (isAllEnabled) {
			setDisabledFilter([...ALL_TYPES])
		} else {
			setDisabledFilter([])
		}
	}

	return (
		<div className="flex w-full max-w-full flex-col items-start gap-3 overflow-auto rounded-xl bg-white p-4 shadow lg:flex-col">
			<div className="flex flex-col gap-2">
				<h2 className="text-sm font-bold whitespace-nowrap lg:text-lg">
					Filtres des lieux
				</h2>

				<button
					className="hidden rounded bg-gray-200 px-3 py-1 text-xs hover:bg-gray-300 lg:flex lg:text-sm"
					onClick={toggleAll}
				>
					{isAllEnabled ? "Tout désactiver" : "Tout activer"}
				</button>
			</div>

			<div className="flex flex-row gap-4 lg:flex-col">
				{ALL_TYPES.map((type) => (
					<label key={type} className="flex items-center space-x-2">
						<input
							type="checkbox"
							checked={!disabledFilter.includes(type)}
							onChange={() => toggleFilter(type)}
						/>
						<span className="text-sm capitalize lg:text-lg">
							{type}
						</span>
					</label>
				))}
			</div>
		</div>
	)
}
