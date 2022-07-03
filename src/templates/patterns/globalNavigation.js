const globalNavigation = [
    {
        component: 'Box',
        style: { borderBottom: '1px solid gray' },
        layout: {
            bottom: 4,
        },
        style: {
            padding: '0.1px 0',
            color: '#FFF',
            background: 'blue',
        },
        children: {
            component: 'Typography',
            variant: 'h5',
            as: 'h1',
            layout: {
                top: 2,
                bottom: 2,
                left: 2,
                right: 2,
            },
            style: {
                display: 'flex',
                alignItems: 'center',
            },
            children: [
                {
                    component: 'AdjustIcon',
                    layout: {
                        right: 2
                    },
                    style: {
                        width: '1.45em',
                        height: '1.45em',
                    }
                }, 'Absract UI'
            ]
        }
    },
]

export default globalNavigation;