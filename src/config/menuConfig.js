const menuList = [
    {
        title: '首页',
        path: '/home',
        icon: 'HomeOutlined'
    },
    {
        title: '商品',
        path: '/product',
        icon: 'HomeOutlined',
        children: [
            {
                title: '品类管理',
                path: '/category'
            },
            {
                title: '商品管理',
                path: '/product'
            }
        ]
    },
    {
        title: '用户',
        path: '/user',
        icon: 'SafetyCertificateOutlined'
    },
    {
        title: '图形图表',
        path: '/charts',
        icon: 'HomeOutlined',
        children: [
            {
                title: '柱状图',
                path: '/charts/bar'
            },
            {
                title: '饼图',
                path: '/charts/pie'
            },
            {
                title: '折线图',
                path: '/charts/line'
            }
        ]
    },
]

export default menuList