"use client";
import { adminApi } from "@/api/admin";
import { userApi } from "@/api/user";
import MyList from "@/components/custom list/MyList";
import { handleErrorToast } from "@/utils/toasts";
import { useCallback, useState } from "react";

// Component for managing users
export const UserManagementSection = () => {
	// State to trigger refetch
	const [refetchTrigger, setRefetchTrigger] = useState(0);

	// Callback to refetch users
	const refetchUsers = useCallback(() => {
		setRefetchTrigger(prev => prev + 1);
	}, []);

	// Handler for promoting a user
	const handlePromoteUser = async (id: number) => {
		try {
			await adminApi.promoteUser(id);
			refetchUsers(); // Refetch users after successful demotion
		} catch (e) {
			handleErrorToast(e);
		}
	};

	// Handler for demoting a user
	const handleDemoteUser = async (id: number) => {
		try {
			await adminApi.demoteUser(id);
			refetchUsers(); // Refetch users after successful demotion
		} catch (e) {
			handleErrorToast(e);
		}
	};

	// Memoized API call function
	const apiCall = useCallback(() => {
		return userApi.getAllUsers();
	}, [refetchTrigger]); // Dependency on refetchTrigger

	return (
		<div>
			<h1 className="font-bold text-2xl pb-2 border-b-2 border-b-gray-300 mb-8">
				Users
			</h1>
			<MyList
				apiCall={apiCall}
				renderItem={item => (
					<div className="flex justify-between items-center">
						<p>
							<span className="font-bold">{item.email}</span> (ID:{item.id}) [
							{item.roles.join("-")}]
						</p>
						<div className="flex">
							<button
								className="border-2 px-3 py-1 mr-2"
								onClick={() => handlePromoteUser(item.id)}
							>
								PROMOTE
							</button>
							<button
								className="border-2 px-3 py-1"
								onClick={() => handleDemoteUser(item.id)}
							>
								DEMOTE
							</button>
						</div>
					</div>
				)}
			/>
		</div>
	);
};
