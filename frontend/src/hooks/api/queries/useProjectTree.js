import { useQuery } from "@tanstack/react-query";
import { getProjectTree } from "../../../apis/projects";
import { useTreeStructureStore } from "../../../store/treeStructureStore";

export const useProjectTree = (projectId) => {
    const store = useTreeStructureStore();
    const { isError, isLoading, data: projectTree, error } = useQuery({
        queryFn: () => getProjectTree({projectId}),
    });

    return {
        isLoading,
        isError,
        projectTree,
        error,
    };
}