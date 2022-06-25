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
                displayIf: '(storeValues) => storeValues.test === "foo"',
                renderText: '(storeValues) => `${storeValues.test || ""} ${storeValues.test2 || ""}`',
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
                label: 'text input',
                variant: 'outlined',
                id: 'test',
                layout: {
                    top: '1',
                    left: '1',
                },
                wrapper: {
                    component: 'Col',
                    // md: '2',
                },
            },
            {
                component: 'TextField',
                label: 'text input 2',
                variant: 'outlined',
                id: 'test2',
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