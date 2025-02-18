import Docker from 'dockerode';

const docker = new Docker();

export const handleContainerCreate = async (projectId, socket) => {
    try {
        console.log("Project id received for container create", projectId);
        const container = await docker.createContainer({
            Image: 'sandbox', // name given by us for the written dockerfile
            AttachStdin: true,
            AttachStdout: true,
            AttachStderr: true,
            Cmd: ['/bin/bash'],
            name: projectId,
            Tty: true,
            User: "sandbox",
            Volumes: {
                "/home/sandbox/app": {}
            },
            ExposedPorts: {
                    "5173/tcp": {}
            },
            Env: ["HOST=0.0.0.0"],
            HostConfig: {
                Binds: [ // mounting the project directory to the container
                    `${process.cwd()}/projects/${projectId}:/home/sandbox/app`
                ],
                PortBindings: {
                    "5173/tcp": [
                        {
                            "HostPort": "0" // random port will be assigned by docker
                        }
                    ]
                },
                
            }
        });
        console.log("Container created", container.id);
        await container.start();
        console.log("Container started");

        container.exec({
            Cmd: ["/bin/bash"],
            User: "sandbox",
            AttachStderr: true,
            AttachStdout: true,
            AttachStdin: true,
        }, (err, exec) => {
            if(err) {
                console.log("Error while creation container");
                return;
            }

            exec.start({ hijack: true}, (err, stream) => {
                if(err) {
                    console.log("Error while starting exec");
                    return;
                }
                processStream(stream, socket);
                socket.on("shell-input", (data) => {
                    console.log("Received from frontend", data);
                    stream.write("pwd\n", (err) => {
                        if(err) {
                            console.log("Error while writing to stream", err);
                        } else {
                            console.log("Data written to stream");
                        }
                    });
                });
            });
        });
    } catch(error) {
        // console.log(process.cwd());
        console.log("Error while creating container", error);
    }
}

function  processStream(stream, socket) {
    let buffer = Buffer.from("");
    stream.on("data", (data) => {
        buffer = Buffer.concat([buffer, data]);
        console.log(buffer.toString());
        socket.emit("shell-output", buffer.toString());
        buffer = Buffer.from(""); // clear buffer
    });

    stream.on("end", () => {
        console.log("Stream ended");
        socket.emit("shell-output", "Stream ended");
    });

    stream.on("error", (err) => {
        console.log("Stream error", err);
        socket.emit("shell-output", "Stream err");
    });
}