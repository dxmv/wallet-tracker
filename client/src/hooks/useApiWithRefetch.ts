import { useCallback, useState } from "react";

export const useApiWithRefetch = <T>(apiCall: () => Promise<T>) => {
	const [refetchTrigger, setRefetchTrigger] = useState(0);
	const refetch = useCallback(() => setRefetchTrigger(prev => prev + 1), []);

	const memoizedApiCall = useCallback(
		() => apiCall(),
		[apiCall, refetchTrigger]
	);

	return { apiCall: memoizedApiCall, refetch };
};
