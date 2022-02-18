import { useEffect, useState } from "react";

const useLoading = () => {
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const handleLoad = () => { setLoading(false); };
        window.addEventListener("load", () => { handleLoad(); });
        return () => {
            window.removeEventListener("load", handleLoad);
        };
    }, []);

    return { loading };
}

export { useLoading };