const page = [
    {
        component: 'Container',
        layout: {
            bottom: 4
        },
        children: [
            {
                component: 'Typography',
                variant: 'h2',
                as: 'h1',
                layout: {
                    top: 5,
                    bottom: 3,
                },
                children: 'The best thing ever.',
            },
            {
                component: 'Typography',
                variant: 'h5',
                as: 'h2',
                layout: {
                    bottom: 5,
                },
                children: 'Stay in the know with the latest updates.',
            },
            {
                component: 'form',
                style: {
                    display: 'flex',
                },
                displayIf: '(storeValues) => !(storeValues.email && storeValues.submitted)',
                children: [
                    {
                        component: 'TextField',
                        label: 'Email',
                        variant: 'outlined',
                        name: 'email',
                        size: 'large',
                        layout: {
                            right: 3
                        },
                    },
                    {
                        component: 'Button',
                        children: 'Submit',
                        variant: 'outlined',
                        size: 'large',
                        type: 'submit',
                        style: {
                            height: 'inherit',
                        }
                    },
                ]
            },
            {
                component: 'Typography',
                displayIf: '(storeValues) => storeValues.email && storeValues.submitted',
                renderText: '(storeValues) => `Successfully subscribed ${storeValues.email}.`',
                variant: 'p',
                as: 'p',
                layout: {
                    top: '1',
                },
            }
        ],
    },
]

export default page;