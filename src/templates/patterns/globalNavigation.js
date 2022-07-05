const globalNavigation = ({ pageTitle }) => {
    return {
        component: 'Container',
        layout: {
            top: 4,
            bottom: 4,
        },
        children: {
            component: 'Typography',
            variant: 'h5',
            as: 'h1',
            style: {
                display: 'flex',
                alignItems: 'center',
            },
            children: [
                {
                    component: 'AdjustIcon',
                    layout: {
                        right: 1,
                    },
                    style: {
                        width: '1.45em',
                        height: '1.45em',
                    },
                },
                pageTitle,
            ],
        },
    };
};

export default globalNavigation;
