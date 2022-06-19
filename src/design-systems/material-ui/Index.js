import components from './components';
import render from '../render';

const MaterialUI = () => {
    const config = [
        {
            component: 'Row',
            children: [
                {
                    component: 'Typography',
                    children: 'fooooooo',
                    variant: 'h3',
                    layout: {
                        top: '1',
                        left: '3',
                    }
                },
                {
                    component: 'TextField',
                    label: 'foo',
                    variant: 'outlined',
                    layout: {
                        sm: '4',
                        top: '1',
                        left: '1',
                    }
                },
            ],
        },
    ]

    return render(config, components);
};

export default MaterialUI;
