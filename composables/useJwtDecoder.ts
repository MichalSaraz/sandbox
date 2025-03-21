interface DecodedToken {
    token: ComputedRef<{ header: string; payload: string }>;
    error: Ref<string | null>;
}

export const useJwtDecoder = (token: Ref<string>): DecodedToken => {
    const decodeBase64 = (encoded: string): string => {
        try {
            const decoded = atob(encoded);
            return JSON.stringify(JSON.parse(decoded), null, 2);
        } catch {
            return "Invalid Base64 encoding";
        }
    };

    const error = ref<string | null>(null);

    const decodedToken = computed<{ header: string; payload: string }>(() => {
        if (!token.value) {
            error.value = null;
            return { header: "", payload: "" };
        }

        const [headerPart, payloadPart] = token.value.split(".");

        if (!headerPart || !payloadPart) {
            error.value = "Invalid JWT token";
            return { header: "", payload: "" };
        }

        const header = decodeBase64(headerPart);
        const payload = decodeBase64(payloadPart);

        if (!header || !payload) {
            error.value = "Invalid JWT token";
            return { header: "", payload: "" };
        }

        error.value = null;
        return { header, payload };
    });

    return {
        token: decodedToken,
        error: error,
    };
};
