import 'react';
import {
    Link,
    Routes,
    Route
} from "react-router-dom";
import { Layout, Space, theme, Typography } from 'antd';
import Books from "./Pages/Books/Index";
import Navigation from './Components/Common/Navigation';
import NotFound from './Pages/NotFound';
import Home from './Pages/Home';
import BookDetails from './Pages/Books/BookDetails';
import Authors from './Pages/Authors';
import Borrowings from './Pages/Borrowings';
import Genres from './Pages/Genres';
import Readers from './Pages/Readers';
import ReaderDetails from './Pages/ReaderDetails';

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header
                style={{
                    display: 'flex',
                    backgroundColor: "#141414",
                    alignItems: 'center',
                    justifyContent: "center"
                }}>
                <Link to="/">
                    <Space align='center'>
                        <Typography.Text strong={true}
                            style={{
                                fontSize: "20px",
                                color: "#fff"
                            }}>
                            АРМ Библиотекаря
                        </Typography.Text>
                    </Space>
                </Link>
            </Header>
            <Content
                style={{
                    padding: '0 48px',
                    marginTop: "16px"
                }}>
                <Layout
                    style={{
                        padding: '24px 0',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}>
                    <Navigation />
                    <Content
                        style={{
                            padding: '0 24px',
                            marginTop: "24px",
                            minHeight: 280,
                        }}>
                        <Routes>
                            <Route path="/" index element={<Home />} />
                            <Route path="/books" element={<Books />} />
                            <Route path="/books/:id" element={<BookDetails />} />
                            <Route path='/authors' element={<Authors />} />
                            <Route path='/borrowings' element={<Borrowings />} />
                            <Route path='/genres' element={<Genres />} />
                            <Route path='/readers' element={<Readers />} />
                            <Route path="/readers/:id" element={<ReaderDetails />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Content>
                </Layout>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}>
                АРМ Библиотекаря ©{new Date().getFullYear()}
            </Footer>
        </Layout>
    );
};
export default App;