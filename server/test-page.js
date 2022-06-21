const page = [
    {
        component: 'Row',
        md: '6',
        children: [
            {
                component: 'Col',
                children: {
                    component: 'Typography',
                    variant: 'p',
                    children: 'howdy man bro',
                    id: 'v123'
                }
            },
            {
                component: 'Typography',
                children: 'fooooooo',
                variant: 'h3',
                layout: {
                    top: '1',
                    left: '3',
                },
                wrapper: {
                    component: 'Col',
                    // md: '2',
                    layout: {
                        top: '5',
                    },
                },
            },
            {
                component: 'TextField',
                label: 'foo',
                variant: 'outlined',
                layout: {
                    top: '1',
                    left: '1',
                },
                wrapper: {
                    component: 'Col',
                    // md: '2',
                },
            },
        ],
    },
]

export default page;