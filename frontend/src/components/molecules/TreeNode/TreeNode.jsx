import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FileIcon } from "../../atoms/FileIcon/FileIcon";

export const TreeNode = ({
    fileFolderData
}) => {

    const [visibility, setVisibility] = useState({});

    function toggleVisibility(name) {
        setVisibility({
            ...visibility,
            [name]: !visibility[name]
        });
    }

    function computeExtension(fileFolderData) {
        const name = fileFolderData.name.split('.');
        return name[name.length-1];
    }

    useEffect(() => {
        console.log("Visibility changed", visibility);
    }, [visibility]);

    return (
        (   fileFolderData && 
            <div
                style={{
                    paddingLeft: "15px",
                    color: "white"
                }}
            >
                {fileFolderData.children /** If the curr node is a folder */ ? (
                    /** If the curr node is a folder, render it as a button */
                    <button
                        onClick={() => toggleVisibility(fileFolderData.name)}
                        style={{
                            border: "none",
                            cursor: "pointer",
                            outline: "none",
                            color: "white",
                            backgroundColor: "transparent",
                            paddingTop: "15px",
                            fontSize: "16px"
                        }}
                    >
                        {visibility[fileFolderData.name] ? <IoIosArrowDown /> : <IoIosArrowForward />}
                        {fileFolderData.name}
                    </button>
                ):(
                    /** If the curr node is not the folder, render it as a p tag */
                    <div style={{ display: "flex", alignItems: "center", }}>
                        <FileIcon extension={computeExtension(fileFolderData)} />
                        <p
                            style={{
                                paddingTop: "5px",
                                fontSize: "15px",
                                cursor: "pointer",
                                marginLeft: "5px",
                                color: "white"
                            }}
                        >
                        { fileFolderData.name }
                        </p>
                    </div>
                )}
                {visibility[fileFolderData.name] && fileFolderData.children && (
                    fileFolderData.children.map((child) => (
                        <TreeNode 
                            fileFolderData={child}
                            key={child.name}
                        />
                    ))
                )}
            </div>
        )
    );
}