import React from 'react';
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
import { BookTwoTone } from '@ant-design/icons';
import Genres from './Pages/Genres';
import Readers from './Pages/Readers';

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: "center"
                }}>
                <Link to="/">
                    <Space>

                        <BookTwoTone style={{ fontSize: '30px'}} />
                        <Typography.Title level={5}
                            style={{
                                color: "#fff"
                            }}>
                            Система управления библиотекой
                        </Typography.Title>
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
                    <Sider
                        style={{
                            background: colorBgContainer,
                        }}
                        width={200}>
                        <Navigation />
                    </Sider>
                    <Content
                        style={{
                            padding: '0 24px',
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
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Content>
                </Layout>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}>
                Система управления библиотекой ©{new Date().getFullYear()}
            </Footer>
        </Layout>
    );
};
export default App;