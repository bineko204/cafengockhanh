import React from 'react';
import Articles from '../../Containers/Admin/Articles';
import ArticleForm from '../../Containers/Admin/Articles/ArticleForm';
import Category from '../../Containers/Admin/Category';
import CategoryForm from '../../Containers/Admin/Category/CategoryForm';
import Home from '../../Containers/Admin/Home';
import Login from '../../Containers/Admin/Login';
import Media from '../../Containers/Admin/Media';
import Products from '../../Containers/Admin/Products';
import ProductForm from '../../Containers/Admin/Products/ProductForm';
import User from '../../Containers/Admin/User';
import HomPage from '../../Containers/Client/HomePage';
import KaraokePage from '../../Containers/Client/KaraokePage';
import PostDetail from '../../Containers/Client/PostPage/PostDetail';
import ProductDetail from '../../Containers/Client/ProductPage/ProductDetail';

export const LOGIN_ROUTES = {
    name: 'Login',
    path: '/login',
    exact: true,
    main: ({ match, history }) => <Login match={match} history={history} title="Đăng nhập" />,
};

export const ADMIN_ROUTES = [
    {
        name: 'Trang chủ',
        path: '/admin',
        exact: true,
        main: ({ match, history }) => <Home match={match} history={history} title="Trang chủ admin" />,
    },
    {
        name: 'Quản lý Sản phẩm',
        path: '/admin/products',
        exact: true,
        main: ({ match, history }) => <Products match={match} history={history} title="Quản lý sản phẩm" />,
    },
    {
        name: 'Danh mục sản phẩm',
        path: '/admin/product-category',
        exact: true,
        main: ({ match, history }) => (
            <Category match={match} history={history} table="product_category" title="Danh mục sản phẩm" />
        ),
    },
    {
        name: 'Thêm mới danh mục sản phẩm',
        path: '/admin/product-category/add',
        exact: true,
        main: ({ match, history }) => (
            <CategoryForm match={match} history={history} table="product_category" title="Thêm mới danh mục sản phẩm" />
        ),
    },
    {
        name: 'Chỉnh sửa danh mục sản phẩm',
        path: '/admin/product-category/edit/:id',
        exact: true,
        main: ({ match, history }) => (
            <CategoryForm
                match={match}
                history={history}
                table="product_category"
                title="Chỉnh sửa danh mục sản phẩm"
            />
        ),
    },
    {
        name: 'Thêm mới sản phẩm',
        path: '/admin/products/add',
        exact: true,
        main: ({ match, history }) => <ProductForm match={match} history={history} title="Thêm mới sản phẩm" />,
    },
    {
        name: 'Chỉnh sửa sản phẩm',
        path: '/admin/products/edit/:id',
        exact: false,
        main: ({ match, history }) => <ProductForm match={match} history={history} title="Chỉnh sửa sản phẩm" />,
    },
    {
        name: 'Danh mục bài viết',
        path: '/admin/article-category',
        exact: true,
        main: ({ match, history }) => (
            <Category match={match} history={history} table="article_category" title="Danh mục bài viết" />
        ),
    },
    {
        name: 'Thêm mới danh mục bài viết',
        path: '/admin/article-category/add',
        exact: true,
        main: ({ match, history }) => (
            <CategoryForm match={match} history={history} table="article_category" title="Thêm mới danh mục bài viết" />
        ),
    },
    {
        name: 'Chỉnh sửa danh mục bài viết',
        path: '/admin/article-category/edit/:id',
        exact: true,
        main: ({ match, history }) => (
            <CategoryForm
                match={match}
                history={history}
                table="article_category"
                title="Chỉnh sửa danh mục bài viết"
            />
        ),
    },
    {
        name: 'Quản lý bài viết',
        path: '/admin/articles',
        exact: true,
        main: ({ match, history }) => <Articles match={match} history={history} title="Quản lý bài viết" />,
    },
    {
        name: 'Thêm mới bài viết',
        path: '/admin/articles/add',
        exact: true,
        main: ({ match, history }) => <ArticleForm match={match} history={history} title="Thêm mới bài viết" />,
    },
    {
        name: 'Chỉnh sửa bài viết',
        path: '/admin/articles/edit/:id',
        exact: false,
        main: ({ match, history }) => <ArticleForm match={match} history={history} title="Chỉnh sửa bài viết" />,
    },
    {
        name: 'Quản lý Hình ảnh',
        path: '/admin/media',
        exact: false,
        main: ({ match, history }) => <Media match={match} history={history} type="page" title="Thư viện ảnh" />,
    },
    {
        name: 'Thông tin người dùng',
        path: '/admin/user',
        exact: false,
        main: ({ match, history }) => <User match={match} history={history} title="Thông tin người dùng" />,
    },
];

export const CLIENT_ROUTES = [
    {
        name: 'Trang chủ',
        path: '/',
        exact: true,
        main: ({ match, history }) => <HomPage match={match} history={history} title="Trang chủ" />,
    },
    {
        name: 'Karaoke',
        path: '/karaoke',
        exact: true,
        main: ({ match, history }) => <KaraokePage match={match} history={history} title="Hát cho nhau nghe" />,
    },
    {
        name: 'Chi tiết Sản phẩm',
        path: '/product/:id/:slug.html',
        exact: false,
        main: ({ match, history }) => <ProductDetail match={match} history={history} title="Chi tiết Sản phẩm" />,
    },
    {
        name: 'Bài viết',
        path: '/post/:id/:slug.html',
        exact: false,
        main: ({ match, history }) => <PostDetail match={match} history={history} title="Bài viết" />,
    },
];
