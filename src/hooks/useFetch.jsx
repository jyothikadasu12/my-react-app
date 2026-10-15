import { useEffect, useState } from "react";

function useFetch(url) {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        async function fetchData() {

            try {

                setIsLoading(true);
                setError(null);

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(
                        `HTTP ${response.status}`
                    );
                }

                const result = await response.json();

                setData(result);

            } catch (err) {

                setError(err.message);

            } finally {

                setIsLoading(false);

            }
        }

        fetchData();

    }, [url]);

    return {
        data,
        isLoading,
        error
    };
}

export default useFetch;