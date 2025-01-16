import usePing from "../../hooks/api/queries/usePing"

export const PingComponent = () => {
    const { isLoading, data } = usePing();

    if(isLoading) {
        return (
        <>
            Loading ...
        </>
        );
    }
    return (
        <>
        Hello {data.message}
        </>
    );
}