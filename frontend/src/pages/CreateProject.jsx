import { useCreateProject } from "../hooks/api/mutations/useCreateProject";
import { Button, Row, Col, Flex } from 'antd';

export const CreateProject = () => {

    // const { Header, Footer, Content } = Layout;

    const { createProjectMutation } = useCreateProject();

    async function handleCreateProject() {
        console.log("Going to trigger the api");
        try {
            await createProjectMutation();
            console.log("Now we should redirect to the editor");
        } catch(error) {
            console.log("Error creating project", error);
        }
    }

    return (
        // <Layout style={layoutStyle}>
        //     <Header style={headerStyle}>
        //         <h1>Create Project</h1>
        //     </Header>
        //     <Content style={contentStyle}>
        //         <Button onClick={handleCreateProject}>Create Project</Button>
        //         { isPending && <p>Creating project ...</p> }
        //     </Content>
        //     <Footer style={footerStyle}>
        //         Footer
        //     </Footer>            
        // </Layout>
        <Row>
            <Col span={24}>
            <Flex justify="center" align="center">
                <Button 
                    type="primary" 
                    onClick={handleCreateProject}
                >Create Playground</Button>
            </Flex>
            </Col>
        </Row>
    );
}