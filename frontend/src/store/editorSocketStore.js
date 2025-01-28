import { create } from "zustand";
import { useActiveFileTabStore } from "./activeFileTabStore";
import { useTreeStructureStore } from "./treeStructureStore";

export const useEditorSocketStore = create((set) => ({
    editorSocket: null,
    setEditorSocket: (incomingSocket) => {
        
        const activeFileTabStore = useActiveFileTabStore.getState().setActiveFileTab; 

        const projectTreeStructureSetter = useTreeStructureStore.getState().setTreeStructure;

        incomingSocket?.on("readFileSuccess", (data) => {
            console.log("Read file success", data)
            const fileExtension = data.path.split('.').pop(); // last element from array
            activeFileTabStore(data.path, data.value, fileExtension);
        });

        incomingSocket.on("writeFileSuccess", (data) => {
            console.log("Write file success", data);
            incomingSocket.emit("readFile", {
                pathToFileOrFolder: data.path,
            });
            // task is rooms implement
            // https://socket.io/docs/v3/rooms/
        })

        incomingSocket?.on("deleteFileSuccess", (data) => {
            console.log("Delete file success", data);
            projectTreeStructureSetter();
        });

        set({
            editorSocket: incomingSocket,
        });
    },
}));