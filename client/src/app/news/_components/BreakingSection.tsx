import React from "react";
import { INews } from "../../../types";

export const BreakingSection = ({
	breakingNews,
}: {
	breakingNews: Array<INews>;
}) => {
	return (
		<div style={{ width: "49%" }} className="bg-black">
			Breaking news
		</div>
	);
};
