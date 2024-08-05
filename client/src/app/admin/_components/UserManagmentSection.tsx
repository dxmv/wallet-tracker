"use client";
import { adminApi } from "@/api/admin";
import { userApi } from "@/api/user";
import MyList from "@/components/custom list/MyList";
import { useApiWithRefetch } from "@/hooks/useApiWithRefetch";
import { handleErrorToast, showSuccessToast } from "@/utils/toasts";

// Component for managing users
export const UserManagementSection = () => {
	// memoized apiCall
	const { apiCall, refetch } = useApiWithRefetch(userApi.getAllUsers);

	// handler for promoting and demoting the user
	const handleUserRoleChange = async (
		id: number,
		action: "promote" | "demote"
	) => {
		try {
			await (action === "promote"
				? adminApi.promoteUser(id)
				: adminApi.demoteUser(id));
			refetch();
			showSuccessToast(`Successfully ${action + "d"}`);
		} catch (e) {
			handleErrorToast(e);
		}
	};

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
								className={`btn-purple mr-4 bg-green-500 hover:bg-green-800`}
								onClick={() => handleUserRoleChange(item.id, "promote")}
							>
								PROMOTE
							</button>
							<button
								className={`btn-purple mr-4 bg-red-500 hover:bg-red-800`}
								onClick={() => handleUserRoleChange(item.id, "demote")}
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
