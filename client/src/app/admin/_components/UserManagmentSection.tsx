import { adminApi } from "@/api/admin";
import { userApi } from "@/api/user";
import MyList from "@/components/custom list/MyList";

// Component for managing users
export const UserManagementSection = () => {
	// Handler for promoting a user
	const handlePromoteUser = async (id: number) => {
		try {
			await adminApi.promoteUser(id);
		} catch (e) {
			console.error("Error promoting user:", e);
		}
	};

	// Handler for demoting a user
	const handleDemoteUser = async (id: number) => {
		try {
			await adminApi.demoteUser(id);
		} catch (e) {
			console.error("Error demoting user:", e);
		}
	};

	return (
		<div>
			<h1 className="font-bold text-2xl pb-2 border-b-2 border-b-gray-300 mb-8">
				Users
			</h1>
			<MyList
				apiCall={userApi.getAllUsers}
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
