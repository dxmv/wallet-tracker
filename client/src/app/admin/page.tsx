"use client";
import { adminApi } from "@/api/admin";
import { userApi } from "@/api/user";
import AdminWalletListItem from "@/components/custom list/AdminWalletListItem";
import MyList from "@/components/custom list/MyList";
import EditAndDeleteItemWrapper from "@/components/custom list/wrappers/EditAndDeleteItemWrapper";
import Modal from "@/components/Modal";
import React, { useState } from "react";

// Page only accessible by admins
const AdminDashboard = () => {
	const [addWalletModal, setAddWalletModal] = useState<boolean>(false);

	const handleDelete = async (id: number) => {
		if (!id) {
			return;
		}
		try {
			await adminApi.deleteAdminWallet(id);
		} catch (e) {
			console.error(e);
		}
	};

	const handleAddWallet = async () => {};

	const handlePromoteUser = async (id: number) => {
		try {
			await adminApi.promoteUser(id);
		} catch (e) {
			console.error(e);
		}
	};

	const handleDemoteUser = async (id: number) => {
		try {
			await adminApi.demoteUser(id);
		} catch (e) {
			console.error(e);
		}
	};

	// check if the user is admin, if the user isn't an admin redirect to dashboard
	return (
		<main
			className="grid px-4"
			style={{
				height: "87vh",
				gridTemplateColumns: "repeat(2,1fr)",
				gridGap: "100px",
			}}
		>
			{/* Here the user can see admin wallets, add, update and delete them */}
			<div>
				<h1 className="font-bold text-2xl pb-2 border-b-2 border-b-gray-300 mb-8">
					Admin wallets
				</h1>
				<MyList
					apiCall={adminApi.getAllAdminWallets}
					renderItem={item => (
						<EditAndDeleteItemWrapper
							id={item.id}
							name={item.name as string}
							onDelete={handleDelete}
						>
							<AdminWalletListItem item={item} />
						</EditAndDeleteItemWrapper>
					)}
				/>
				<button onClick={() => setAddWalletModal(true)}>Add a wallet</button>
			</div>
			<div>
				<div>
					{/* Here the user can see all of the users and promote & demote them */}
					<h1 className="font-bold text-2xl pb-2 border-b-2 border-b-gray-300 mb-8">
						Users
					</h1>
					<MyList
						apiCall={userApi.getAllUsers}
						renderItem={item => (
							<div className="flex justify-between items-center">
								<p>
									<span className="font-bold">{item.email}</span> (ID:{item.id})
									[{item.roles.join("-")}]
								</p>
								<div className="flex ">
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
			</div>
			{addWalletModal && (
				<Modal
					searchPart={false}
					closeModal={() => setAddWalletModal(false)}
					title="Add admin wallet"
					handleNext={handleAddWallet}
				></Modal>
			)}
		</main>
	);
};

export default AdminDashboard;
